import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ChatInput from "./ChatInput";
import { VariableSizeList as List } from "react-window";
import ChatActions from "./ChatActions";

interface ChatWindowProps {
  hideHeader?: boolean;
}

const NoChatUI = () => (
  <div className="min-h-full flex flex-1 flex-col rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 transition-colors duration-200">
    <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8">
      <div className="flex flex-col items-center justify-center w-full">
        <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mb-6">
          <rect x="8" y="16" width="48" height="32" rx="8" fill="#3B82F6" fillOpacity="0.10" />
          <rect x="16" y="24" width="32" height="16" rx="4" fill="#3B82F6" fillOpacity="0.20" />
          <rect x="24" y="32" width="16" height="4" rx="2" fill="#3B82F6" fillOpacity="0.30" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-400 dark:text-gray-300 mb-2 text-center">No chat yet</h2>
        <p className="text-base text-gray-400 dark:text-gray-300 text-center max-w-xs mb-6">Start a new conversation below.</p>
      </div>
    </div>
    {/* Input pinned to bottom, always same style as active chat */}
    <div className="w-full flex justify-center px-6 pb-8">
      <div className="w-full max-w-xl">
        <ChatInput forceCreateSession />
      </div>
    </div>
  </div>
);

export default function ChatWindow({ hideHeader = false }: ChatWindowProps) {
  // Ref for auto-scroll (always declare hooks before any early returns)
  const listRef = useRef<any>(null);

  const session = useSelector((state: RootState) =>
    state.sessions.sessions.find((s) => s.id === state.sessions.activeSessionId)
  );

  useEffect(() => {
    if (session && listRef.current) {
      listRef.current.scrollToItem(session.messages.length - 1, "end");
    }
  }, [session?.messages.length]);

  if (!session) {
    return <NoChatUI />;
  }

  const getItemSize = (index: number) => {
    const msg = session.messages[index];
    if (!msg || !msg.content || msg.content.length === 0) {
      console.error("Message or content is undefined", msg);
      return 80; 
    }
    const baseSize = 80; 
    const extraSize = Math.ceil(msg?.content?.length / 100) * 40; // Add extra size for longer messages
    return baseSize + extraSize;
  };

  // Calculate available height for the list
  const containerHeight = typeof window !== "undefined" ? window.innerHeight - 200 : 600; // Adjust based on your layout

  // Improved Row with even more modern, readable, and accessible chat bubble design
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const msg = session.messages[index];
    const isUser = msg.sender === "user";
    return (
      <div
        key={index}
        style={{
          ...style,
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
          paddingLeft: isUser ? 48 : 0,
          paddingRight: isUser ? 0 : 48,
          marginBottom: 8,
          minWidth: "100%", // Ensure full width for long messages
        }}
      >
        <div
          className={`relative px-5 py-3 rounded-2xl text-base max-w-[90vw] sm:max-w-[65%] whitespace-pre-wrap break-words leading-relaxed shadow-md
            ${isUser
              ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white border border-blue-400 dark:border-blue-700"
              : "bg-zinc-100 text-gray-900 dark:bg-zinc-800 dark:text-gray-100 border border-zinc-200 dark:border-zinc-700"
            }
            transition-colors duration-200`}
        >
          {msg.content}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 transition-colors duration-200 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-800">
      {/* Header */}
      {!hideHeader && (
        <div className="px-8 pt-8 pb-4 border-b border-gray-100 dark:border-zinc-800 flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight flex-1 truncate">
            {session.title.slice(0, 7)}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {session.summary}
          </p>
          <ChatActions />
        </div>
      )}
      {/* Chat List */}
      <div className="flex-1 min-h-0 flex flex-col justify-end">
        <div className="flex-1 overflow-y-auto px-2 py-4 sm:px-6 sm:py-8">
          <List
            ref={listRef}
            height={containerHeight}
            itemCount={session.messages.length}
            itemSize={getItemSize} // Use the function instead of fixed size
            width={"100%"}
            overscanCount={8}
            className="min-h-full"
          >
            {Row}
          </List>
        </div>
        {/* Input, always same style as empty state */}
        <div className="w-full flex justify-center px-6 pb-8">
          <div className="w-full max-w-xl">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
}