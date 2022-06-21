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

const TeachableMachine = require("@sashido/teachablemachine-node");
// const { tensor } = require('@tensorflow/tfjs-node');
// const tf = require('@tensorflow/tfjs-node');
const express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path"),
    fs = require('fs'),
    multer = require('multer'),
    static = require('serve-static'),
    router = express.Router(),
    app = express();

const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/r6BBk-hiN/"
});

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

app.post('/uploadimage', upload.single("imgfile"), async (req, res, next) => {
    let filePath = __dirname + "/uploads/animal6.png";// + req.file;
    let customer = req.body.customer;

    return model.classify({
        imageUrl: filePath,
    }).then((predictions) => {
        console.log(predictions);

        //switch

        accuracyIdx = 1;
        accuracy = predictions[accuracyIdx].probability;
        console.log("accuracy: " + accuracy);

        return res.json({
            success: true,
            acc: accuracy
        });

        //return res.json(predictions);

    }).catch((e) => {
        console.error(e);
        res.status(500).send("Something went wrong!")
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


/*
switch (customer) {
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
*/