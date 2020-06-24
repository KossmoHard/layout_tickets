$(document).ready(function(){

    jQuery.os =  { name: (/(win|mac|linux|sunos|solaris|iphone|ipad)/
                    .exec(navigator.platform.toLowerCase()) || [u])[0]
                    .replace('sunos', 'solaris') };
    if(jQuery.os.name == 'mac' && $('[data-img]').length > 0 ){

        $('[data-img]').each(function(){
            if($(this).prop("tagName").toLowerCase() != 'img'){

                $(this).css('background-image', 'url('+ $(this).data('img') +')');

            } else{

                $(this).attr('src', $(this).data('img'));

            }
        });

    }


    $('.js-tab li').click(function(){
        var item = $(this).data('item');
        $('.js-tab li').removeClass('active');
        $(this).addClass('active');
        $('.js-tab-content').removeClass('active');
        $('.js-tab-content[data-item="'+ item +'"]').addClass('active');
    });


    $('.fqa-h').on('click',function(){
        $(this).closest('.fqa-box').toggleClass('open');
        $(this).next('.fqa-content').slideToggle()
    });


    $('.chosen-m').on('click',function(){
        $(this).parents('.lang-menu').toggleClass('open-menu');
    });


    $(document).on('click', function(e) {
      if (!$(e.target).closest(".lang-menu").length) {
        if($('.lang-menu').hasClass('open-menu')){
            $('.lang-menu').removeClass('open-menu');
        }
      }
      e.stopPropagation();
    });
});
