import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSessionMessages } from "@/store/slices/sessionsSlice";

interface ChatActionsProps {
  className?: string;
}

const ChatActions: React.FC<ChatActionsProps> = ({ className }) => {
  const dispatch = useDispatch();
  const chatData = useSelector((state: RootState) => {
    const activeSessionId = state.sessions.activeSessionId;
    return (
      state.sessions.sessions.find((session) => session.id === activeSessionId)
        ?.messages || []
    );
  });

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
    <div className={`flex gap-3 ${className}`}>
      <button
        className="text-gray-500 hover:text-white p-2 rounded-full transition-colors bg-white/90 dark:bg-zinc-900/90 shadow focus:outline-none hover:bg-green-600 dark:hover:bg-green-600 focus:ring-2 focus:ring-green-400"
        onClick={handleDownload}
        aria-label="Download chat"
        tabIndex={0}
        style={{ minWidth: 40, minHeight: 40 }}
      >
        Download
      </button>
      <label
        className="text-gray-500 hover:text-white p-2 rounded-full transition-colors bg-white/90 dark:bg-zinc-900/90 shadow focus:outline-none hover:bg-yellow-600 dark:hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 cursor-pointer"
        aria-label="Upload chat"
        tabIndex={0}
        style={{ minWidth: 40, minHeight: 40 }}
      >
        Upload
        <input
          type="file"
          accept="application/json"
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default ChatActions;
