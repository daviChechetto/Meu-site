const pesquisaNoticia = $("#pesquisaNoticia");
const botaoLimparCampo = $("#limparCampo");

function mostrarBotaoLimparCampo(nomePesquisado){
    console.log(nomePesquisado);
    
    if(nomePesquisado.length > 0 ){
        botaoLimparCampo.css("opacity", 1)
    } else{
        botaoLimparCampo.css("opacity", 0)
    }
}

mostrarBotaoLimparCampo(pesquisaNoticia.val())

pesquisaNoticia.on("input", (evento) => {
    const nomePesquisado = evento.target.value;
    
    mostrarBotaoLimparCampo(nomePesquisado)
})

botaoLimparCampo.on("click", function(){
    pesquisaNoticia.val('')
    pesquisaNoticia.trigger("input");
    $(this).css("opacity", 0)
    pesquisaNoticia.focus()
})