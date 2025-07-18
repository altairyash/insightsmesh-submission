export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  summary?: string;  
  messages: Message[];
  tags: string[];
  createdAt: number;
  lastUpdated: number;
}

export interface SessionsState {
  sessions: Record<string, ChatSession>;
  activeSessionId: string | null;
  isCreatingSession: boolean;
}
