import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { RootState } from "@/store";
import {
  addUserMessage,
  addBotMessage,
  createSession,
  updateSessionTitleAndSummary,
} from "@/store/slices/sessionsSlice";

interface ChatInputProps {
  forceCreateSession?: boolean;
}

export default function ChatInput({
  forceCreateSession = false,
}: ChatInputProps) {
  const dispatch = useDispatch();
  const sessionId = useSelector(
    (state: RootState) => state.sessions.activeSessionId
  );

  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (forceCreateSession && inputRef.current) {
      inputRef.current.focus();
    }
  }, [forceCreateSession]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const inputData = input;
    setInput("");

    setIsDisabled(true);

    let targetSessionId = sessionId;
    if (!targetSessionId) {
      const action = createSession();
      dispatch(action);
      const state = (window as any).store?.getState?.() || {};
      targetSessionId = state.sessions?.activeSessionId;
    }

    if (targetSessionId) {
      dispatch(addUserMessage({ sessionId: targetSessionId, content: inputData }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: inputData }],
          }),
        });

        if (response.ok) {
          const state = (window as any).store?.getState?.() || {};
          const activeSessionId = state.sessions?.activeSessionId;
          const data = await response.json();
          const accumulatedContent = data.reply;
          dispatch(
            addBotMessage({
              sessionId: activeSessionId,
              content: accumulatedContent,
            })
          );

          const sessions = state.sessions?.sessions || [];
          const session = sessions.find((s: any) => s.id === activeSessionId);

          if (session && session.messages && session.messages.length >= 3) {
            const formattedMessages = session.messages.map((msg: any) => ({
              role: msg.role || "user",
              content: msg.content,
            }));

            const response = await fetch("/api/generateTitleAndSummary", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ sessionId: activeSessionId, messages: formattedMessages }),
            });

            if (response.ok) {
              const { title, summary } = await response.json();
              const slicedSummary = summary.split(" ").slice(0, 6).join(" ") + "...";

              dispatch(
                updateSessionTitleAndSummary({ sessionId: targetSessionId, title, summary: slicedSummary })
              );
            } else {
              console.error("Error generating title and summary:", response);
            }
          }
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching response:", error);
      } finally {
        setIsDisabled(false);
      }

      setInput("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-gray-200"
        disabled={isDisabled}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={isDisabled}
      >
        Send
      </button>
    </div>
  );
}
