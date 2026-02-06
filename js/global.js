$('body').append(`<div id="perseguidor"><div class="circulo"></div></div>`)

$(window).on('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;


    $("#perseguidor").css({
        'transform': `translate(${mouseX}px, ${mouseY}px)`
    });
})

$("a, button").hover( function(){
    $("#perseguidor").toggleClass('esconder')
})