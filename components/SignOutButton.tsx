"use client";

import { useDispatch } from "react-redux";
import { signOut } from "../store/slices/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton({ collapsed }: { collapsed: boolean }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <button
      onClick={handleSignOut}
      style={{ padding: collapsed ? "10px" : "10px 20px", marginTop: "10px" }}
      className={`text-gray-300 bg-blue-600 rounded-2xl ${collapsed ? "flex items-center justify-center" : ""}`}
    >
      {collapsed ? <FaSignOutAlt className="" /> : "Sign Out"}
    </button>
  );
}
