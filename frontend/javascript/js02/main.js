
const instrumentKeyList = document.querySelectorAll('.tecla');

function playSound(audioElementId) {
    document.querySelector(audioElementId).play();
}

// SYNCHRONOUS EVENTS

for (let i = 0; i < instrumentKeyList.length; i++) {
    const instrumentKey = instrumentKeyList[i];
    const instrumentClassName = instrumentKey.classList[1];
    const audioIdName = `#som_${instrumentClassName}`;

    instrumentKey.addEventListener('click', () => {
        playSound(audioIdName);
    });

    instrumentKey.addEventListener("keydown", (event) => {
        if (event.key == "Enter") 
            instrumentKey.classList.add("ativa");
    });
    instrumentKey.addEventListener("keyup", (event) => {
        if (event.key == 'Enter') 
            instrumentKey.classList.remove("ativa");
    });
}
