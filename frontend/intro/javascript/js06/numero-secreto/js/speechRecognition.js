const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "pt-BR";
recognition.start();

console.log(recognition);

recognition.addEventListener("result", onSpeak);

function onSpeak(event) {
	const speech = String(event.results[0][0].transcript);
	document.querySelector(".box").textContent = speech;
	console.log(event);
}
