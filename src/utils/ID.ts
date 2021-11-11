let IDs = new Set();
// TODO: remove IDs when rulers destroyed

const generateID = () => {
    let ID = generateCode(4);
    while (IDs.has(ID)) {
        ID = generateCode(4);
    }
    IDs.add(ID);
    return ID.toString();
}

const generateCode = (len) => {
    let code = [];
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < len; i++) {
        const randNum = Math.floor(Math.random() * alphabet.length);
        code.push(alphabet[randNum]);
    }
    return code.join("");
}

export default generateID;