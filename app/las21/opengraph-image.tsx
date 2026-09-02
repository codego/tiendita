import { ImageResponse } from "next/og";

export const alt = "LAS 21";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Las21OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#C8553D",
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: 10,
          }}
        >
          LAS 21
        </div>
      </div>
    ),
    size,
  );
}
