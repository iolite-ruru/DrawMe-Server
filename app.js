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

const tf = require('@tensorflow/tfjs-node');
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
app.use(express.static(__dirname + '/uploads'));

app.get("/", function (req, res) {
    // res.render("index");
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
    storage: storage,
});

let accuracy = -1;
let accuracyIdx = -1;
let type = null;

app.post('/uploadimage', upload.single("imgfile"), (req, res, next) => {
    let file = req.file;
    let customer = req.body.customer;
    console.log("req.params: "+req.params);
    console.dir(req.body);

    // console.log("/uploadimage 호출");
    // console.log("file: " + file.filename);
    //console.log("file.mimetype: " + file.mimetype); // image/png

    tf.loadLayersModel('file://public/model.json').then(function (model) {
        console.log("model.js 실행");

        //let img = tf.browser.fromPixels(di).div(255);

        let filePath = __dirname + '/uploads/' + file.filename;

        let imgBuffer = fs.readFileSync(filePath);
        let img = tf.node.decodeImage(imgBuffer);

        img = tf.image.resizeBilinear(img, [224, 224]);
        img = tf.expandDims(img, 0);
        // img = tf.process_input(img);
        let prediction = model.predict(img);
        let predictionArray = prediction.dataSync();
        console.log("predictionArray: " + predictionArray);
        
        console.log(customer);
        switch(customer){
            case "alien":
                accuracyIdx = 0; break;
            case "crab":
                accuracyIdx = 1; break;
            case "dog":
                accuracyIdx = 2; break;
            case "fish":
                accuracyIdx = 3; break;
            case "jellyfish":
                accuracyIdx = 4; break;
            case "monkey":
                accuracyIdx = 5; break;
            case "sheep":
                accuracyIdx = 6; break;
            case "snake":
                accuracyIdx = 7; break;
            default: accuracyIdx = -1;
        }

        // accuracy = predictionArray[0]/255;
        accuracy = predictionArray[accuracyIdx]/255;
        console.log("accuracy: " + accuracy);
    });
    
    res.json({
        success: true,
        acc: accuracy
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});