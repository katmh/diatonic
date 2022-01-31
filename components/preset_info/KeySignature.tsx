interface KeySignatureInfoProps {
  zerothItems: string[];
}

const KeySignatureInfo = (props: KeySignatureInfoProps) => {
  return (
    <>
      <p className="description">
        Find the collection of sharps and flats applied to notes in a scale.
      </p>
      <p>
        Align position <span className="inline_highlight">1</span> (right ruler)
        with the major tonic (in the left ruler). The notes in the scale
        correspond to{" "}
        <span className="inline_highlight_long">
          numbers without accidentals
        </span>
        .
      </p>
      <p>
        Key signature corresponds to the keys{" "}
        <span className="dynamic">{} major</span>
        or <span className="dynamic">{} minor</span>
      </p>
    </>
  );
};

export default KeySignatureInfo;
