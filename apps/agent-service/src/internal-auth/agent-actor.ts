export interface AgentActor {
  userId: string;
  role: 'customer' | 'admin';
  requestId: string;
  authorization?: string;
}
