const smallestNumber = 1;
const biggestNumber = 100;
const secretNumber = generateSecretNumber();

setMinAndMaxNumber();

function generateSecretNumber() {
	return (
		Math.floor(Math.random() * (biggestNumber - smallestNumber + 1)) +
		smallestNumber
	);
}

function setMinAndMaxNumber() {
	const minNumberElement = document.querySelector("#menor-valor");
	const maxNumberElement = document.querySelector("#maior-valor");
	minNumberElement.textContent = String(smallestNumber);
	maxNumberElement.textContent = String(biggestNumber);
}
