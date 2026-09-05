"use client";

import { useEffect } from "react";
import {
  forceMerchantMailFromLocation,
  requestLas21MerchantMail,
} from "@/lib/las21-push";

export function Las21MerchantMailQa() {
  useEffect(() => {
    if (!forceMerchantMailFromLocation()) return;
    void requestLas21MerchantMail(true);
  }, []);

  return null;
}
