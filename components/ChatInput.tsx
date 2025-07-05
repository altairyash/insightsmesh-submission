import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { RootState } from "@/store";
import {
  addUserMessage,
  addBotMessage,
  createSession,
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

    setIsDisabled(true);

    let targetSessionId = sessionId;
    if (!targetSessionId && forceCreateSession) {
      const action = createSession();
      dispatch(action);
      const state = (window as any).store?.getState?.() || {};
      targetSessionId = state.sessions?.activeSessionId;
    }

    if (targetSessionId) {
      dispatch(addUserMessage({ sessionId: targetSessionId, content: input }));

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              { role: 'user', content: input },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const accumulatedContent = data.reply;
          dispatch(
            addBotMessage({
              sessionId: targetSessionId,
              content: accumulatedContent,
            })
          );
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching response:', error);
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
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
