"use client";

import { useEffect, useState } from "react";
import { LoadError } from "@/components/LoadError";
import { NETWORK_FAIL_EVENT, isBrowserOffline } from "@/lib/network";

export function OfflineGate({ children }: { children: React.ReactNode }) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    function sync() {
      setBlocked(isBrowserOffline());
    }
    function onFail() {
      setBlocked(true);
    }
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    window.addEventListener(NETWORK_FAIL_EVENT, onFail);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
      window.removeEventListener(NETWORK_FAIL_EVENT, onFail);
    };
  }, []);

  function retry() {
    if (isBrowserOffline()) {
      setBlocked(true);
      return;
    }
    setBlocked(false);
  }

  if (!blocked) return children;

  return <LoadError onRetry={retry} />;
}
