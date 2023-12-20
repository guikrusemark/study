let canvas = document.querySelector("canvas") as HTMLCanvasElement;
let brush = canvas.getContext("2d") as CanvasRenderingContext2D;

brush.fillStyle = "lightgrey";
brush.fillRect(0, 0, 600, 400);
let radius : number = 10;

function desenharPonto(event) {
  if (event.shiftKey) {
    radius = radius + 0.1;
  }
  brush.fillStyle = "red";
  brush.beginPath();
  brush.arc(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop,
    radius,
    0,
    2 * Math.PI
  );
  brush.fill();
}

document.onmousedown = function (event) {
  return canvas.addEventListener("mousemove", desenharPonto);
};
document.onmouseup = () =>
  canvas.removeEventListener("mousemove", desenharPonto);
