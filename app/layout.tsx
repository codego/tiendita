import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { Las21MerchantMailQa } from "@/components/Las21MerchantMailQa";
import { OfflineGate } from "@/components/OfflineGate";
import { OsSettingsSheet } from "@/components/OsSettingsSheet";
import { getSiteUrl } from "@/lib/env";
import { homeMetadata } from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#EFE9DD",
};

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...homeMetadata(),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Con pinta",
    statusBarStyle: "default",
    // iOS splash wordmark. Android uses manifest background_color #EFE9DD.
    startupImage: ["/splash-cream.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-ink">
        <OfflineGate>{children}</OfflineGate>
        <OsSettingsSheet />
        <Las21MerchantMailQa />
      </body>
    </html>
  );
}
