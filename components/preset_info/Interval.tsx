import {
  getItemsAtOffset,
  rulersFromPreset,
  reverseMapFromRulerType,
} from "../../common";

interface IntervalInfoProps {
  zerothItems: string[];
  cursorPosition: number;
}

const IntervalInfo = (props: IntervalInfoProps) => {
  let [higherPitch, interval] = getItemsAtOffset(
    props.zerothItems,
    rulersFromPreset["interval"],
    props.cursorPosition
  );

  const indexOfP1 = reverseMapFromRulerType["interval"].get("P1");
  const indexOfPitchAtZero = reverseMapFromRulerType["interval"].get(
    props.zerothItems[1]
  );
  let lowerPitch;
  if (typeof indexOfP1 === "number" && typeof indexOfPitchAtZero === "number") {
    lowerPitch = getItemsAtOffset(
      props.zerothItems,
      rulersFromPreset["interval"],
      indexOfP1 - indexOfPitchAtZero
    )[0];
  }

  if (!higherPitch || !interval || !lowerPitch) {
    higherPitch = "N/A";
    interval = "N/A";
    lowerPitch = "N/A";
  }

  return (
    <>
      <p className="description">
        Measure the distances between any pair of pitches.
      </p>
      <p>
        Align interval <span className="inline_highlight">P1</span> in the
        interval ruler (right) to the desired lower pitch in the pitch ruler
        (left). Use the
        <span className="inline_cursor">cursor</span> to find all intervals from
        that lower pitch.
      </p>
      <ul>
        <li>
          Lower pitch: <span className="dynamic">{lowerPitch}</span>
        </li>
        <li>
          Higher pitch: <span className="dynamic">{higherPitch}</span>
        </li>
        <li>
          Interval: <span className="dynamic">{interval}</span>
        </li>
      </ul>
    </>
  );
};

export default IntervalInfo;
