const ulTag = document.querySelector("ul");
const itemsStorage = JSON.parse(localStorage.getItem("items")) || [];

loadListElements();

const formTag = document.getElementById("novo-item");
formTag.addEventListener("submit", addItemHandler);

//#####################################################################

function loadListElements() {
	ulTag.innerHTML = "";
	itemsStorage.forEach((item) => {
		const liElement = document.createElement("li");
		liElement.classList.add("item");

		const strongElement = document.createElement("strong");
		strongElement.append(item.inputAmount);

		liElement.appendChild(strongElement);
		liElement.append(item.inputName);
		ulTag.appendChild(liElement);
	});
}

function addItemHandler(event) {
	event.preventDefault();

	const inputTagName = document.getElementById("nome");
	const inputTagAmount = document.getElementById("quantidade");

	if (isInputsFilled(inputTagName, inputTagAmount)) {
		const createdItem = {
			inputName: inputTagName.value,
			inputAmount: inputTagAmount.value,
		};

		if (isOnList(createdItem)) {
			sumToExistingItem(createdItem);
			loadListElements();
		} else {
			addItemToUl(createdItem);
			itemsStorage.push(createdItem);
		}

		localStorage.setItem("items", JSON.stringify(itemsStorage));
		clearInputs(inputTagName, inputTagAmount);
	}
}

function isOnList(createdItem) {
	return itemsStorage.find((item) => createdItem.inputName === item.inputName);
}

function sumToExistingItem(createdItem) {
	itemsStorage.forEach((item) => {
		if (createdItem.inputName === item.inputName) {
			createdItem.inputAmount =
				Number.parseInt(item.inputAmount) +
				Number.parseInt(createdItem.inputAmount);
			item.inputAmount = createdItem.inputAmount;
		}
	});
}

function addItemToUl(createdItem) {
	const liElement = document.createElement("li");
	liElement.classList.add("item");

	const strongElement = document.createElement("strong");
	strongElement.append(createdItem.inputAmount);

	liElement.appendChild(strongElement);
	liElement.append(createdItem.inputName);
	ulTag.appendChild(liElement);
}

function isInputsFilled(inputTagName, inputTagAmount) {
	return inputTagName.value !== "" && inputTagAmount.value !== "";
}

function clearInputs(inputTagName, inputTagAmount) {
	inputTagName.value = "";
	inputTagAmount.value = "";
}
