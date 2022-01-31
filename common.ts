export type Preset =
  | "interval"
  | "transposing_instrument"
  | "key_signature"
  | "key_signature_modulation"
  | "key";

export const labelFromPreset: Record<Preset, string> = {
  interval: "Interval",
  transposing_instrument: "Transposing instrument",
  key_signature: "Key signature",
  key_signature_modulation: "Key signature modulator",
  key: "Key",
};

export const rulersFromPreset: Record<Preset, RulerType[]> = {
  interval: ["pitch", "interval"],
  transposing_instrument: ["pitch", "pitch"],
  key_signature: ["pitch", "position"],
  key_signature_modulation: ["pitch", "position", "position"],
  key: ["pitch", "position", "degree"],
};

export const itemsInFractionalHeight = (f: number) => {
  // given a fraction f between 0 and 1,
  // returns an approximate number of ruler items
  // that can fit in f * height of screen
  const itemHeight = 36;
  return Math.floor((window.innerHeight * f) / itemHeight);
};

export type RulerType = "pitch" | "degree" | "position" | "interval";

export const getAt = (arr: string[], i: number): string => {
  if (i >= 0 && i < arr.length) {
    return arr[i];
  }
  if (i >= arr.length) {
    return arr[i % arr.length];
  }
  // i < 0
  return arr[arr.length - (-i % arr.length)];
};

export const buildReverseMap = (labels: string[]): Map<string, number> => {
  const result = new Map();
  labels.forEach((label, i) => result.set(label, i));
  return result;
};

export const numberLabels = [
  "7",
  "♯6/♭7",
  "6",
  "♯5/♭6",
  "5",
  "♯4/♭5",
  "4",
  "3",
  "♯2/♭3",
  "2",
  "♯1/♭2",
  "1",
];

export const degreeLabels = numberLabels.map((item) => {
  const openTag = "<span class='caret'>";
  const closeTag = "</span>";
  const split = item.split("/");
  if (split.length === 1) {
    return openTag + item + closeTag;
  }
  const firstNum = split[0].slice(1);
  const secondNum = split[1].slice(1);
  return `♯${openTag}${firstNum}${closeTag}/♭${openTag}${secondNum}${closeTag}`;
});

export const majorScalePositions = new Set(["1", "2", "3", "4", "5", "6", "7"]);

export const pitchLabels = [
  "B",
  "A♯/B♭",
  "A",
  "G♯/A♭",
  "G",
  "F♯/G♭",
  "F",
  "E",
  "D♯/E♭",
  "D",
  "C♯/D♭",
  "C",
];

export const intervalLabels = [
  "P15",
  "Maj14",
  "m14",
  "Maj13",
  "m13",
  "P12",
  "A11/d12",
  "P11",
  "Maj10",
  "m10",
  "Maj9",
  "m9",
  "P8",
  "Maj7",
  "m7",
  "Maj6",
  "m6",
  "P5",
  "A4/d5",
  "P4",
  "Maj3",
  "m3",
  "Maj2",
  "m2",
  "P1",
];

export const numberToIndex = buildReverseMap(numberLabels);
export const pitchToIndex = buildReverseMap(pitchLabels);
export const intervalToIndex = buildReverseMap(intervalLabels);

export const labelsFromRulerType: Record<RulerType, string[]> = {
  pitch: pitchLabels,
  degree: numberLabels,
  position: numberLabels,
  interval: intervalLabels,
};

export const reverseMapFromRulerType: Record<RulerType, Map<string, number>> = {
  pitch: pitchToIndex,
  degree: numberToIndex,
  position: numberToIndex,
  interval: intervalToIndex,
};

export const defaultZerothItems: Record<RulerType, string> = {
  pitch: pitchLabels[0],
  degree: numberLabels[0],
  position: numberLabels[0],
  interval: intervalLabels[0],
};

export const getItemsAtOffset = (
  itemsAtZero: string[],
  rulerTypes: RulerType[],
  offset: number
): string[] => {
  let underCursor: string[] = [];
  itemsAtZero.forEach((item, i) => {
    const indexOfItemAtZero = reverseMapFromRulerType[rulerTypes[i]].get(item);
    if (typeof indexOfItemAtZero === "number") {
      underCursor.push(
        getAt(labelsFromRulerType[rulerTypes[i]], indexOfItemAtZero + offset)
      );
    }
  });
  return underCursor;
};
