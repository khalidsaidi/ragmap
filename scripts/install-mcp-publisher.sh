#!/usr/bin/env bash
# Install mcp-publisher binary for the current platform (for publishing to MCP Registry).
# Usage: ./scripts/install-mcp-publisher.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BIN_DIR="${REPO_ROOT}/bin"
mkdir -p "$BIN_DIR"

OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)
case "$ARCH" in
  x86_64) ARCH=amd64 ;;
  aarch64|arm64) ARCH=arm64 ;;
  *) echo "Unsupported arch: $ARCH" >&2; exit 1 ;;
esac

if [[ "$OS" = "linux" ]]; then
  TARGET="linux_${ARCH}"
elif [[ "$OS" = "darwin" ]]; then
  TARGET="darwin_${ARCH}"
else
  echo "Unsupported OS: $OS" >&2
  exit 1
fi

URL="https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_${TARGET}.tar.gz"
echo "Downloading mcp-publisher ($TARGET)..."
curl -sSL "$URL" | tar -xzf - -C "$BIN_DIR" mcp-publisher
chmod +x "$BIN_DIR/mcp-publisher"
echo "Installed to $BIN_DIR/mcp-publisher"
"$BIN_DIR/mcp-publisher" --help | head -5
