import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import ChatInput from "./ChatInput";
import { VariableSizeList as List } from "react-window";
import ChatActions from "./ChatActions";
import {
  addTagToSession,
  removeTagFromSession,
} from "@/store/slices/sessionsSlice";

interface ChatWindowProps {
  hideHeader?: boolean;
}

const NoChatUI = () => (
  <div className="min-h-full flex flex-1 flex-col rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 transition-colors duration-200">
    <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8">
      <div className="flex flex-col items-center justify-center w-full">
        <svg
          width="64"
          height="64"
          fill="none"
          viewBox="0 0 64 64"
          className="mb-6"
        >
          <rect
            x="8"
            y="16"
            width="48"
            height="32"
            rx="8"
            fill="#3B82F6"
            fillOpacity="0.10"
          />
          <rect
            x="16"
            y="24"
            width="32"
            height="16"
            rx="4"
            fill="#3B82F6"
            fillOpacity="0.20"
          />
          <rect
            x="24"
            y="32"
            width="16"
            height="4"
            rx="2"
            fill="#3B82F6"
            fillOpacity="0.30"
          />
        </svg>
        <h2 className="text-xl font-semibold text-gray-400 dark:text-gray-300 mb-2 text-center">
          No chat yet
        </h2>
        <p className="text-base text-gray-400 dark:text-gray-300 text-center max-w-xs mb-6">
          Start a new conversation below.
        </p>
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

const predefinedTags = [
  "Important",
  "Work",
  "Personal",
  "Urgent",
  "Follow-up",
  "Idea",
  "Reference",
  "Miscellaneous",
];

const TagCapsules = ({
  tags,
  onRemove,
}: {
  tags: string[];
  onRemove: (tag: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <div
        key={tag}
        className="relative group px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 border border-blue-300 dark:border-blue-700"
      >
        {tag}
        <button
          className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onRemove(tag)}
        >
          ×
        </button>
      </div>
    ))}
  </div>
);

export default function ChatWindow({ hideHeader = false }: ChatWindowProps) {
  const listRef = useRef<any>(null);

  const dispatch = useDispatch();

  const session = useSelector((state: RootState) =>
    state.sessions.sessions.find((s) => s.id === state.sessions.activeSessionId)
  );

  const { activeSessionId } = useSelector((state: RootState) => state.sessions);

  useEffect(() => {
    if (session && listRef.current) {
      listRef.current.scrollToItem(session.messages.length - 1, "end");
    }
  }, [session?.messages.length]);

  if (!activeSessionId) {
    return <NoChatUI />;
  }

  if (!session) {
    return <NoChatUI />;
  }

  const getItemSize = (index: number) => {
    const msg = session.messages[index];
    if (!msg || !msg.content || msg.content.length === 0) {
      console.log("Message or content is undefined", msg);
      return 80;
    }
    const baseSize = 80;
    const extraSize = Math.ceil(msg?.content?.length / 100) * 40; 
    return baseSize + extraSize;
  };

  const containerHeight =
    typeof window !== "undefined" ? window.innerHeight - 200 : 600; 

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
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
          minWidth: "100%",  
        }}
      >
        <div
          className={`relative px-5 py-3 rounded-2xl text-base max-w-[90vw] sm:max-w-[65%] whitespace-pre-wrap break-words leading-relaxed shadow-md
            ${
              isUser
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

  const handleAddTag = (tag: string) => {
    if (session) {
      dispatch(addTagToSession({ sessionId: session.id, tag }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    if (session) {
      dispatch(removeTagFromSession({ sessionId: session.id, tag }));
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 transition-colors duration-200 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-800">
      {/* Header */}
      {!hideHeader && (
        <div className="px-8 pt-8 pb-4 border-b border-gray-100 dark:border-zinc-800 flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight flex-1 truncate">
            {session.title.split(" ").slice(0, 3).join(" ")}
          </h1>
          {session.summary && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
              {session.summary}
            </p>
          )}
          <select
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            onChange={(e) => handleAddTag(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Add Tag
            </option>
            {predefinedTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <ChatActions />
        </div>
      )}
      {/* Tags Section */}
      <div className="px-8 py-4 border-b border-gray-100 dark:border-zinc-800">
        <TagCapsules tags={session.tags} onRemove={handleRemoveTag} />
      </div>
      {/* Chat List */}
      <div className="flex-1 min-h-0 flex flex-col justify-end">
        <div className="flex-1 overflow-y-auto px-2 py-4 sm:px-6 sm:py-8">
          <List
            ref={listRef}
            height={containerHeight}
            itemCount={session.messages.length}
            itemSize={getItemSize}  
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
