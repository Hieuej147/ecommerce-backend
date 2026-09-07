import type { Request } from 'express';
import type { AgentActor } from './agent-actor';

export type AgentRequest = Request & { actor?: AgentActor };
