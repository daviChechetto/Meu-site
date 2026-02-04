$(document).ready(function () {

	// Inicializa variáveis de controle e configurações iniciais
	let enunciando, palavraAtual = 0,
		estaTocando = false,
		estaPausado = false;
	const tituloOriginal = document.title;

	// Cancela qualquer fala ativa
	window.speechSynthesis.cancel();

	// Função para atualizar o texto do botão de play/pause
	function atualizarBotao(icone) {
		$("#playButton").html(`<i class="fas fa-${icone}-circle"></i>`);
	}

	// Função para reiniciar o áudio e a barra de progresso
	function restartAudio() {
		palavraAtual = 0;
		estaTocando = false;
		estaPausado = false;
		window.speechSynthesis.cancel();
		$("#progressBar").css("width", "0%"); // Reseta a barra
		atualizarBotao("play");
		$("#restartButton").removeClass("active");
	}

	// Função para pausar a leitura
	function pausar() {
		window.speechSynthesis.pause();
		atualizarBotao("play");
	}

	// Função para continuar a leitura
	function continuar() {
		window.speechSynthesis.resume();
		atualizarBotao("pause");
	}

	// Função para iniciar ou controlar a leitura do texto
	function playAudio() {

		const texto = $("#texto").text(); // Pega apenas o texto da div
		const totalPalavras = texto.split(" ").length; // Conta palavras no texto, meio bugado

		// Configura enunciado apenas se for a primeira vez
		if (!enunciando) {
			enunciando = new SpeechSynthesisUtterance(texto);
			enunciando.lang = 'pt-BR';

			// Evento para atualizar barra de progresso a cada palavra
			enunciando.onboundary = (event) => {
				if (event.name === 'word') {
					palavraAtual++;
					let progresso = (palavraAtual / totalPalavras) * 100;
					$("#progressBar").css("width", `${progresso}%`);
				}
			};

			// Evento para reiniciar ao final da leitura
			enunciando.onend = restartAudio;
		}

		// Controle de play, pause e continuar
		if (estaTocando && !estaPausado) {
			pausar();
			estaTocando = false;
			estaPausado = true;
		} else if (estaPausado) {
			continuar();
			estaPausado = false;
			estaTocando = true;
		} else {
			estaTocando = true;
			estaPausado = false;
			$("#restartButton").addClass("active");
			window.speechSynthesis.speak(enunciando);
			atualizarBotao("pause");
		}
	}

	// Cancela o áudio ao sair da página
	$(window).on("beforeunload", () => {
		if (estaTocando) window.speechSynthesis.cancel();
	});

	// Pausa o áudio se a aba do navegador ficar oculta
	document.addEventListener("visibilitychange", () => {
		if (document.hidden && estaTocando) {
			pausar();
			estaTocando = false;
			estaPausado = true;
		}
	});

	// Eventos dos botões
	$("#playButton").click(playAudio);
	$("#restartButton").click(restartAudio);
});

	let ativarLinha = true;
$(window).on("keydown", function (evento) {
	if (evento.key.toLowerCase() == 'l') {
		iniciarElementoAuxilioLeitura()
	}
})

function iniciarElementoAuxilioLeitura() {

	if(ativarLinha){
		$('body').append(`<div id="elementoAuxilioLeitura"><div class="triangulo"></div></div>`)
	
		$(window).on('mousemove', (e) => {
			const mouseX = e.clientX;
			const mouseY = e.clientY;
	
			$("#elementoAuxilioLeitura").css({
				'transform': `translate(${mouseX - 350}px, ${mouseY}px)`
			});
		})

		$('body').css('cursor', 'none')

		ativarLinha = false;
	} else {
		$('#elementoAuxilioLeitura').remove();

		$('body').css('cursor', 'unset')
		ativarLinha = true;
	}
}