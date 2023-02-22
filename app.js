'use strict';

var buttonClear = {},
    buttonSave = {},
    inputColor = {},
    inputSize = {},
    canvasArea = {},
    canvasWidth = 900,
    canvasHeight = 500,
    canvasContext = {},
    isDrawing = false,
    lineWidth = 3;

function initElem() {
    buttonClear = document.getElementById('clear');
    buttonSave = document.getElementById('save');
    inputColor = document.getElementById('color');
    inputSize = document.getElementById('size');
    canvasArea = document.getElementById('canvas-area');
    canvasArea.width = canvasWidth;
    canvasArea.height = canvasHeight;
    canvasContext = canvasArea.getContext('2d');
}

function onMouseUp() {
    isDrawing = false;
    canvasContext.beginPath();
}

function onCanvasMouseDown() {
    isDrawing = true;
}

function onCanvasMouseMove(event) {
    if (isDrawing) {
        canvasContext.lineTo(event.offsetX, event.offsetY);
        canvasContext.lineWidth = lineWidth * 2;
        canvasContext.lineCap = 'round';
        canvasContext.lineJoin = 'round';
        canvasContext.stroke();
        canvasContext.beginPath();
        canvasContext.arc(event.offsetX, event.offsetY, lineWidth, 0, 2 * Math.PI, true);
        canvasContext.fill();
        canvasContext.beginPath();
        canvasContext.moveTo(event.offsetX, event.offsetY);
    }
}

function onClearClick() {
    canvasContext.clearRect(0, 0, canvasArea.width, canvasArea.height);
}

function onSaveClick() {
    canvasArea.toBlob(function (blob) {
        var link = document.createElement('a');
        link.download = 'draw.png';
        link.href = URL.createObjectURL(blob);
        link.dispatchEvent(new MouseEvent('click'));
    }, 'image/png', 1);
}

function onColorChange() {
    canvasContext.fillStyle = this.value;
    canvasContext.strokeStyle = this.value;
}

function onSizeChange() {
    lineWidth = this.value;
}

function initEvent() {
    window.addEventListener('mouseup', onMouseUp);
    canvasArea.addEventListener('mousedown', onCanvasMouseDown);
    canvasArea.addEventListener('mousemove', onCanvasMouseMove)
    buttonClear.addEventListener('click', onClearClick);
    buttonSave.addEventListener('click', onSaveClick);
    inputColor.addEventListener('change', onColorChange);
    inputSize.addEventListener('change', onSizeChange);
}

function init() {
    initElem();
    initEvent();
}

window.addEventListener('DOMContentLoaded', init);
