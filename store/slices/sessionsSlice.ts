import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  sender: "user" | "bot";
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  title: string;
  summary?: string; 
  messages: Message[];
  tags: string[];
  lastUpdated?: number;
}

interface SessionsState {
  sessions: Session[];
  activeSessionId: string | null;
}

const initialState: SessionsState = {
  sessions: [],
  activeSessionId: null,
};

const createNewSession = (): Session => {
  const now = Date.now();
  return {
    id: uuidv4(),
    title: "New Chat",
    messages: [],
    tags: [],
    lastUpdated: now,
  };
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    createSession(state) {
      const newSession = createNewSession();
      state.sessions.unshift(newSession);
      state.activeSessionId = newSession.id;
    },
    selectSession(state, action: PayloadAction<string>) {
      state.activeSessionId = action.payload;
    },
    updateSessionTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const session = state.sessions.find((s) => s.id === action.payload.id);
      if (session) session.title = action.payload.title.split(" ").slice(0, 3).join(" ");
    },
    updateSessionTitleAndSummary(state, action: PayloadAction<{ sessionId: string; title: string; summary: string }>) {
      const session = state.sessions.find((s) => s.id === action.payload.sessionId);
      if (session) {
        session.title = action.payload.title.split(" ").slice(0, 3).join(" ");
        session.summary = action.payload.summary;
      }
    },
    addUserMessage(state, action: PayloadAction<{ sessionId: string; content: string }>) {
      const session = state.sessions.find((s) => s.id === action.payload.sessionId);
      if (session) {
        session.messages.push({
          sender: "user",
          content: action.payload.content,
          timestamp: Date.now(),
        });
        session.lastUpdated = Date.now();
      }
    },
    addBotMessage(state, action: PayloadAction<{ sessionId: string; content: string }>) {
      const session = state.sessions.find((s) => s.id === action.payload.sessionId);
      if (session) {
        session.messages.push({
          sender: "bot",
          content: action.payload.content,
          timestamp: Date.now(),
        });
        session.lastUpdated = Date.now();
      }
    },
    deleteSession(state, action: PayloadAction<string>) {
      state.sessions = state.sessions.filter((session) => session.id !== action.payload);
      if (state.activeSessionId === action.payload) {
        state.activeSessionId = state.sessions[0]?.id || null;
      }
    },
    setSessionMessages(state, action: PayloadAction<Message[]>) {
      const activeSession = state.sessions.find(
        (session) => session.id === state.activeSessionId
      );
      if (activeSession) {
        activeSession.messages = action.payload;
        activeSession.lastUpdated = Date.now();
      }
    },
    LOAD_CHAT_DATA(state, action: PayloadAction<Session[]>) {
      state.sessions = action.payload;
      state.activeSessionId = state.sessions[0]?.id || null;
    },
    addTagToSession(state, action: PayloadAction<{ sessionId: string; tag: string }>) {
      const sessionIndex = state.sessions.findIndex((s) => s.id === action.payload.sessionId);
      if (sessionIndex !== -1) {
        const session = state.sessions[sessionIndex];
        if (!session.tags.includes(action.payload.tag)) {
          state.sessions = state.sessions.map((s, index) =>
            index === sessionIndex
              ? { ...s, tags: [...s.tags, action.payload.tag] }
              : s
          );
        }
      }
    },
    removeTagFromSession(state, action: PayloadAction<{ sessionId: string; tag: string }>) {
      const sessionIndex = state.sessions.findIndex((s) => s.id === action.payload.sessionId);
      if (sessionIndex !== -1) {
        const session = state.sessions[sessionIndex];
        state.sessions[sessionIndex] = {
          ...session,
          tags: session.tags.filter((t) => t !== action.payload.tag),
        };
      }
    },
  },
});

export const {
  createSession,
  selectSession,
  updateSessionTitle,
  updateSessionTitleAndSummary,
  addUserMessage,
  addBotMessage,
  deleteSession,
  setSessionMessages,
  LOAD_CHAT_DATA,
  addTagToSession,
  removeTagFromSession,
} = sessionsSlice.actions;
export default sessionsSlice.reducer;
