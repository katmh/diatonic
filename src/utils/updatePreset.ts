import { rulers } from "../stores.js";
import generateID from "../utils/ID.js";
import itemsInFractionalHeight from "./itemsInFractionalHeight.js";

const updatePreset = (presetObject) => {
    if (!presetObject) {
        rulers.update(() => ({}));
        return;
    }
    let itemsInTwoThirds = itemsInFractionalHeight(.66);
    rulers.update(() => {
        let newRulers = {};
        presetObject.rulers.forEach(
            (type) =>
                (newRulers[generateID()] = {
                    type,
                    position: type === "interval" ? (-24 + itemsInTwoThirds) : 0,
                    items: [],
                })
        );
        return newRulers;
    });
};

export default updatePreset;