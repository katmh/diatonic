import {
  getAt,
  numberToIndex,
  pitchLabels,
  pitchToIndex,
  minorKeyFromMajor,
} from "../../common";

interface KSModulatorProps {
  zerothItems: string[];
}

const INDEX_OF_POSITION1 = numberToIndex.get("1");
if (INDEX_OF_POSITION1 === undefined) {
  throw `Error, INDEX_OF_POSITION1 undefined`;
}

const getPositionOfPosition1Item = (zerothItem: string) => {
  const indexOfCurrentZerothPosition = numberToIndex.get(zerothItem);
  if (indexOfCurrentZerothPosition === undefined) {
    throw `Error, indexOfCurrentZerothPosition undefined`;
  }
  return INDEX_OF_POSITION1 - indexOfCurrentZerothPosition;
};

const getPitchAlignedWithPosition1 = (
  zerothPitch: string,
  positionOf1: number
) => {
  const indexOfCurrentZerothPitch = pitchToIndex.get(zerothPitch);
  if (indexOfCurrentZerothPitch === undefined) {
    throw `Error: ${indexOfCurrentZerothPitch} undefined`;
  }
  return getAt(pitchLabels, indexOfCurrentZerothPitch + positionOf1);
};

const KSModulator = (props: KSModulatorProps) => {
  const positionOf1_left = getPositionOfPosition1Item(props.zerothItems[1]);
  const positionOf1_right = getPositionOfPosition1Item(props.zerothItems[2]);

  const majorTonic_left = getPitchAlignedWithPosition1(
    props.zerothItems[0],
    positionOf1_left
  );
  const majorTonic_right = getPitchAlignedWithPosition1(
    props.zerothItems[0],
    positionOf1_right
  );

  const minor_left = minorKeyFromMajor.get(majorTonic_left);
  const minor_right = minorKeyFromMajor.get(majorTonic_right);
  return (
    <>
      <p className="description">
        Key signature modulation shows overlap and changing notes between two
        diatonic scales.
      </p>
      <p>
        Set up the first key signature by aligning position{" "}
        <span className="inline_highlight">1</span> in the middle ruler to the
        major tonic you want. For the second key signature, do the same with the
        right ruler.
      </p>
      <p>
        Then you can see what notes are shared or not shared between two key
        signatures, compare the diatonic positions of certain notes, and more.
      </p>
      <ul>
        <li>
          First key signature:{" "}
          <span className="dynamic">{majorTonic_left} major</span> or{" "}
          <span className="dynamic">{minor_left}</span> minor
        </li>
        <li>
          Second key signature:{" "}
          <span className="dynamic">{majorTonic_right} major</span> or{" "}
          <span className="dynamic">{minor_right}</span> minor
        </li>
      </ul>
    </>
  );
};

export default KSModulator;
