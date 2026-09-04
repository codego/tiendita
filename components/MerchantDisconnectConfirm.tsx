"use client";

import { useState } from "react";
import { dashboardCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";

export function DisconnectTiendaNube({ className }: { className?: string }) {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirm(true)}
        className={className}
      >
        {dashboardCopy.disconnect}
      </button>
      {confirm ? (
        <MerchantDisconnectConfirm onCancel={() => setConfirm(false)} />
      ) : null}
    </>
  );
}

export function MerchantDisconnectConfirm({
  onCancel,
}: {
  onCancel: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-ink/40 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disconnect-title"
    >
      <div className="relative w-full rounded-2xl bg-paper px-6 pt-8 pb-6 text-center shadow-[0_16px_48px_rgba(22,21,19,0.16)]">
        <h2
          id="disconnect-title"
          className="font-serif text-[28px] leading-tight text-ink"
        >
          {dashboardCopy.disconnect}
        </h2>
        <form action={routes.marcasDesconectar} method="post">
          <button
            type="submit"
            className="mt-8 flex h-12 w-full items-center justify-center rounded-2xl bg-terracotta font-sans text-[16px] font-medium text-paper"
          >
            {dashboardCopy.disconnect}
          </button>
        </form>
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 flex h-11 w-full items-center justify-center font-sans text-[15px] text-ink/55"
        >
          {dashboardCopy.disconnectCancel}
        </button>
      </div>
    </div>
  );
}
