$(document).ready(() => {
    const cookiesTerms = $("#cookiesTerms");
    const cookiesTermsContent = $("#cookiesTermsContent")
    const btnAceitarCookie = $("#cookiesBtnAccept");
    const btnRejeitarCookie = $("#cookiesBtnReject");
    

    
    if (!Cookies.get('acceptCookies')) {
        cookiesTerms.css('display', 'flex');

        btnRejeitarCookie.on("click", () => {
            cookiesTermsContent.addClass("recusar-termos")
            
            setTimeout(function(){
                cookiesTermsContent.removeClass("recusar-termos")
                cookiesTerms.hide();
            }, 750)
        });

        btnAceitarCookie.on("click", () => {
            Cookies.set('acceptCookies', 'true', { expires: 365, path: '/' });

            cookiesTermsContent.addClass("aceitar-termos")
            setTimeout(function(){
                cookiesTermsContent.removeClass("aceitar-termos")
                cookiesTerms.hide();
            }, 500)

        });
    }

    cookiesTermsContent.addClass("aparecer-termos")

    setTimeout(function(){
        cookiesTermsContent.removeClass("aparecer-termos")
    }, 500)

    cookiesTerms.on('click', function(event){
        if($(event.target).closest(cookiesTermsContent).length === 0){
            cookiesTermsContent.addClass("attention-shake")
        }  
        
        setTimeout(function(){
            cookiesTermsContent.removeClass("attention-shake")
        }, 750)
    })
});