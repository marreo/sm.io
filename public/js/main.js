import 'bootstrap';
import 'fabric';

$(document).ready(function () {
    var jsonData = {};
    var canvas = new fabric.Canvas('canvas1', {
        isDrawingMode: true
    });
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = 'rgba(10,145,202,0.75)';
    canvas.freeDrawingBrush.width = 75;
    canvas.freeDrawingBrush.strokeLineCap = 'square';
    canvas.freeDrawingBrush.strokeLineJoin = 'miter';
    setBackground();
    window.canvas = canvas;

    // $('#saveBtn').click(function () {
    //     jsonData = canvas.toJSON().objects;
    // });
    // $('#loadBtn').click(function () {
    //     var canvasData = {
    //         version: "2.3.0",
    //         objects: jsonData
    //     };
    //     canvas.loadFromJSON(canvasData);
    //     setBackground();
    // });

    function setBackground() {
        canvas.setBackgroundImage("/img/tele2_oo.png", canvas.renderAll.bind(canvas), {
            // Needed to position backgroundImage at 0/0
            originX: 'left',
            originY: 'top'
        });
    }
});