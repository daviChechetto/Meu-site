const listaLinksTitulo = $('.titulo-links');

listaLinksTitulo.on('click', function() {
    $(this).find('.marcador-customizado').toggleClass('rotacionar-marcador');
    $(this).siblings('ul').toggleClass('esconder-links');
})