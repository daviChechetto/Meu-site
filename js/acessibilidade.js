const body = $("body")
const acessibilidade = $("#acessibilidade")
const listaOpcoesDeAcessibilidade = $(".opcoes-acessibilidade")

/* Ativar Contraste */

    $('#altoContraste').on("click", function(){
        body.toggleClass('contraste')
        
        if (body.hasClass("contraste")) {
            localStorage.setItem("contrasteAtivado", "true");
        } else{
            localStorage.setItem("contrasteAtivado", "false");
        }
    })

    if (localStorage.getItem("contrasteAtivado") === "true") {
        body.addClass("contraste");
    }

/* FIM Ativar Contraste END */



/* abrir acessibilidade com focus */

    $('.link-acessibilidade').focus(function() {
        $("#acessibilidade").addClass("acessibilidade-expandida");
    });
    $('.link-acessibilidade').blur(function() {
        $("#acessibilidade").removeClass("acessibilidade-expandida");
    });

/* FIM abrir acessibilidade com focus END */



/* Fonte */

    // Armazena o valor da font-size padrão do projeto
    let tamanhosIniciais = parseFloat($(":root").css("font-size"))

    let nivelFonte = 0; // controle de aumento/diminuição
    const maxNivel = 2; // máximo de aumentos
    const minNivel = 0; // mínimo (não diminuir além do inicial)

    // Atualiza o estilo dos botões conforme o nível
    function atualizarBotoes() {
        $("#aumentaFonte").css("opacity", nivelFonte === maxNivel ? 0.6 : 1);
        $("#diminuiFonte").css("opacity", nivelFonte === minNivel ? 0.6 : 1);
    }

    // Aplica a alteração de fonte
    function aplicarFonte() {
        $(":root").css('font-size', tamanhosIniciais + nivelFonte);

        atualizarBotoes();
    }

    // Aumenta a fonte
    function aumentaFonte() {
        if (nivelFonte < maxNivel) {
            nivelFonte++;
            aplicarFonte();
        }
    }

    // Diminui a fonte
    function diminuiFonte() {
        if (nivelFonte > minNivel) {
            nivelFonte--;
            aplicarFonte();
        }
    }

    // Inicializa estado dos botões
    atualizarBotoes();

    // Eventos de escuta dos botões aumentar/diminuir a fonte
    $("#aumentaFonte").on("click", function(){
        aumentaFonte()
        ajustarTamanhoAcessibilidade()
    })
    $("#diminuiFonte").on("click", function(){
        diminuiFonte()
        ajustarTamanhoAcessibilidade()
    })

/* FIM Fonte END */



/* tamanho da aba de acessibilidade */

    function ajustarTamanhoAcessibilidade() {
        setTimeout(function(){
            $(":root").css("--altura-aba-acessibilidade", listaOpcoesDeAcessibilidade.height() + "px")
            document.documentElement.style.setProperty("--altura-aba-acessibilidade", listaOpcoesDeAcessibilidade.height() + "px");
        }, 150)
    }
    
    acessibilidade.hover(function(){
        ajustarTamanhoAcessibilidade()
    })
    listaOpcoesDeAcessibilidade.on("change", function(){
        ajustarTamanhoAcessibilidade()
    })
    

/* FIM tamanho da aba de acessibilidade END */