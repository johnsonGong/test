$(function() {

console.log("canvas...");

    var wrapper = $("#canvas_wrapper");
    var canvasObj = $("<canvas></canvas>");
    
    wrapper.append(canvasObj);
    
    var canvasCtx = canvasObj[0].getContext("2d");
    canvasCtx.rect(20, 20, 150, 100);
    canvasCtx.fillStyle = "yellow";
    canvasCtx.fill();

console.log("canvasCtx.fill...");

});