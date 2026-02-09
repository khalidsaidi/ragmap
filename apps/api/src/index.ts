import 'dotenv/config';
import { loadEnv } from './env.js';
import { createStore } from './store/index.js';
import { buildApp } from './app.js';

const env = loadEnv();
const store = createStore(env);
const app = await buildApp({ env, store });

await app.listen({ port: env.port, host: '0.0.0.0' });
app.log.info(`ragmap api listening on :${env.port}`);

