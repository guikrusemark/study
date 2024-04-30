const canvas = document.querySelector("canvas");
const brush = canvas.getContext("2d");
const radius = 10;
let randomX;
let randomY;

function clearScreen() {
	brush.clearRect(0, 0, 600, 400);
	brush.fillStyle = "lightgray";
	brush.fillRect(0, 0, 600, 400);
}

function dispatch(event) {
	const x = event.pageX - canvas.offsetLeft;
	const y = event.pageY - canvas.offsetTop;

	if (
		x > randomX - radius &&
		x < randomX + radius &&
		y > randomY - radius &&
		y < randomY + radius
	) {
		alert("Acertou!");
	}
}

function drawCircle(x, y, radius, color) {
	brush.fillStyle = color;
	brush.beginPath();
	brush.arc(x, y, radius, 0, 2 * Math.PI);
	brush.fill();
}

function drawRandomPosition(maxValue) {
	return Math.floor(30 + Math.random() * maxValue);
}

function drawTarget(x, y) {
	drawCircle(x, y, radius + 20, "red");
	drawCircle(x, y, radius + 10, "white");
	drawCircle(x, y, radius, "red");
}

function updateScreen() {
	clearScreen();
	randomX = drawRandomPosition(540);
	randomY = drawRandomPosition(340);
	drawTarget(randomX, randomY);
	randomX = drawRandomPosition(540);
	randomY = drawRandomPosition(340);
	drawTarget(randomX, randomY);
}

function main() {
	setInterval(updateScreen, 1000);
	canvas.addEventListener("click", dispatch);
}

main();
