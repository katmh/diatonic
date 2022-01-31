interface KSModulatorProps {
  zerothItems: string[];
}

const KSModulator = (props: KSModulatorProps) => {
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
        <li>First key signature:</li>
        <li>Second key signature:</li>
      </ul>
    </>
  );
};

export default KSModulator;
