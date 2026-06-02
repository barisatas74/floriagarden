import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #8E1F3F 0%, #5F1228 50%, #430C1C 100%)",
          color: "#E0C496",
          fontSize: 96,
          fontWeight: 600,
          fontFamily: "Georgia, serif",
          letterSpacing: -2,
        }}
      >
        FG
      </div>
    ),
    { ...size },
  );
}
