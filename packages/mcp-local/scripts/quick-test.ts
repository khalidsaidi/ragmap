import 'dotenv/config';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const SERVER_URL = process.env.MCP_SERVER_URL ?? 'http://localhost:4000/mcp';
const AGENT_NAME = process.env.MCP_AGENT_NAME ?? 'ragmap-quick-test';

async function main() {
  const client = new Client({ name: 'RAGMapQuickTest', version: '0.1.0' });
  const transport = new StreamableHTTPClientTransport(new URL(SERVER_URL), {
    requestInit: { headers: { 'X-Agent-Name': AGENT_NAME } }
  });

  await client.connect(transport);
  const tools = await client.listTools();
  const toolNames = tools.tools.map((t) => t.name).sort();
  if (!toolNames.includes('rag_find_servers')) {
    throw new Error(`Expected rag_find_servers tool; got ${toolNames.join(', ')}`);
  }
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

