import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { selectSession, deleteSession } from "@/store/slices/sessionsSlice";
import { FaTrash } from "react-icons/fa";

interface SessionListProps {
  collapsed?: boolean;
}

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
};

export default function SessionList({ collapsed = false }: SessionListProps) {
  const dispatch = useDispatch();
  const { sessions, activeSessionId } = useSelector((state: RootState) => state.sessions);
  const sessionsList = [...sessions].sort((a, b) => (b.lastUpdated ?? 0) - (a.lastUpdated ?? 0));

  const handleSelectSession = (sessionId: string, e?: unknown) => {
    dispatch(selectSession(sessionId));
  };

  const handleDeleteSession = (sessionId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    dispatch(deleteSession(sessionId));
  };

  return (
    <div className={`flex flex-col ${collapsed ? 'gap-2' : 'gap-3'}`}>
      {sessionsList.length === 0 ? (
        <div className={`text-center text-gray-400 dark:text-gray-500 ${collapsed ? 'py-4 text-xs' : 'py-10 text-base font-medium'}`}>
          {collapsed ? <span className="rotate-90 block">⟶</span> : 'No sessions yet. Create your first chat!'}
        </div>
      ) : (
        sessionsList.map((session) => (
          <div
            key={session.id}
            className={`flex items-center justify-between p-2 border rounded-lg transition-all cursor-pointer
              ${collapsed ? 'flex-row justify-center' : 'flex-row gap-2'}
              ${activeSessionId === session.id
                ? "bg-blue-50 dark:bg-blue-900/40 border-blue-400 dark:border-blue-700 scale-[1.03]"
                : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"}
            `}
            onClick={() => handleSelectSession(session.id)}
          >
            <div className="flex-1 truncate">
              <div className="font-semibold text-gray-900 dark:text-white text-lg">
                {session.title.slice(0, 7)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {session.messages.length} messages • {formatTime(session.lastUpdated ?? 0)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {session.summary || "No summary available"}
              </div>
            </div>
            {(!collapsed && <button
              onClick={(e) => handleDeleteSession(session.id, e)}
              className="text-gray-200 hover:text-gray-300 transition-all text-md"
              aria-label="Delete session"
            >
              <FaTrash />
            </button>)}
          </div>
        ))
      )}
    </div>
  );
}
