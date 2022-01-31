import {
  getItemsAtOffset,
  rulersFromPreset,
  reverseMapFromRulerType,
} from "../../common";

interface TransposingInstrumentInfoProps {
  zerothItems: string[];
  cursorPosition: number;
}

const TransposingInstrumentInfo = (props: TransposingInstrumentInfoProps) => {
  let [written, concert] = getItemsAtOffset(
    props.zerothItems,
    rulersFromPreset["transposing_instrument"],
    props.cursorPosition
  );

  const indexOfC = reverseMapFromRulerType["pitch"].get("C");
  const indexOfPitchAtZero = reverseMapFromRulerType["pitch"].get(
    props.zerothItems[0]
  );
  let transposition;
  if (typeof indexOfC === "number" && typeof indexOfPitchAtZero === "number") {
    transposition = getItemsAtOffset(
      props.zerothItems,
      rulersFromPreset["transposing_instrument"],
      indexOfC - indexOfPitchAtZero
    )[1];
  }

  if (!transposition || !written || !concert) {
    transposition = "N/A";
    written = "N/A";
    concert = "N/A";
  }

  return (
    <>
      <p className="description">
        See the mappings between written and concert pitches for transposing
        instruments.
      </p>

      <p>
        For an instrument in B♭, for example, align B♭ in the right ruler
        (concert pitch) with <span className="inline_highlight">C</span> in the
        left ruler (written pitch). Use the{" "}
        <span className="inline_cursor">cursor</span> to see corresponding
        notes.
      </p>

      <ul>
        <li>
          Instrument in <span className="dynamic">{transposition}</span>
        </li>
        <li>
          Written <span className="dynamic">{written}</span>
        </li>
        <li>
          Concert <span className="dynamic">{concert}</span>
        </li>
      </ul>
    </>
  );
};

export default TransposingInstrumentInfo;
