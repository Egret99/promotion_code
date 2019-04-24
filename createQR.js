const fs = require('fs');
const path = require('path');
const request = require('request');

fs.readFile(path.join(__dirname, "src/codes.json"), async (err, data) => {
    if(err) {
        console.log(err);
    } else {
        const codesInformation = JSON.parse(data.toString());
        const codes = codesInformation.map(code => code.code);
        
        for(let i = 0; i<codes.length; i++) {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&format=png&data=TMD%20promotion%20code:%20${codes[i]}`;
            await request(url).pipe(fs.createWriteStream(`./qrcodes/${i+1}.png`));
        }
    }
})