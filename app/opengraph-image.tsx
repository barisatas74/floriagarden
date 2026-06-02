import { ImageResponse } from "next/og";

export const alt = "Floria Garden — Yeni Nesil Çiçekçi · Gemlik";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #8E1F3F 0%, #5F1228 45%, #430C1C 100%)",
          color: "#F6F1EB",
          fontFamily: "Georgia, serif",
          padding: "80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C9A46A",
            marginBottom: 24,
          }}
        >
          Yeni Nesil Çiçekçi
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 130, fontWeight: 500, letterSpacing: -3 }}>
            Floria
          </span>
          <span
            style={{
              fontSize: 130,
              fontWeight: 500,
              letterSpacing: -3,
              color: "#C9A46A",
            }}
          >
            Garden
          </span>
        </div>
        <div
          style={{
            fontSize: 34,
            fontStyle: "italic",
            color: "#E0C496",
            marginBottom: 40,
          }}
        >
          Flowers and Coffee
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(246, 241, 235, 0.7)",
            letterSpacing: 1,
          }}
        >
          Gemlik · Premium butik çiçek · Aynı gün teslimat
        </div>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            width: 80,
            height: 1,
            background: "#C9A46A",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            width: 1,
            height: 80,
            background: "#C9A46A",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 60,
            width: 80,
            height: 1,
            background: "#C9A46A",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 60,
            width: 1,
            height: 80,
            background: "#C9A46A",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
