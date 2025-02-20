document.addEventListener("DOMContentLoaded", () => {
	const vlibrasWidgetInstance = new window.VLibras.Widget(
		"https://vlibras.gov.br/app",
	);
	setTimeout(() => {
		const activeClass = document.querySelector(".access-button");
		activeClass.click();
	}, 50); // abre o widget 50ms apos carregamento

	// Retira a classe vp-enabled e adiciona vp-disabled para remover pedido de feedback
	const rateBox = document.querySelector("div[vp-rate-box]");
	if (rateBox) {
		rateBox.classList.replace("vp-enabled", "vp-disabled");
	}

	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();

	if (!recognition) {
		alert("Desculpe, sua plataforma não suporta o reconhecimento de fala.");
		return;
	}

	recognition.lang = "pt-BR";
	recognition.continuous = true;
	recognition.interimResults = true;

	const recordButton = document.querySelector(".record");
	const stopButton = document.querySelector(".stop");
	const resultParagraph = document.querySelector(".result");
	const clearButton = document.querySelector(".clear");

	let isRecording = false;

	// Inicia gravação
	recordButton.addEventListener("click", () => {
		if (!isRecording) {
			recognition.start();
			isRecording = true;
			recordButton.disabled = true;
			stopButton.disabled = false;
			resultParagraph.textContent = "Gravando...";
		}
	});

	// Para gravação
	stopButton.addEventListener("click", () => {
		if (isRecording) {
			recognition.stop();
			isRecording = false;
			recordButton.disabled = false;
			stopButton.disabled = true;
		}
	});

	// Exibe resultado da fala
	recognition.onresult = (event) => {
		let transcript = "";
		for (let i = event.resultIndex; i < event.results.length; i++) {
			transcript += event.results[i][0].transcript;
		}
		resultParagraph.textContent = transcript;
	};

	// Exibe erro
	recognition.onerror = (event) => {
		resultParagraph.textContent = `Erro ao tentar reconhecer a fala: ${event.error}`;
	};

	// Limpa resultado
	clearButton.addEventListener("click", () => {
		resultParagraph.textContent = "";
		recognition.stop();
		isRecording = false;
		recordButton.disabled = false;
		stopButton.disabled = true;
	});
});
