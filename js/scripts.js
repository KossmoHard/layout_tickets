
var _app = function () {

    this.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    this.setCookie = function (name, value, options) {
        options = options || {};
        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    };

    this.ID = function(){  return '_' + Math.random().toString(36).substr(2, 9); };

    this.openModal = function (title, body) {
        $("body").append("<div class='modal-overlay js-modal-close'></div>");
        $("body").append('<div class="modal-box"><header><a href="#" class="js-modal-close close">×</a><h5>' + title + '</h5></header><div class="modal-body"><p>' + body + '</p></div><footer><a href="#" class="js-modal-close btn btn-secondary">Закрыть</a></footer></div>');
        $(".modal-overlay").fadeTo(500, 0.7);
        $('.modal-box').fadeIn($(this).data());

        $(".js-modal-close, .modal-overlay").click(function () {
            $(".modal-box, .modal-overlay").fadeOut(500, function () {
                $(".modal-overlay").remove();
                $(".modal-box").remove();
            });
        });

        $(window).resize(function () {
            $(".modal-box").css({
                top : ($(window).height() - $(".modal-box").outerHeight()) / 2,
                left : ($(window).width() - $(".modal-box").outerWidth()) / 2
            });
        });

        $(window).resize();

    };

    this.setClientValue = function(name,value, expires){

        this.setCookie(name,value,{expires:expires});

    }

    this.getClientValue = function(name){

      return this.getCookie(name);

    }


    this.init = function () {};

	this.vars = {};

}

var APP = new _app();
APP.init();
