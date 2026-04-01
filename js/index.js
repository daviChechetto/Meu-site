
// ------------Pesquisa Servicos INICIO------------

const servicosContainer = $("#servicosContainer");
const categorias = $("#servicos .botao-filtro");
const inputPesquisaNome = $("#servicos #pesquisaNome");
const botoesFiltro = $(".botao-filtro");
const botoesFiltroMais = $(".botao-filtro-mais");
const botaoVerMaisFiltros = $("#botaoVerMaisFiltros");
const botaoExpandirFiltros = $("#botaoExpandirFiltros");
const listaMaisFiltros = $(".lista-mais-filtros");
const listaFiltros = $(".lista-filtros")
const botaoLimparCampo = $("#limparCampo");
const botaoVerTodosCards = $("#botaoVerTodosCards");
const todosOsCards = $(".todos-cards");

// ------------Pesquisa Servicos FIM------------



/* Anuncios */

const botaoFecharModal = $('.botao-fechar-modal')
const modais = $('.modal-customizada ')
const delay = $(':root').css('--delay-default');

/* FIM Anuncios END */



/* Anuncios */

function fecharModal(modal){
    modal.addClass('fechar-modal')


    setTimeout(function(){
        modal.removeClass('fechar-modal')
        modal.removeClass('modal-aberto')
    }, 250)
}
function AbrirModal(modal){
    setTimeout(function(){
        modal.addClass('modal-aberto')

    }, 3750)
}

/* FIM Anuncios END */

function ajustarTamanhoExibicaoCards(){
    const alturaTodosCards = $("#servicosContainer").outerHeight(true)
    todosOsCards.css("max-height", alturaTodosCards)
    todosOsCards.addClass("mostrando-todos-cards")
    botaoVerTodosCards.hide()
}
function ajustarElementoGraficoFiltroSelecionado(botaoSelecionado) {
    const larguraBotao = botaoSelecionado.outerWidth();
    const posicaoBotao = botaoSelecionado.offset().left;
    const posicaoLista = $(".lista-filtros").offset().left;
    const distanciaAEsquerda = posicaoBotao - posicaoLista; // posição correta dentro do container

    $(".elemento-grafico-filtro-selecionado").css({left: distanciaAEsquerda, width: larguraBotao});
    $(".filtro-de-cor").css({left: distanciaAEsquerda, width: larguraBotao});
}
function ajustarElementoGraficoFiltroHover(botaoSelecionado) {
    const larguraBotao = botaoSelecionado.outerWidth();
    const posicaoBotao = botaoSelecionado.offset().left;
    const posicaoLista = $(".lista-filtros").offset().left;
    const distanciaAEsquerda = posicaoBotao - posicaoLista; // posição correta dentro do container

    $(".elemento-grafico-filtro-hover").css({left: distanciaAEsquerda, width: larguraBotao});
}
function toggleListaFiltro(){
    if(!listaFiltros.hasClass('show') || listaFiltros.hasClass('hide')){
        listaFiltros.removeClass('hide');
        listaFiltros.addClass('show');
    }
    else{
        listaFiltros.removeClass('show');
        listaFiltros.addClass('hide');
    }
}

const exibirServicos = (servicosFiltrados, elementoContainer) => {
    elementoContainer.empty();
    
    
    servicosFiltrados.forEach(servico => {
        
        const servicoElement = $(
            `<li class="card wow fadeInDown">
            ${servico.novo ? '<span class="faixa-novo" title="Este cartão foi recentemente adicionado">Novo</span>' : ''}
            
            <a ${servico.targetBlank ? 'target="_blank"' : ''} href="${servico.href}" title="Clique aqui para acessar ${servico.nome}">
            ${servico.targetBlank ? '<i class="fas fa-external-link-alt icone-link-externo" title="Esse cartão te levará a outra página"></i>' : ''}
            ${servico.iconeHtml ? servico.iconeHtml : '<img class="imagem-icone" src="' + servico.imagem.src + '" alt="Serviço sobre ' + servico.nome + '"/>'}<h3> ${servico.nome} </h3>
            </a>
            </li>`
        );
        
        elementoContainer.append(servicoElement);
    });
    
    servicosContainer.next(".mensagem-nenhum-card").remove();
    if(servicosFiltrados.length <= 0) servicosContainer.after('<p class="mensagem-nenhum-card">Nenhum serviço encontrado.</p>');
    
}
const carregarServicos =  (categoria, nomePesquisado) => {
    try {
        const servicosFiltrados = filtrarServicosPorCategoriaPorNomePesquisado(categoria, nomePesquisado);
        exibirServicos(servicosFiltrados, servicosContainer);
        
    } catch (error) {
        console.error("Erro ao buscar Serviços");
    }
}


const carregarCartoes = async () => {
    cartoes = await buscarCartoes();
    carregarServicos("DESTAQUES", '');
}
carregarCartoes();

