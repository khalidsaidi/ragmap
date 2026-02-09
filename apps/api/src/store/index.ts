import type { Env } from '../env.js';
import type { RegistryStore } from './types.js';
import { InMemoryStore } from './inmemory.js';
import { FirestoreStore } from './firestore.js';

export function createStore(env: Env): RegistryStore {
  if (env.storage === 'inmemory') return new InMemoryStore();
  return new FirestoreStore(env);
}

