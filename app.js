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
app.use(express.static(__dirname + '/uploads'));

app.get("/", function (req, res) {
    //console.log("index call")
    res.render("index");
})


let storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "uploads/");
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});

let upload = multer({
    storage: storage
});

app.post('/uploadimage', upload.single("imgfile"), (req, res, next) =>
{
    let file = req.file;
 
    console.log("접속함");
    
    

    // res.json({
    //     success: true,
    //     imageurl: `http://localhost:3000/uploads/'${req.filename}'`
    // });
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