// ------------Pesquisa Servicos Inicio------------

categorias.on("click", (evento) => {
    const categoriaAtual = $(evento.target).text();
    inputPesquisaNome.val('');
    botaoLimparCampo.css("opacity", 0)
    carregarServicos(categoriaAtual, '');

    $('html, body').animate({
        scrollTop: $("#servicos").offset().top
    }, 250);
})
inputPesquisaNome.on("input", (evento) => {
    const nomePesquisado = evento.target.value;

    const categoriaAtual = categorias.filter('.pesquisa-ativa').text();
    const existeMaisCategoriaSelecionada = $(".lista-mais-filtros a.pesquisa-ativa").length > 0;

    if (!existeMaisCategoriaSelecionada) {
        ajustarElementoGraficoFiltroSelecionado($(".pesquisa-ativa"));
    }

    if(nomePesquisado.length > 0 ){
        botaoLimparCampo.css("opacity", 1)
    } else{
        botaoLimparCampo.css("opacity", 0)
    }


    carregarServicos(categoriaAtual, nomePesquisado);

})
inputPesquisaNome.on("focus", () => {
    listaMaisFiltros.removeClass("mostrar-mais-filtros");
})
botaoLimparCampo.on("click", function(){
    inputPesquisaNome.val('')
    inputPesquisaNome.trigger("input");
    $(this).css("opacity", 0)
    inputPesquisaNome.focus()
})

// ------------Pesquisa Servicos FIM------------



botaoExpandirFiltros.click(function() {
    toggleListaFiltro()
});

botaoVerMaisFiltros.on("click", function() {
    listaMaisFiltros.toggleClass("mostrar-mais-filtros");

    $(".ativo").removeClass("ativo");
    $(this).addClass("ativo");

    ajustarElementoGraficoFiltroSelecionado($(this));
});

botoesFiltro.on("click", function() {
    if(!$(this).hasClass("botao-filtro-mais")) {
        $(".ativo").removeClass("ativo");
        $(this).addClass("ativo");
        
        listaMaisFiltros.removeClass("mostrar-mais-filtros");
        
        ajustarElementoGraficoFiltroSelecionado($(this));
    }
    $(".pesquisa-ativa").removeClass("pesquisa-ativa");
    $(this).addClass("pesquisa-ativa");

    listaMaisFiltros.removeClass("mostrar-mais-filtros");

    toggleListaFiltro()
    ajustarTamanhoExibicaoCards()
});

/* Hover do filtro de pesquisa */

botoesFiltro.hover(function() {
    if(!$(this).hasClass("botao-filtro-mais")) {
        ajustarElementoGraficoFiltroHover($(this));
    }
}, function() {
    const botaoSelecionado = $(".ativo");
    ajustarElementoGraficoFiltroHover(botaoSelecionado);
});
botaoVerMaisFiltros.hover(function() {
    if(!$(this).hasClass("botao-filtro-mais")) {
        ajustarElementoGraficoFiltroHover($(this));
    }
}, function() {
    const botaoSelecionado = $(".ativo");
    ajustarElementoGraficoFiltroHover(botaoSelecionado);
});

/* FIM Hover do filtro de pesquisa END */

botoesFiltroMais.on("click", function() {
    listaMaisFiltros.removeClass("mostrar-mais-filtros");
});

$(window).on("resize", function() {
    ajustarElementoGraficoFiltroHover($(".ativo"));
    ajustarElementoGraficoFiltroSelecionado($(".ativo"));
    ajustarTamanhoExibicaoCards()
});

/* Anuncios */

modais.on('click', function(event){
    if($(event.target).closest('.container-modal').length === 0){
        fecharModal($(event.target))
    }  
})
botaoFecharModal.on('click', function() {
    fecharModal($(this).closest(modais))
})
// AbrirModal($("#modalAnuncio"))

/* FIM Anuncios END */

botaoVerTodosCards.on("click", function(){
    ajustarTamanhoExibicaoCards()
})


$(document).ready(function() {

    // Cria uma função para organizar a lógica
    function gerenciarScroll() {
        // Verifica a largura da tela
        if ($(window).outerWidth() >= 1200) {
            // Se for maior ou igual a 1200px, INICIA o niceScroll
            $(".lista-de-noticias").niceScroll({
                cursorcolor: "#ffffff00",
                cursorwidth: "6px",
                cursorborder: "none",
                railpadding: { top: 0, right: 2, left: 0, bottom: 0 },
                enablekeyboard: false
            });
        } else {
            // Se for menor que 1200px, DESTRÓI o niceScroll
            $(".lista-de-noticias").getNiceScroll().remove();
        }
    }

    // Executa a função quando a página carrega
    gerenciarScroll();

    // Executa a função toda vez que a janela for redimensionada
    $(window).on("resize", function() {
        gerenciarScroll();
    });
});

