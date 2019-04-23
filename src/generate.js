const fs = require('fs');

const {encodeStr, encryptor} = require("./config");

const rawCodes = [];

for(let i = 1; i <= 50; i++) {
    rawCodes.push(i.toString());
}



const cryptedCodes = rawCodes.map(code => {
    const cryptedCode = encryptor.encrypt(code);

    return {
        code: cryptedCode,
        used: false
    };
});

//console.log(cryptedCodes);

const codesJSONStr = JSON.stringify(cryptedCodes);
fs.writeFile("./codes.json", codesJSONStr, () => {
    console.log("Encryption done.");
});

