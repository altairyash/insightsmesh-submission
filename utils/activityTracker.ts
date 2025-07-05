import { Dispatch } from "react";
import { signOut, updateActivity } from "../store/slices/authSlice";

const INACTIVITY_TIMEOUT = 40000;  

export const setupActivityTracking = (dispatch: Dispatch<any>) => {
  const updateActivityOnEvent = () => {
    dispatch(updateActivity());
  };

  window.addEventListener("mousemove", updateActivityOnEvent);
  window.addEventListener("keydown", updateActivityOnEvent);

  return () => {
    window.removeEventListener("mousemove", updateActivityOnEvent);
    window.removeEventListener("keydown", updateActivityOnEvent);
  };
};

export const setupInactivityCheck = (
  dispatch: Dispatch<any>,
  isAuthenticated: boolean,
  lastActivity: number | null,
  showBanner: (message: string) => void
) => {
  if (!isAuthenticated) return () => {};

  const checkInactivity = () => {
    const now = Date.now();
    const timeLeft = INACTIVITY_TIMEOUT - (now - (lastActivity || 0));

    if (typeof showBanner !== "function") {
      console.error("showBanner is not a function");
      return;
    }

    if (timeLeft <= 10000 && timeLeft > 0) {
      showBanner(`You will be automatically logged out in ${Math.ceil(timeLeft / 1000)} seconds due to inactivity.`);
    }

    if (lastActivity && now - lastActivity > INACTIVITY_TIMEOUT) {
      dispatch(signOut());
    }
  };

  const interval = setInterval(checkInactivity, 1000);
  return () => clearInterval(interval);
};
