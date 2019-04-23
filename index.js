const express = require('express');
const path = require('path');
const fs = require('fs');

const {decode} = require('./src/decode');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "./views"));

app.post('/', (req, res) => {
    const code = req.body.code;
    const index = decode(code) - 1;

    fs.readFile(path.join(__dirname, '/src/codes.json'), (err, data) => {
        if(err) {
            return res.send({
                err
            });
        } else {
            const codes = JSON.parse(data.toString());
            const used = codes[index].used;
            res.render('index', {
                used,
                code: index + 1
            })
        }
    });
});

app.post('/delete', (req, res) => {
    const code = req.body.code;
    const index = decode(code) - 1;

    fs.readFile(path.join(__dirname, '/src/codes.json'), (err, data) => {
        if(err) {
            return res.send({
                err
            });
        } else {
            const codes = JSON.parse(data.toString());
            codes[index].used = true;

            const changedCodesStr = JSON.stringify(codes);
            fs.writeFile(path.join(__dirname, './src/codes.json'), changedCodesStr, () => {
                console.log("Encryption done.");
                return res.render('index', {
                    msg: `Code ${index + 1} has been set to used.`
                });
            });

        }
    });
});

app.listen(PORT, () => {
    console.log("App Running on port " + PORT);
})