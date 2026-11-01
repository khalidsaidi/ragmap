import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { findServers, getServer, installConfig, loadCatalog, type Catalog, type Server } from '../src/data.ts';

function server(over: Partial<Server>): Server {
  return {
    name: 'io.example/x',
    title: null,
    description: null,
    url: 'https://example.com/mcp',
    knowledge: '',
    topics: [],
    tools: [],
    repository: null,
    lastOk: '2026-10-31',
    ...over
  };
}

const catalog: Catalog = {
  generatedAt: '2026-10-31T00:00:00.000Z',
  source: 'https://registry.modelcontextprotocol.io',
  count: 3,
  servers: [
    server({ name: 'io.example/eu-cosmetics', knowledge: 'EU cosmetics safety rules', topics: ['regulation', 'cosmetics', 'eu'] }),
    server({ name: 'io.example/web', knowledge: 'Search the public web', topics: ['web'], tools: ['web_search'] }),
    server({ name: 'io.example/laws', knowledge: 'Austrian federal law and case law', topics: ['law', 'austria'] })
  ]
};

test('find ranks topic matches first', () => {
  const results = findServers(catalog, 'cosmetics regulation in the EU');
  assert.equal(results[0].name, 'io.example/eu-cosmetics');
  assert.equal(results.length, 1);
});

test('find matches word stems', () => {
  assert.equal(findServers(catalog, 'regulations')[0]?.name, 'io.example/eu-cosmetics');
});

test('find with no need lists servers', () => {
  assert.equal(findServers(catalog, undefined, 2).length, 2);
});

test('find with no match returns nothing', () => {
  assert.deepEqual(findServers(catalog, 'volcano'), []);
});

test('get and install', () => {
  const s = getServer(catalog, 'io.example/web')!;
  const config = installConfig(s);
  assert.equal(config.claudeCode, 'claude mcp add --transport http web https://example.com/mcp');
  assert.deepEqual(config.json, { mcpServers: { web: { type: 'http', url: 'https://example.com/mcp' } } });
  assert.equal(getServer(catalog, 'nope'), undefined);
});

test('load falls back to the bundled copy when the URL fails', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ragmap-'));
  const file = path.join(dir, 'servers.json');
  await fs.writeFile(file, JSON.stringify(catalog));
  const loaded = await loadCatalog({ url: 'http://127.0.0.1:9/none.json', bundledPath: new URL(`file://${file}`), timeoutMs: 500 });
  assert.equal(loaded.count, 3);
  await fs.rm(dir, { recursive: true });
});

test('bundled data file is valid', async () => {
  const data = JSON.parse(await fs.readFile(new URL('../data/servers.json', import.meta.url), 'utf8')) as Catalog;
  assert.equal(data.count, data.servers.length);
  for (const s of data.servers) {
    assert.ok(s.name && s.url.startsWith('https://') && s.knowledge, s.name);
  }
});
