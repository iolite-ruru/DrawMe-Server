// const tf = require('@tensorflow/tfjs');

const express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path"),
    fs = require('fs'),
    multer = require('multer'),
    static = require('serve-static'),
    router = express.Router(),
    app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.render("index.html");
})


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

