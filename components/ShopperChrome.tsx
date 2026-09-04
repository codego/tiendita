"use client";

import { useSyncExternalStore } from "react";
import { CookieBanner } from "@/components/CookieBanner";
import { Las21PushScheduler } from "@/components/Las21PushScheduler";
import { Las21PushSheet } from "@/components/Las21PushSheet";
import { PwaIosSheet } from "@/components/PwaIosSheet";
import { PwaPrompt } from "@/components/PwaPrompt";
import {
  getCookieAccepted,
  getServerCookieAccepted,
  subscribeCookie,
} from "@/lib/cookie";
import {
  getPushSheetHidden,
  getServerPushSheetHidden,
  subscribeLas21Push,
} from "@/lib/las21-push";
import {
  getOnboardingSeen,
  getServerOnboardingSeen,
  subscribeOnboarding,
} from "@/lib/onboarding";
import {
  getPwaAndroidHidden,
  getPwaIosDismissed,
  getServerPwaDismissed,
  getServerPwaIosDismissed,
  subscribePwa,
  subscribePwaIos,
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
  const iosDismissed = useSyncExternalStore(
    subscribePwaIos,
    getPwaIosDismissed,
    getServerPwaIosDismissed,
  );
  const androidHidden = useSyncExternalStore(
    subscribePwa,
    getPwaAndroidHidden,
    getServerPwaDismissed,
  );
  const pushHidden = useSyncExternalStore(
    subscribeLas21Push,
    getPushSheetHidden,
    getServerPushSheetHidden,
  );

  if (!onboardingSeen) return null;
  if (!cookieOk) return <CookieBanner />;
  if (!iosDismissed) return <PwaIosSheet />;
  if (!androidHidden) return <PwaPrompt />;

  return (
    <>
      {pushHidden ? null : <Las21PushSheet />}
      <Las21PushScheduler />
    </>
  );
}
