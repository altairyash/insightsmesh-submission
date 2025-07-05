"use client";

import { useDispatch } from "react-redux";
import { signOut } from "../store/slices/authSlice";

export default function SignOutButton() {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <button onClick={handleSignOut} style={{ padding: "10px 20px", marginTop: "10px" }} className="text-gray-300 bg-blue-600 rounded-2xl te">
      Sign Out
    </button>
  );
}
