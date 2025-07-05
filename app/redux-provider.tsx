"use client";
import ReduxProvider from "../store/Provider";

export default function AppReduxProvider({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
