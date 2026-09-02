"use client";

import { useSyncExternalStore } from "react";
import { CookieBanner } from "@/components/CookieBanner";
import { PwaPrompt } from "@/components/PwaPrompt";
import {
  getCookieAccepted,
  getServerCookieAccepted,
  subscribeCookie,
} from "@/lib/cookie";
import {
  getOnboardingSeen,
  getServerOnboardingSeen,
  subscribeOnboarding,
} from "@/lib/onboarding";
import {
  getPwaDismissed,
  getServerPwaDismissed,
  subscribePwa,
} from "@/lib/pwa";

export function ShopperChrome() {
  const onboardingSeen = useSyncExternalStore(
    subscribeOnboarding,
    getOnboardingSeen,
    getServerOnboardingSeen,
  );
  const cookieOk = useSyncExternalStore(
    subscribeCookie,
    getCookieAccepted,
    getServerCookieAccepted,
  );
  const pwaLater = useSyncExternalStore(
    subscribePwa,
    getPwaDismissed,
    getServerPwaDismissed,
  );

  if (!onboardingSeen) return null;
  if (!cookieOk) return <CookieBanner />;
  if (!pwaLater) return <PwaPrompt />;
  return null;
}
