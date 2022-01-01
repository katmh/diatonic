import generateID from "../utils/ID.js";
import items from "../data/items";
import { rulers, rulerIDs } from "../stores.js";
import itemsInFractionalHeight from "./itemsInFractionalHeight.js";

const getInitialPosition = (type, preset, n) => {
    if (type === "interval") {
        return -24 + itemsInFractionalHeight(0.66);
    }
    if (preset === "transposing_instrument" && n == 1) {
        return -2;
    }
    return 0;
};

const updatePreset = (presetObject: {
    name: string;
    label: string;
    rulers: string[];
    component: any;
}) => {
    if (!presetObject) {
        rulers.update(() => ({}));
        return;
    }

    let newIDs = [];
    let newRulers = {};
    for (let i = 0; i < presetObject.rulers.length; i++) {
        const rulerType = presetObject.rulers[i];
        const ID = generateID();
        newIDs.push(ID);
        newRulers[ID] = {
            type: rulerType,
            position: getInitialPosition(rulerType, presetObject.name, i),
            items: items[rulerType],
        };
    }
    rulers.update(() => newRulers); // oops, `rulers` MUST update before `rulerIDs`
    rulerIDs.update(() => newIDs);
};

export default updatePreset;
