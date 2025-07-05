"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, updateActivity, initializeAuth } from "../../store/slices/authSlice";
import { RootState } from "../../store";
import { setupActivityTracking, setupInactivityCheck } from "../../utils/activityTracker";
import Banner from "../../components/Banner";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isAuthenticated, lastActivity } = useSelector((state: RootState) => state.auth);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    const showBanner = (message: string) => {
      setBannerMessage(message);
    };

    const cleanupInactivityCheck = setupInactivityCheck(dispatch, isAuthenticated, lastActivity, (message) => {
      if (isAuthenticated) {
        showBanner(message);
      } else {
        setBannerMessage(null);
      }
    });

    const cleanupActivityTracking = setupActivityTracking(() => {
      setBannerMessage(null);
      dispatch(updateActivity());
    });

    return () => {
      cleanupInactivityCheck();
      cleanupActivityTracking();
    };
  }, [isAuthenticated, lastActivity, dispatch]);

  return (
    <>
      {bannerMessage && (
        <Banner message={bannerMessage} onDismiss={() => setBannerMessage(null)} />
      )}
      {children}
    </>
  );
}
