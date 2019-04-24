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
    let index;
    
    try { 
        index = parseInt(decode(code)) - 1;
    } catch (err) {
        res.render('index', {
            checkErr: "Code invalid"
        })
    }

    if(index) {
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
    } else {
        res.render('index', {
            checkErr: "Code invalid"
        })
    }
});

app.post('/delete', (req, res) => {
    const code = req.body.code;
    let index;

    try {
        index = parseInt(decode(code)) - 1;
    } catch (err) {
        res.render('index', {
            setErr: "Code invalid"
        })
    }

    if(index) {
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
    } else {
        res.render('index', {
            setErr: "Code invalid"
        })
    }

});

app.listen(PORT, () => {
    console.log("App Running on port " + PORT);
})