
/*
 *  Notice: Need to import jQuery in Advance
 *
 */
(function (jquery) {
    jquery.fn.bgcolor = function (color) {
        this.css('backgroundColor', color);
        return this;
    };
})(jQuery);

(function ($) {
    $.add = function (a, b) {
        return a + b;
    };
})(jQuery);
