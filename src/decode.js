const {encryptor} = require('./config');

const decode = (code) => {
    return encryptor.decrypt(code);
}

module.exports = {
    decode
}