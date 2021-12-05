const number = [
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

const degree = number.map((item) => {
    const openTag = "<span class='caret'>"
    const closeTag = "</span>"
    const split = item.split("/")
    if (split.length === 1) {
        return openTag + item + closeTag;
    }
    const firstNum = split[0].slice(1)
    const secondNum = split[1].slice(1)
    return `♯${openTag}${firstNum}${closeTag}/♭${openTag}${secondNum}${closeTag}`
})

const position = [
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

const pitch = [
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

const interval = [
    "P15",
    "M14",
    "A13/m14",
    "M13",
    "A12/m13",
    "P12",
    "A11/d12",
    "P11",
    "M10",
    "A9/m10",
    "M9",
    "A8/m9",
    "P8",
    "M7",
    "A6/m7",
    "M6",
    "A5/m6",
    "P5",
    "A4/d5",
    "P4",
    "M3",
    "A2/m3",
    "M2",
    "A1/m2",
    "P1"
]

export default { number, degree, position, pitch, interval };