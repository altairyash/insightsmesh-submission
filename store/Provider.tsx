"use client";

import { Provider } from "react-redux";
import store from ".";

if (typeof window !== "undefined") {
  (window as any).store = store;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
