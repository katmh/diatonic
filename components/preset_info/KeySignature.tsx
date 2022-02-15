import {
  getAt,
  numberToIndex,
  pitchLabels,
  pitchToIndex,
  minorKeyFromMajor,
} from "../../common";

interface KeySignatureInfoProps {
  zerothItems: string[];
}

const KeySignatureInfo = (props: KeySignatureInfoProps) => {
  const indexOfCurrentZerothPosition = numberToIndex.get(props.zerothItems[1]);
  const indexOfPosition1 = numberToIndex.get("1");
  if (
    indexOfCurrentZerothPosition === undefined ||
    indexOfPosition1 === undefined
  ) {
    throw `Error: indexOfCurrentZerothPosition (${indexOfCurrentZerothPosition}) or indexOfPosition1 (${indexOfPosition1}) undefined`;
  }
  const positionOf1 = indexOfPosition1 - indexOfCurrentZerothPosition;

  const indexOfCurrentZerothPitch = pitchToIndex.get(props.zerothItems[0]);
  if (indexOfCurrentZerothPitch === undefined) {
    throw `Error: ${indexOfCurrentZerothPitch} undefined`;
  }
  const pitchAlignedWithPosition1 = getAt(
    pitchLabels,
    indexOfCurrentZerothPitch + positionOf1
  );

  const major = pitchAlignedWithPosition1;
  const minor = minorKeyFromMajor.get(major);

  return (
    <>
      <p className="description">
        Find the collection of sharps and flats applied to notes in a scale.
      </p>
      <p>
        Align position <span className="inline_highlight">1</span> (right ruler)
        with the major tonic (in the left ruler). The notes in the scale line up
        with{" "}
        <span className="inline_highlight_long">
          numbers without accidentals
        </span>
        .
      </p>
      <p>Key signature corresponds to the keys:</p>
      <ul>
        <li>
          <span className="dynamic">{major} major</span> or
        </li>
        <li>
          <span className="dynamic">{minor} minor</span>
        </li>
      </ul>
    </>
  );
};

export default KeySignatureInfo;
