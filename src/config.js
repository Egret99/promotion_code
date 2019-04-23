const url = "";
const encodeStr = "TMDAUTOSPROMOTIONCODE";

const encryptor = require('simple-encryptor')(encodeStr);

module.exports = {
    url,
    encryptor
}