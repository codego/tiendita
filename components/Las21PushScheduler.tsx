"use client";

import { useEffect } from "react";
import { armLas21LocalPing, registerLas21Worker } from "@/lib/las21-push";

export function Las21PushScheduler() {
  useEffect(() => {
    void registerLas21Worker();
    return armLas21LocalPing();
  }, []);

  return null;
}
