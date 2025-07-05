"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth, signOut, updateActivity } from "../store/slices/authSlice";
import { RootState } from "../store";
import LoginScreen from "./LoginScreen";

const INACTIVITY_TIMEOUT = 600000;  

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isAuthenticated, lastActivity } = useSelector((state: RootState) => state.auth);
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
useEffect(() => {
  console.log(sessions);
},[sessions])
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkInactivity = () => {
      const now = Date.now();
      if (lastActivity && now - lastActivity > INACTIVITY_TIMEOUT) {
        dispatch(signOut());
      }
    };

    const interval = setInterval(checkInactivity, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, lastActivity, dispatch]);

  useEffect(() => {
    const updateActivityOnEvent = () => {
      dispatch(updateActivity());
    };

    window.addEventListener("mousemove", updateActivityOnEvent);
    window.addEventListener("keydown", updateActivityOnEvent);

    return () => {
      window.removeEventListener("mousemove", updateActivityOnEvent);
      window.removeEventListener("keydown", updateActivityOnEvent);
    };
  }, [dispatch]);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <>{children}</>;
}
