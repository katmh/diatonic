import { rulers } from "../stores.js";
import generateID from "../utils/ID.js";

const updatePreset = (presetObject) => {
    if (!presetObject) {
        rulers.update(() => ({}));
        return;
    }
    rulers.update(() => {
        let newRulers = {};
        presetObject.rulers.forEach(
            (type) =>
                (newRulers[generateID()] = {
                    type,
                    position: 0,
                    items: [],
                })
        );
        return newRulers;
    });
};

export default updatePreset;