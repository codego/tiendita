"use client";

import { useEffect, useState } from "react";
import { LoadError } from "@/components/LoadError";
import { NETWORK_FAIL_EVENT, isBrowserOffline } from "@/lib/network";

export function OfflineGate({ children }: { children: React.ReactNode }) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    function onOnline() {
      setBlocked(false);
    }
    function onFail() {
      setBlocked(true);
    }
    window.addEventListener("online", onOnline);
    window.addEventListener(NETWORK_FAIL_EVENT, onFail);
    return () => {
      window.removeEventListener("online", onOnline);
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
