import { rulers, rulerIDs } from "../stores.js";
import generateID from "../utils/ID.js";
import itemsInFractionalHeight from "./itemsInFractionalHeight.js";

const getInitialPosition = (type) => {
    if (type === "interval") {
        return (-24 + itemsInFractionalHeight(0.66));
    }
    return 0;
}

const updatePreset = (presetObject) => {
    if (!presetObject) {
        rulers.update(() => ({}));
        return;
    }
    let newIDs = [];
    let newRulers = {};
    presetObject.rulers.forEach(
        (type) => {
            const ID = generateID();
            newIDs.push(ID);
            newRulers[ID] = {
                type,
                position: getInitialPosition(type),
                items: [],
            };
        });
    rulers.update(() => newRulers); // oops, `rulers` MUST update before `rulerIDs`
    rulerIDs.update(() => newIDs);
};

export default updatePreset;