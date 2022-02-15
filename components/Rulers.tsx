import Ruler from "./Ruler";
import { Preset, rulersFromPreset } from "../common";

interface RulersProps {
  preset: Preset;
  numSlots: number;
  zerothItems: string[];
  updateRulers: (index: number, item: string) => void;
}

const Rulers = (props: RulersProps) => {
  return (
    <>
      {rulersFromPreset[props.preset].map((ruler, i) => {
        return (
          <Ruler
            key={i}
            type={ruler}
            preset={props.preset}
            itemAtZero={props.zerothItems[i]}
            location={i}
            numSlots={props.numSlots}
            updateRulers={props.updateRulers}
          />
        );
      })}
    </>
  );
};

export default Rulers;
