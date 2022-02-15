import { useState } from "react";
import { Preset, labelFromPreset } from "../common";

import Key from "./preset_info/Key";
import Interval from "./preset_info/Interval";
import KSModulator from "./preset_info/KSModulator";
import KeySignature from "./preset_info/KeySignature";
import TransposingInstrument from "./preset_info/TransposingInstrument";

interface DashboardProps {
  preset: Preset;
  zerothItems: string[];
  handleUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cursorPosition: number;
}

const Dashboard = (props: DashboardProps) => {
  const [mobileIsOpen, updateMobileIsOpen] = useState(false);
  const toggleMobileMenu = () => updateMobileIsOpen(!mobileIsOpen);
  return (
    <>
      <div className={`dashboard ${mobileIsOpen ? "dashboard_open" : ""}`}>
        <div>
          <h1>Diatonic Ruler 🎹</h1>
          <p>
            This website displays interactive <i>diatonic rulers</i> to let you
            explore relationships between pitch, scale degrees and positions,
            intervals, and more. To get started, select a preset.{" "}
            <a href="about">Learn more</a>
          </p>
        </div>
        <PresetMenu preset={props.preset} handleUpdate={props.handleUpdate} />
        <PresetInfo
          preset={props.preset}
          zerothItems={props.zerothItems}
          cursorPosition={props.cursorPosition}
        />
      </div>

      <div className="tab" onClick={() => toggleMobileMenu()}>
        <span>Menu</span>
      </div>
      <div
        className={`overlay ${mobileIsOpen ? "overlay_open" : ""}`}
        onClick={() => toggleMobileMenu()}
      />

      <style jsx>{`
        .dashboard {
          z-index: 3;
          height: 100%;
          width: 80%;
          max-width: 18rem;
          position: absolute;
          top: 0;
          left: -100%;
          background: #fff;
          transition: 0.3s;
          padding: 1.5rem 1.25rem;
          overflow-y: scroll;
          overflow-x: hidden;
        }

        @media (min-width: 900px) {
          .dashboard {
            position: static;
            width: 100%;
            max-width: 20rem;
            height: auto;
            font-size: 1rem;
            line-height: 1.25;
            border: 1px solid #c4befd;
            border-radius: 10px;
            margin: 1rem 2rem;
            box-shadow: 0 2px 4px rgba(63, 56, 125, 20%);
          }

          .tab,
          .overlay {
            display: none;
          }
        }

        .overlay {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2;
          cursor: pointer;
        }

        .tab {
          position: absolute;
          top: 25%;
          left: -4.25rem;
          border: 1px solid #3f387d;
          background: #3f387d;
          padding: 0.4rem 3.5rem;
          transform: rotate(90deg);
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(63, 56, 125, 20%);
          z-index: 2;
        }

        .tab span {
          text-transform: uppercase;
          font-weight: bold;
          font-size: 1.15rem;
          color: #fff;
        }

        .overlay_open {
          display: block;
        }
        .dashboard_open {
          left: 0;
        }
      `}</style>
    </>
  );
};

interface PresetMenuProps {
  preset: Preset;
  handleUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PresetMenu = (props: PresetMenuProps) => {
  return (
    <div id="preset_menu">
      <h2>Presets</h2>
      {Object.keys(labelFromPreset).map((presetName) => {
        const label = labelFromPreset[presetName as Preset];
        return (
          <div key={presetName}>
            <input
              type="radio"
              name="preset"
              id={presetName}
              value={presetName}
              checked={props.preset === presetName}
              onChange={(e) => props.handleUpdate(e)}
            />
            <label htmlFor={presetName}>{label}</label>
          </div>
        );
      })}
      <style jsx>{`
        #preset_menu {
          margin-top: 1.25rem;
        }
        input[type="radio"] {
          display: none;
        }
        label {
          display: block;
          padding: 0.4rem 0.75rem 0.3rem;
          margin: 0.15rem 0;
          transition: 0.1s;
          cursor: pointer;
          border-radius: 5px;
          line-height: 1;
          font-size: 0.95rem;
        }
        label:hover {
          background: #dad7fe;
        }
        input[type="radio"]:checked + label {
          background: #c4befd;
          font-weight: bold;
        }
        h2 {
          text-transform: uppercase;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          position: relative;
        }
        h2:after {
          position: absolute;
          content: "";
          width: 200%;
          border-bottom: 1px solid #c4befd;
          margin-left: 0.75rem;
          top: 50%;
        }
      `}</style>
    </div>
  );
};

interface PresetInfoProps {
  preset: Preset;
  zerothItems: string[];
  cursorPosition: number;
}

const PresetInfo = (props: PresetInfoProps) => {
  return (
    <div className="preset_info">
      <h2>{labelFromPreset[props.preset as Preset]}</h2>
      {(() => {
        switch (props.preset) {
          case "interval":
            return (
              <Interval
                zerothItems={props.zerothItems}
                cursorPosition={props.cursorPosition}
              />
            );
          case "transposing_instrument":
            return (
              <TransposingInstrument
                zerothItems={props.zerothItems}
                cursorPosition={props.cursorPosition}
              />
            );
          case "key_signature":
            return <KeySignature zerothItems={props.zerothItems} />;
          case "key_signature_modulation":
            return <KSModulator zerothItems={props.zerothItems} />;
          case "key":
            return (
              <Key
                zerothItems={props.zerothItems}
                cursorPosition={props.cursorPosition}
              />
            );
        }
      })()}
      <style jsx>{`
        .preset_info {
          margin-top: 1.25rem;
        }
        h2 {
          text-transform: uppercase;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          position: relative;
        }
        h2:after {
          position: absolute;
          content: "";
          width: 200%;
          border-bottom: 1px solid #c4befd;
          margin-left: 0.75rem;
          top: 50%;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
