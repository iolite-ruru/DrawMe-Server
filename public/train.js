// const tf = require('@tensorflow/tfjs');

tf.loadLayersModel('./model.json').then(function (model) {

    console.log("model.js 실행");
    let di = document.getElementById('img');
    img = tf.browser.fromPixels(di).div(255);
    
    // var img = new Image();
    // img.src = './cat16.png';
    
    img = tf.image.resizeBilinear(img, [224, 224])
    img = tf.expandDims(img, 0)
    // img = tf.process_input(img) / 255; //
    const prediction = model.predict(img);
    const predictionArray = prediction.dataSync()
    console.log(predictionArray);
});