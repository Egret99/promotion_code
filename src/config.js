const url = "";
const encodeStr = "TMDAUTOSPROMOTION";

const Encryptor = require('cryptr');
const encryptor = new Encryptor(encodeStr);

module.exports = {
    url,
    encryptor
}