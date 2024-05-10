var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
;
const cors = require("cors");
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//localhost:27017
(async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/quiz")
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()



const router = require('./routes/index');
app.use('/', router);

app.use(function (req, res, next) {
    next(createError(404));
});

const PORT = 5600;
app.listen(PORT, console.log(`Server running port ${PORT}`));
