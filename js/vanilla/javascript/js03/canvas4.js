var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
pincel.fillStyle = "lightgray";
pincel.fillRect(0, 0, 600, 400);

function desenhaCirculo(x, y, raio) {
    pincel.fillStyle = document.querySelector("input").value;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function limpaTela() {
    pincel.clearRect(0, 0, 600, 400);
    pincel.fillStyle = "lightgray";
    pincel.fillRect(0, 0, 600, 400);
}

var x = 3;
var y = 50;
var way = 1;
var raio = 10;
var derivadaRaio = 1;

function atualizaTela() {
    let limitRight = tela.width - 10 - raio;
    let limitLeft = tela.offsetLeft - 10 + raio;
    limpaTela();
    desenhaCirculo(x + tela.offsetLeft, y, raio);
    if (x > limitRight) {
        way = -1;
    } else if (x < limitLeft) {
        way = 1;
    }
    x = x + way;

    if (raio > 40) {
        derivadaRaio = -1;
    } else if (raio < 10) {
        derivadaRaio = 1;
    }
    raio = raio + derivadaRaio;
}

setInterval(atualizaTela, 20);
