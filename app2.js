// const tf = require('@tensorflow/tfjs-node');
// const express = require('express');
// const app = express();
// const model = tf.loadLayersModel('./model.json');
// const img = document.getElementById('img');

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

    tf.loadLayersModel('./model.json').then(function (model) {

        console.log("app2.js 실행");
        var img = new Image();
        img.src = './cat16.png';
        // img = tf.browser.fromPixels(di).div(255);
        img = tf.image.resizeBilinear(img, [224, 224])
        img = tf.expandDims(img, 0)
        // img = tf.process_input(img) / 255; //
        const prediction = model.predict(img);
        const predictionArray = prediction.dataSync()
        console.log(predictionArray);
    });
})


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

