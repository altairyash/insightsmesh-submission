"use client";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function Layout() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="min-h-full flex-1 bg-white dark:bg-zinc-900 text-black dark:text-white border-l border-gray-200 dark:border-zinc-700">
        <ChatWindow />
      </div>
    </div>
  );
}
