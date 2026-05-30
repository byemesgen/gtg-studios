import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "GTG Studios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const fontData = readFileSync(
    join(process.cwd(), "public/fonts/inter-bold-italic.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#EB2A24",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 48px 48px",
        }}
      >
        <span
          style={{
            fontFamily: "Inter",
            fontSize: "168px",
            fontWeight: 700,
            fontStyle: "italic",
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          GTG Studios
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "italic",
          weight: 700,
        },
      ],
    }
  );
}
