const {url} = require('../config');
const mongoose = require('mongoose');

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
})