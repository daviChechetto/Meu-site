let servicos = [];
let conteudos = [];


const botaoProtocolos = $("#botaoProtocolos")
const abaProtocolos = $(".protocolos")
const setaProtocolos = $("#protocolosCard .icone-seta")
const itensInformacoesExtra = $(".informacoes-extras li")
const linkInformacoesExtra = $(".informacoes-extras li a")

const containerCabecalho = $("#containerHeader");
const redesSociais = $("#containerHeader .redes-sociais");

const botaoVoltarAoTopo = $("#botaoVoltarAoTopo")

const botaoLinksSetores = $("#botaoLinksSetores")
const botaoLinksServicos = $("#botaoLinksServicos")


// parâmetros da navegacao
const botaoExpandirNavegacao = $("#botaoExpandirNavegacao");
const navegacao = $(".links-importantes");
const tempoPorEtapa = 50; // ms entre cada item (cascata)
const slideDuracao = 500; // duração do slide
const itemLinkImportante = $('.item-link-importante');
const botaoParaLinksDerivados = $(".botao-links-derivados")
// FIM parâmetros da navegacao


botaoProtocolos.on("click", function () {
  abaProtocolos.toggleClass("protocolos-active")
  setaProtocolos.toggleClass("seta-direita")
})

linkInformacoesExtra.on('focus', () => {
  itensInformacoesExtra.hover()
})



// ------------Pesquisa Geral INICIO------------

const inputPesquisaGeral = $("#generalSearch");
const pesquisaGeralContainer = $("#generalList");
const pesquisaGeralDetalhes = $("#resultSearch");

//------------Pesquisa Geral FIM------------




const normalizarNome = (nome) => {
    return nome
        .toUpperCase()
        .trim()                             // remove espaços no início e no fim
        .normalize("NFD")                   // separa os caracteres especiais
        .replace(/\p{Diacritic}/gu, "")     // remove acentuações
        .replace(/-/g, " ")                 // substitui hífen por espaço
        .replace(/\p{P}/gu, "")             // remove pontuações
        .replace(/\s+/g, " ");              // remove espaços duplicados
};
const buscarServicos = async () => {
    return await fetch(`data/servicos/servicos.json?t=${Date.now()}`)
        .then(async response => await response.json())
        .catch(error => { console.error("Erro ao buscar Serviços") });
}
const buscarConteudos = async () => {
    return await fetch(`data/servicos/conteudos.json?t=${Date.now()}`)
        .then(async response => await response.json())
        .catch(error => { console.error("Erro ao buscar Conteudos") });
}
const filtrarServicosPorCategoriaPorNomePesquisado = (categoria, nomePesquisado) => {
    const servicosFiltradorPorCategoriaPorNomePesquisado = servicos // lista global
        .filter(servico => servico.categorias.includes(normalizarNome(categoria)))
        .filter(servico => normalizarNome(servico.nome).includes(normalizarNome(nomePesquisado)))
        .sort((servicoA, servicoB) => {

            if (servicoA.novo !== servicoB.novo) {
                return servicoB.novo - servicoA.novo;
            }

            return normalizarNome(servicoA.nome).localeCompare(normalizarNome(servicoB.nome));
        })

    return servicosFiltradorPorCategoriaPorNomePesquisado;
}
const filtrarConteudosPorNomePesquisado = (nomePesquisado) => {
    const servicosFiltradorPorNomePesquisado = conteudos //variavel global
        .filter(conteudo => { 
            const nomeOk = normalizarNome(conteudo.nome).includes(normalizarNome(nomePesquisado));
            const chaveOk = conteudo.palavrasChave?.some(k => normalizarNome(k).includes(normalizarNome(nomePesquisado)));

            return nomeOk || chaveOk;
            })
        .sort((conteudoA, conteudoB) => {

            if (conteudoA.novo !== conteudoB.novo) {
                return conteudoB.novo - conteudoA.novo;
            }

            return normalizarNome(conteudoA.nome).localeCompare(normalizarNome(conteudoB.nome));
        })

    return servicosFiltradorPorNomePesquisado;
}





// ------------Pesquisa Geral/Servicos INICIO------------

