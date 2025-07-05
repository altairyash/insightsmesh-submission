import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullScreenIcon from "./FullScreenIcon";
import { RootState } from "@/store";
import { setSessionMessages } from "@/store/slices/sessionsSlice";
import ChatActions from "./ChatActions";

interface NewChatModalProps {
  open: boolean;
  onClose: () => void;
  onFullScreen: () => void;
  children?: React.ReactNode;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
  open,
  onClose,
  onFullScreen,
  children,
}) => {
  const dispatch = useDispatch();
  const chatData = useSelector((state: RootState) => {
    const activeSessionId = state.sessions.activeSessionId;
    return (
      state.sessions.sessions.find((session) => session.id === activeSessionId)
        ?.messages || []
    );
  });

  if (!open) return null;

  const handleDownload = () => {
    if (!chatData || chatData.length === 0) {
      console.error("No chat data available to download.");
      return;
    }

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        if (Array.isArray(jsonData)) {
          dispatch(setSessionMessages(jsonData));
          console.log("Chat data successfully imported.");
        } else {
          console.error("Invalid JSON format. Expected an array of messages.");
        }
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  };

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
            <button
              className="text-gray-500 hover:text-white text-2xl font-bold rounded-full flex items-center justify-center bg-white/90 dark:bg-zinc-900/90 shadow focus:outline-none hover:bg-blue-600 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              style={{ minWidth: 40, minHeight: 40 }}
              onClick={onClose}
              aria-label="Close modal"
              tabIndex={0}
            >
              ×
            </button>
            <ChatActions />
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
