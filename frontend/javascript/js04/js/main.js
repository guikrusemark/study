const parts = {
	bracos: {
		forca: 29,
		poder: 35,
		energia: -21,
		velocidade: -5,
	},

	blindagem: {
		forca: 41,
		poder: 20,
		energia: 0,
		velocidade: -20,
	},
	nucleos: {
		forca: 0,
		poder: 7,
		energia: 48,
		velocidade: -24,
	},
	pernas: {
		forca: 27,
		poder: 21,
		energia: -32,
		velocidade: 42,
	},
	foguetes: {
		forca: 0,
		poder: 28,
		energia: 0,
		velocidade: -2,
	},
};

function updateRobotPartsData(controlDataControleValue, controlParentElement) {
	const dataElement = controlParentElement.querySelector("[data-contador]");

	if (
		controlDataControleValue === "-" &&
		Number.parseInt(dataElement.value) > 0
	) {
		dataElement.value = Number.parseInt(dataElement.value) - 1;
	} else if (controlDataControleValue === "+") {
		dataElement.value = Number.parseInt(dataElement.value) + 1;
	}
}

const statisticElements = document.querySelectorAll("[data-estatistica]");
function updateRobotStatistics(controlDataControleValue, controlParentElement) {
	const dataElement = controlParentElement.querySelector("[data-contador]");
	const dataPecaValue = controlParentElement.dataset.peca;

	statisticElements.forEach((statisticElement) => {
		if (
			controlDataControleValue === "-" &&
			Number.parseInt(dataElement.value) > 0
		) {
			statisticElement.innerText =
				Number.parseInt(statisticElement.innerText) -
				Number.parseInt(
					parts[dataPecaValue][statisticElement.dataset.estatistica],
				);
		} else if (controlDataControleValue === "+") {
			statisticElement.innerText =
				Number.parseInt(statisticElement.innerText) +
				Number.parseInt(
					parts[dataPecaValue][statisticElement.dataset.estatistica],
				);
		}
	});
}

const controls = document.querySelectorAll("[data-controle]");
controls.forEach((control) => {
	control.addEventListener("click", (event) => {
		updateRobotPartsData(
			event.target.dataset.controle,
			event.target.parentNode,
		);
		updateRobotStatistics(
			event.target.dataset.controle,
			event.target.parentNode,
		);
	});
});
