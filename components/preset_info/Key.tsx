interface KeyProps {
  zerothItems: string[];
}

const Key = (props: KeyProps) => {
  return (
    <>
      <p className="description">
        A key is built from a key signature and a tonic.
      </p>
    </>
  );
};

export default Key;
