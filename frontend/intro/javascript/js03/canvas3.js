var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
var raio = 10;

pincel.fillStyle = "lightgray";
pincel.fillRect(0, 0, 600, 400);

function desenhaCirculo(x, y, raio, cor) {
	pincel.fillStyle = cor;
	pincel.beginPath();
	pincel.arc(x, y, raio, 0, 2 * Math.PI);
	pincel.fill();
}

function dispara(evento) {
	var x = evento.pageX - tela.offsetLeft;
	var y = evento.pageY - tela.offsetTop;

	if (x > 290 && x < 310 && y > 190 && y < 210) {
		alert("Acertou!");
	}
}

desenhaCirculo(300, 200, raio + 20, "red"); // maior círculo
desenhaCirculo(300, 200, raio + 10, "white");
desenhaCirculo(300, 200, raio, "red"); // menor circulo

tela.addEventListener("click", dispara);
