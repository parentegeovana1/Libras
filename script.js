// retira a classe vp-enabled e adiciona a classe vp-disabled para remover pedido de feedback
document
	.querySelector("div[vp-rate-box]")
	.classList.replace("vp-enabled", "vp-disabled");

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

if (!recognition) {
	alert("Desculpe, sua plataforma não suporta o reconhecimento de fala.");
}

recognition.lang = "pt-BR";
recognition.continuous = true;
recognition.interimResults = true;

const recordButton = document.querySelector(".record");
const stopButton = document.querySelector(".row button:nth-child(2)");
const resultParagraph = document.querySelector(".result");
const clearButton = document.querySelector(".clear");

let isRecording = false;

recordButton.addEventListener("click", () => {
	if (!isRecording) {
		recognition.start();
		isRecording = true;
		recordButton.disabled = true;
		stopButton.disabled = false;
		resultParagraph.textContent = "Gravando...";
	}
});

stopButton.addEventListener("click", () => {
	if (isRecording) {
		recognition.stop();
		isRecording = false;
		recordButton.disabled = false;
		stopButton.disabled = true;
	}
});

recognition.onresult = (event) => {
	let transcript = "";
	for (let i = event.resultIndex; i < event.results.length; i++) {
		transcript += event.results[i][0].transcript;
	}
	resultParagraph.textContent = transcript;
};

recognition.onerror = (event) => {
	resultParagraph.textContent = `Erro ao tentar reconhecer a fala: ${event.error}`;
};

clearButton.addEventListener("click", () => {
	resultParagraph.textContent = "";
	recognition.stop();
	isRecording = false;
	recordButton.disabled = false;
	stopButton.disabled = true;
});
