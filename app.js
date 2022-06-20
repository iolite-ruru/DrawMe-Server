/*
0. alien
1. crab
2. dog
3. fish
4. jellyfish
5. monkey
6. sheep
7. snake
*/

const tf = require('@tensorflow/tfjs');
const express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path"),
    fs = require('fs'),
    multer = require('multer'),
    static = require('serve-static'),
    router = express.Router(),
    app = express();
    // require('@tensorflow/tfjs-node');
const tfNodeBackend = require('@tensorflow/tfjs-node-backend');

tf.setBackend(tfNodeBackend);

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/uploads'));

app.get("/", function (req, res) {
    res.render("index");
})

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

let upload = multer({
    storage: storage
});


let accuracy = -1;

app.post('/uploadimage', upload.single("imgfile"), (req, res, next) => {
    let file = req.file;
    console.log(":::file = "+file.filename);
    console.log("/uploadimage 호출");

    tf.loadLayersModel('./model.json').then(function (model) {
        console.log("model.js 실행");

        //let image
        
        //let img = tf.browser.fromPixels(di).div(255);

        var img = new Image();
        img.src = '../uploads/'+file.filename;
        console.log(img.src);
        
        img = tf.image.resizeBilinear(img, [224, 224]);
        img = tf.expandDims(img, 0);
        // img = tf.process_input(img) / 255;
        const prediction = model.predict(img);
        const predictionArray = prediction.dataSync()
        console.log(predictionArray);
        accuracy = predictionArray[0];
        //console.log(predictionArray[0]);
    });
    res.render("index");
});

app.get('/accuracy', (req, res, next) => {
    console.log("/accuracy 호출");
    console.log("accuracy: "+accuracy);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

