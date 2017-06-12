$(document).ready(function () {
    $("#navBar").load("NavBar.html");
})

$(".nav a").on("click", function () {
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});