const exibirResultadoPesquisaGeral = (servicosFiltrados, elementoContainer) => {

    servicosFiltrados.forEach(servico => {

        const servicoElement = $(
            `<a ${servico.targetBlank ? 'target="_blank"' : ''} href="${servico.href}" class="list-group-item list-group-item-action">
				${servico.iconeHtml ? servico.iconeHtml : '<img src="' + servico.imagem.src + '" />'}<span class="nome-link">${servico.nome}</span>
                ${servico.targetBlank ? '<i class="fas fa-external-link-alt icone-link-externo" title="Esse cartão te levará a outra página"></i>' : ''}
                ${servico.novo ? '<span class="faixa-novo">Novo</span>' : ''}
		    </a>`
        );

        elementoContainer.append(servicoElement);
    });

    console.log(servicosFiltrados);
    console.log(elementoContainer.find('a').length);
    
    

    if (servicosFiltrados.length > 1) {
        pesquisaGeralDetalhes.text(`${servicosFiltrados.length} resultados encontrados para "${inputPesquisaGeral.val()}"`);
    } else if (servicosFiltrados.length == 1) {
        pesquisaGeralDetalhes.text(`${servicosFiltrados.length} resultado encontrado "${inputPesquisaGeral.val()}"`);
    } else {
        pesquisaGeralDetalhes.text(`Nenhum resultado encontrado para "${inputPesquisaGeral.val()}"`);
    }

    if (!inputPesquisaGeral.val()) {
        pesquisaGeralDetalhes.hide();
        pesquisaGeralContainer.hide();
        return;
    }

    pesquisaGeralDetalhes.show();
    pesquisaGeralContainer.show();
}
const carregarResultadoPesquisaGeral = (categoria, nomePesquisado) => {
    try {
        const servicosFiltrados = filtrarServicosPorCategoriaPorNomePesquisado(categoria, nomePesquisado);
        exibirResultadoPesquisaGeral(servicosFiltrados, pesquisaGeralContainer);
    } catch (error) {
        console.error("Erro ao buscar Serviços");
    }
}
const carregarResultadoPesquisaGeralConteudos = (nomePesquisado) => {
    try {
        const servicosFiltrados = filtrarConteudosPorNomePesquisado(nomePesquisado);
        exibirResultadoPesquisaGeral(servicosFiltrados, pesquisaGeralContainer);
    } catch (error) {
        console.error("Erro ao buscar Serviços");
    }
}

//------------Pesquisa Geral FIM------------



// ------------Pesquisa Geral INICIO------------
inputPesquisaGeral.on("input", (evento) => {
    const nomePesquisado = evento.target.value;
    
    pesquisaGeralContainer.empty();
    carregarResultadoPesquisaGeral("TODOS", nomePesquisado);
    carregarResultadoPesquisaGeralConteudos(nomePesquisado);

});

inputPesquisaGeral.on("focus", (evento) => {
    if (!evento.target.value) return;

    pesquisaGeralDetalhes.show();
    pesquisaGeralContainer.show();
})

inputPesquisaGeral.on("blur", () => {
    setTimeout(() =>{
        pesquisaGeralDetalhes.hide();
        pesquisaGeralContainer.hide();
    }, 200)
})
// ------------Pesquisa Geral FIM-----------



// ------------Pesquisa Servicos INICIO------------

const primeiroCarregamento = async () => {
    [servicos, conteudos] = await Promise.all([buscarServicos(), buscarConteudos()]);
}


primeiroCarregamento();

// ------------Pesquisa Servicos INICIO------------

/* Função para manter a cor de focus no botao dropdown */
$(".dropdown-item").on("focus", function () {
  $(this).closest('.dropdown-menu').siblings("a").focus()
});


$(".botao-modal-duvidas-protocolos").click(function () {
  $("#modalProtocolos").modal("show");
})

const adicionarPropriedadePersonalizadaStickyAbsolute = (elementoFilho, elementoPai) => {

  //Essa função faz o elemento acompanhar a tela somente dentro da area do elemento pai
  const scrollTop = $(window).scrollTop();
  const elementoPaiTop = elementoPai.offset().top;
  const containerBottom = elementoPaiTop + elementoPai.outerHeight();
  const elementoFilhoHeight = elementoFilho.outerHeight();
  const offset = 40;
  const fixedTop = scrollTop + offset; // posição top se ficar fixed



  // Quando o elemento está entre os limites do container
  if (fixedTop >= elementoPaiTop && fixedTop + elementoFilhoHeight + 20 <= containerBottom) {
    elementoFilho.css({
      position: "fixed",
      top: "20px",
      right: "20px",
      bottom: "auto"
    });
  }
  // Se passar do fundo do container
  else if (fixedTop + elementoFilhoHeight + offset > containerBottom) {
    elementoFilho.css({
      position: "absolute",
      top: "auto",
      right: "20px",
      bottom: "40px"
    });
  }
  // Se subir antes do topo do container
  else {
    elementoFilho.css({
      position: "absolute",
      top: "0px",
      right: "20px",
      bottom: "auto"
    });
  }
};

