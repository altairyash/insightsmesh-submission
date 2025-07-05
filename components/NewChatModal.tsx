import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FullScreenIcon from "./FullScreenIcon";
import { RootState } from "@/store";
import ChatActions from "./ChatActions";
import { addTagToSession } from "@/store/slices/sessionsSlice";

interface NewChatModalProps {
  open: boolean;
  onClose: () => void;
  onFullScreen: () => void;
  children?: React.ReactNode;
}

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

const NewChatModal: React.FC<NewChatModalProps> = ({
  open,
  onClose,
  onFullScreen,
  children,
}) => {
  const dispatch = useDispatch();
  const activeSessionId = useSelector(
    (state: RootState) => state.sessions.activeSessionId
  );

  const handleAddTag = (tag: string) => {
    if (activeSessionId) {
      dispatch(addTagToSession({ sessionId: activeSessionId, tag }));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl min-w-[320px] max-h-[95vh] flex flex-col relative animate-fadeIn border border-gray-200 dark:border-zinc-800 mx-2 sm:mx-6 my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-gray-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 sticky top-0 z-10 rounded-t-2xl">
          <div className="font-bold text-xl text-gray-900 dark:text-gray-100 select-none">
            New Chat
          </div>
          <div className="flex gap-3">
            <button
              className="text-gray-500 hover:text-white p-2 rounded-full transition-colors bg-white/90 dark:bg-zinc-900/90 shadow focus:outline-none hover:bg-blue-600 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              onClick={onFullScreen}
              aria-label="Expand to full screen"
              tabIndex={0}
              style={{ minWidth: 40, minHeight: 40 }}
            >
              <FullScreenIcon className="w-6 h-6" />
            </button>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 text-sm dark:text-gray-200"
              onChange={(e) => handleAddTag(e.target.value)}
            >
              <option value="" disabled selected>
                Add Tag
              </option>
              {predefinedTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <ChatActions />
            <button
              className="text-gray-500 hover:text-white text-2xl font-bold rounded-full flex items-center justify-center bg-white/90 dark:bg-zinc-900/90 shadow focus:outline-none hover:bg-blue-600 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              style={{ minWidth: 40, minHeight: 40 }}
              onClick={onClose}
              aria-label="Close modal"
              tabIndex={0}
            >
              ×
            </button>
          </div>
        </div>
        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto px-2 py-2 sm:px-6 sm:py-6 bg-zinc-100 dark:bg-zinc-900 rounded-b-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
