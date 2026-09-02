import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EFE9DD",
        }}
      >
        <div
          style={{
            color: "#C8553D",
            fontSize: 280,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          C
        </div>
      </div>
    ),
    size,
  );
}
