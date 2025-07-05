import SessionList from "./SessionList";
import { useDispatch } from "react-redux";
import { createSession } from "@/store/slices/sessionsSlice";
import {
  UserCircleIcon,
  PlusCircleIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import NewChatModal from "./NewChatModal";
import ChatWindow from "./ChatWindow";
import SignOutButton from "../app/SignOutButton";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      if (!prev) setFullScreen(false);
      return !prev;
    });
  };

  const handleNewChat = () => {
    dispatch(createSession());
    setShowModal(true);
    setFullScreen(false);
  };

  const modal =
    showModal && !fullScreen ? (
      <NewChatModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onFullScreen={() => {
          setShowModal(false);
          setFullScreen(true);
        }}
      >
        <div className="flex flex-col h-[70vh] min-h-[350px]">
          <ChatWindow hideHeader />
        </div>
      </NewChatModal>
    ) : null;

  return (
    <>
      {modal}
      <aside
        className={`
          group/sidebar
          h-full flex flex-col shadow-2xl transition-all duration-300
          border-r border-gray-200 dark:border-zinc-900
          bg-white/90 dark:bg-zinc-950/95 backdrop-blur-lg
          ${collapsed ? "w-16 min-w-[4rem] sm:w-16" : "w-full sm:w-[270px]"}
        `}
      >
        <button
          className={`absolute top-4 right-[-18px] z-10 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full p-1 shadow transition-transform duration-200 ${
            collapsed ? "rotate-180" : "rotate-0"
          }`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={toggleCollapse}
        >
          <ChevronDoubleLeftIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        </button>
        <div
          className={`flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 transition-all duration-300 ${
            collapsed ? "justify-center p-3" : "justify-between p-4"
          }`}
        >
          <div className="flex items-center gap-2">
            <img
              src="/globe.svg"
              alt="Logo"
              className={`transition-all duration-300 ${collapsed ? "w-7 h-7" : "w-7 h-7"}`}
            />
            {!collapsed && (
              <h1 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                InsightsMesh
              </h1>
            )}
          </div>
          {!collapsed && (
            <span className="px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold">
              Beta
            </span>
          )}
        </div>
        <div className={`transition-all duration-300 ${collapsed ? "px-2 py-2" : "p-3"}`}>
          <button
            onClick={handleNewChat}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold ${
              collapsed ? "py-2 px-0 rounded-xl" : "py-2 px-3 rounded-2xl"
            } shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base tracking-wide group`}
            aria-label="Start a new chat session"
          >
            <PlusCircleIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            {!collapsed && <span>New Chat</span>}
          </button>
        </div>
        {!showModal || fullScreen ? (
          <div
            className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-300 ${collapsed ? "px-1 py-2" : "p-3"}`}
          >
            {!collapsed && (
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Recent Sessions
              </h2>
            )}
            <SessionList collapsed={collapsed} />
          </div>
        ) : null}
        <div
          className={`border-t border-gray-100 dark:border-zinc-800 flex items-center transition-all duration-300 ${
            collapsed ? "justify-center p-2" : "justify-between p-3 gap-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <UserCircleIcon className="w-6 h-6 text-gray-400 dark:text-zinc-500" />
            {!collapsed && (
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                Guest
              </span>
            )}
          </div>
          <SignOutButton />
        </div>
      </aside>
    </>
  );
}