const movimentarRedesSociais = () => {
  adicionarPropriedadePersonalizadaStickyAbsolute(redesSociais, containerCabecalho);
}

const observer = new ResizeObserver(entries => {
  entries.forEach(entry => {
    $("body").getNiceScroll().resize();
  });
});


$(document).ready(() => {
  $(window).on("scroll", function () {
    if (window.scrollY > window.innerHeight * 0.8) {
      botaoVoltarAoTopo.addClass("mostrar-botao-voltar-ao-topo")
    } else {
      botaoVoltarAoTopo.removeClass("mostrar-botao-voltar-ao-topo")
    }
    if (window.scrollY > window.innerHeight * 1) {
      $("#navegacao").addClass("mostrar-navegacao")
    } else {
      $("#navegacao").removeClass("mostrar-navegacao")
    }
  });
  
  $("body").niceScroll({
    cursorcolor: "#0E0E0E", 
    cursorwidth: "8px",
    cursorborder: "1px solid #ffffff",
    railpadding: {
      top: 0,
      right: 2,
      left: 0,
      bottom: 0
    },
    smoothscroll: true, 
    scrollspeed: 60,
    mousescrollstep: 30, 
  });

  // Observa o `body` ou `html`
  observer.observe(document.body);
})



/* scroll ao topo */

botaoVoltarAoTopo.on("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
})

/* FIM scroll ao topo END */



/* navegacao */


// abre um menu (fecha os outros)
function abrirListaNavegacao(botaoClicado){
  const lista = botaoClicado.next('.lista-de-links');
  if (!lista.length) return;

  // fecha outros abertos
  
  $('.link-aberto').not(botaoClicado).each(function(){
    fecharListaNavegacao($(this));
  });

  if (botaoClicado.hasClass('link-aberto')) return; // já aberto

  botaoClicado.addClass('link-aberto');
  lista.addClass('lista-aberta').stop(true, true).slideDown(slideDuracao);

  // revelar itens em cascata após o slide abrir
  lista.find('.item-link').each(function(i, item){
    if (item._fadeTimeout) clearTimeout(item._fadeTimeout);
    item._fadeTimeout = setTimeout(() => $(item).addClass('mostrar-item-lista'), tempoPorEtapa * i);
  });
}
// fecha um menu (com cascata reversa)
function fecharListaNavegacao(botao){
  const lista = botao.next('.lista-de-links');
  if (!lista.length) return;

  // limpar timeouts existentes e retirar classes em ordem reversa
  const items = lista.find('.item-link').toArray().reverse();
  items.forEach(function(item, i){
    if (item._fadeTimeout) { clearTimeout(item._fadeTimeout); item._fadeTimeout = null; }
    setTimeout(() => $(item).removeClass('mostrar-item-lista'), tempoPorEtapa * i);
  });

  // após a cascata de saída, fecha o painel

  lista.stop(true, true).slideUp(items.length * tempoPorEtapa + 200);
  botao.removeClass('link-aberto');
  lista.removeClass('lista-aberta');
  setTimeout(() => fecharListaNavegacao($('.lista-de-links-derivado')), items.length * tempoPorEtapa + 200);

}

itemLinkImportante.on('click', function(){
  const botaoNavegacao = $(this);

  // desabilita o botão
  botaoNavegacao.prop("disabled", true);

  // reativa depois de 2 segundos (2000 ms)
  setTimeout(() => {
    botaoNavegacao.prop("disabled", false);
  }, slideDuracao);

  if (botaoNavegacao.hasClass('link-aberto')) fecharListaNavegacao(botaoNavegacao);
  else abrirListaNavegacao(botaoNavegacao);
});
botaoParaLinksDerivados.on("click", function(){
  const listaSelecionada = $("#" + $(this).data("target"))
  
  if(listaSelecionada.hasClass("mostrar-links-derivados")){
    listaSelecionada.removeClass("mostrar-links-derivados")
    $(this).removeClass("botao-ativo")
  } else{
    $(".mostrar-links-derivados").removeClass("mostrar-links-derivados")
    listaSelecionada.addClass("mostrar-links-derivados");
    $(this).removeClass("botao-ativo")
  }
})

/* FIM navegacao END */


$(".link-acesso-servicos").on("click", function(){
  $("body").getNiceScroll(0).doScrollTop($("#servicos").offset().top, 800);
})

botaoExpandirNavegacao.on('click', function(){
  navegacao.toggleClass('links-importantes-ativo');
});

new WOW().init();