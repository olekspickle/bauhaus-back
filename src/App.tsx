import { useState } from "react";
import Bauhaus from "./components/Bauhaus";

export default function App() {
  const [triangles, setTriangles] = useState(10);
  const [circles, setCircles] = useState(15);
  const [angles, setAngles] = useState(50);
  const [sizeMax, setSizeMax] = useState(200);
  const [colorRandomness, setColorRandomness] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Bauhaus
        triangles={triangles}
        circles={circles}
        angles={angles}
        sizeMax={sizeMax}
        colorRandomness={colorRandomness}
      />
      <div className="settings-panel">
        <button className="settings-toggle" onClick={() => setSettingsOpen((v) => !v)}>
          {settingsOpen ? "▼ Settings" : "▶ Settings"}
        </button>
        {settingsOpen && (
          <div className="settings-body">
            <label className="settings-row">
              <span>TRIANGLES</span>
              <input
                type="range"
                min={0}
                max={50}
                value={triangles}
                onChange={(e) => setTriangles(Number(e.target.value))}
              />
              <span>{triangles}</span>
            </label>
            <label className="settings-row">
              <span>CIRCLES</span>
              <input
                type="range"
                min={0}
                max={50}
                value={circles}
                onChange={(e) => setCircles(Number(e.target.value))}
              />
              <span>{circles}</span>
            </label>
            <label className="settings-row">
              <span>ANGLES</span>
              <input
                type="range"
                min={0}
                max={150}
                value={angles}
                onChange={(e) => setAngles(Number(e.target.value))}
              />
              <span>{angles}</span>
            </label>
            <label className="settings-row">
              <span>SIZE</span>
              <input
                type="range"
                min={5}
                max={200}
                value={sizeMax}
                onChange={(e) => setSizeMax(Number(e.target.value))}
              />
              <span>{sizeMax}px</span>
            </label>
            <label className="settings-row">
              <span>COLOR</span>
              <input
                type="range"
                min={0}
                max={100}
                value={colorRandomness}
                onChange={(e) => setColorRandomness(Number(e.target.value))}
              />
              <span>{colorRandomness}%</span>
            </label>
          </div>
        )}
      </div>
    </>
  );
}
