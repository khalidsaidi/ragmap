#!/usr/bin/env bash
set -euo pipefail

SERVER_PATH="${1:-/mcp/servers/@khalidsaidi/ragmap/score}"

node - "$SERVER_PATH" <<'NODE'
const https = require("https");
const vm = require("vm");

const serverPath = process.argv[2];
const url = `https://glama.ai${serverPath}`;

function fetchHtml(targetUrl) {
  return new Promise((resolve, reject) => {
    https
      .get(targetUrl, (res) => {
        let html = "";
        res.on("data", (chunk) => {
          html += chunk;
        });
        res.on("end", () => resolve(html));
      })
      .on("error", reject);
  });
}

function decodeRouteData(html) {
  const match = html.match(
    /<script nonce="[^"]*">window\.__reactRouterContext\.streamController\.enqueue\(("[\s\S]*?")\);<\/script>/
  );
  if (!match) {
    throw new Error("Could not parse Glama route stream payload.");
  }

  const argLiteral = match[1];
  const sandbox = {
    captured: null,
    window: {
      __reactRouterContext: {
        streamController: {
          enqueue: (value) => {
            sandbox.captured = value;
          },
        },
      },
    },
  };

  vm.createContext(sandbox);
  vm.runInContext(
    `window.__reactRouterContext.streamController.enqueue(${argLiteral});`,
    sandbox
  );

  const arr = JSON.parse(sandbox.captured);
  const cache = new Map();

  const decodeRef = (value) => {
    if (value === -5) {
      return undefined;
    }
    if (typeof value === "number") {
      return value < 0 ? value : decodeIndex(value);
    }
    return decode(value);
  };

  const decodeIndex = (index) => {
    if (cache.has(index)) {
      return cache.get(index);
    }
    cache.set(index, {});
    const decoded = decode(arr[index]);
    cache.set(index, decoded);
    return decoded;
  };

  const decode = (value) => {
    if (Array.isArray(value)) {
      return value.map(decodeRef);
    }
    if (value && typeof value === "object") {
      const keys = Object.keys(value);
      const refObject = keys.every((key) => /^_\d+$/.test(key));
      if (refObject) {
        const out = {};
        for (const [rawKey, rawVal] of Object.entries(value)) {
          const key = arr[Number(rawKey.slice(1))];
          out[key] = decodeRef(rawVal);
        }
        return out;
      }
      const out = {};
      for (const [key, rawVal] of Object.entries(value)) {
        out[key] = decodeRef(rawVal);
      }
      return out;
    }
    return value;
  };

  const root = decodeIndex(0);
  const loaderData = root.loaderData || {};
  const routeKey = Object.keys(loaderData).find((key) =>
    key.includes("/_pages/score/_route")
  );
  if (!routeKey) {
    throw new Error("Could not locate score route payload.");
  }
  return loaderData[routeKey];
}

(async () => {
  const routeData = decodeRouteData(await fetchHtml(url));
  const score = routeData.score || {};
  const repo = routeData.mcpServer?.repository || {};

  const output = {
    score: {
      hasGlamaJson: score.hasGlamaJson,
      hasReadme: score.hasReadme,
      hasRecentUsage: score.hasRecentUsage,
      recentUsage: score.recentUsage,
      hasUserSubmittedRelatedMcpServers: score.hasUserSubmittedRelatedMcpServers,
      isInspectable: score.isInspectable,
      latestReleaseVersion: score.latestReleaseVersion ?? null,
      toolCount: score.toolCount,
    },
    repository: {
      inspectable: repo.inspectable,
      latestRelease: repo.latestRelease ?? null,
      npmPackage: repo.npmPackage ?? null,
    },
  };

  console.log(JSON.stringify(output, null, 2));
})();
NODE
