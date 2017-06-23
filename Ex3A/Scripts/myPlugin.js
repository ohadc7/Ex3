(function ($) {
    $.fn.myPlugin = function (arg) {
        var element = $(this)[0];
        $(element).data("arg", arg);
        var theArg = $(element).data("arg")
        //alert(theArg);

        alertFunc = function () {
            //alert(arg)
        }


        document.addEventListener('keydown', alertFunc, false);

        /*
        document.onkeydown = function (event) {
            var theArg = $(element).data("arg");
            alert(theArg);
        };
        document.onkeydown = function (event) {
            var theArg = $(element).data("arg");
            alert("ido");
        };
        */


        return this;
    };
})(jQuery);