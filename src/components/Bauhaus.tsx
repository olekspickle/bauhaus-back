import { useMemo } from "react";
import "./Bauhaus.css";

const COLORS = ["yellow", "blue", "red", "orange", "green", "black"];

function rand(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function pickColor() {
  return COLORS[rand(0, COLORS.length - 1)];
}

interface ShapeStyle {
  "--w": number;
  "--h": number;
  "--top": number;
  "--left": number;
  "--color": string;
  "--rotate"?: number;
  "--tri-anim"?: string;
}

function shapeStyle(sizeMax: number, colorRandomness: number, overrides: Partial<ShapeStyle> = {}): ShapeStyle {
  const opacity = colorRandomness > 0
    ? Math.random() * (colorRandomness / 100)
    : 1;
  return {
    "--w": rand(5, sizeMax),
    "--h": rand(5, sizeMax),
    "--top": rand(0, 90),
    "--left": rand(0, 90),
    "--color": pickColor(),
    "--opacity": opacity,
    ...overrides,
  } as ShapeStyle;
}

interface BauhausProps {
  triangles: number;
  circles: number;
  angles: number;
  sizeMax: number;
  colorRandomness: number;
}

export default function Bauhaus({ triangles, circles, angles, sizeMax, colorRandomness }: BauhausProps) {
  const shapes = useMemo(() => {
    const tri = Array.from({ length: triangles }, (_, i) => ({
      key: `t-${i}`,
      className: "shape shape-triangle",
      style: shapeStyle(sizeMax, colorRandomness, {
        "--w": 0,
        "--h": 0,
        "--tri-anim": i % 2 === 0 ? "rotate" : "rotate-rev",
      }),
    }));

    const circ = Array.from({ length: circles }, (_, i) => ({
      key: `c-${i}`,
      className: "shape shape-circle",
      style: shapeStyle(sizeMax, colorRandomness, {
        "--w": rand(5, sizeMax),
        "--h": rand(5, sizeMax),
      }),
    }));

    const ang = Array.from({ length: angles }, (_, i) => ({
      key: `a-${i}`,
      className: "shape shape-angle",
      style: shapeStyle(sizeMax, colorRandomness, {
        "--w": rand(1, Math.min(10, sizeMax)),
        "--h": rand(5, sizeMax * 2),
        "--rotate": rand(-305, -5),
      }),
    }));

    return [...tri, ...circ, ...ang];
  }, [triangles, circles, angles, sizeMax, colorRandomness]);

  return (
    <div className="bauhaus-scene">
      {shapes.map((s) => (
        <div key={s.key} className={s.className} style={s.style as React.CSSProperties} />
      ))}
    </div>
  );
}
