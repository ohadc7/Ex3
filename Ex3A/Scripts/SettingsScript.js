window.onload = function () {
    if (!localStorage.length) {
        localStorage.setItem("defaultRows", "15");
        localStorage.setItem("defaultCols", "15");
        localStorage.setItem("defaultAlgorithm", "BFS");
    }
    document.getElementById("mazeRows").value = localStorage.getItem("defaultRows");
    document.getElementById("mazeCols").value = localStorage.getItem("defaultCols");
    var algo  = localStorage.getItem("defaultAlgorithm");
    $("#mazeAlgorithm").html(algo + ' ' + ' <span class="caret"></span>');
    document.getElementById("mazeAlgorithm").text = algo;
}

$("#tableMenu a").click(function (e) {
    e.preventDefault();
    var selText = $(this).text();
    $("#mazeAlgorithm").html(selText + ' ' + ' <span class="caret"></span>');
    document.getElementById("mazeAlgorithm").text = selText;
});

$("#btnSave").click(function () {
    var rows = document.getElementById("mazeRows").value;
    var cols = document.getElementById("mazeCols").value;
    var algo =  document.getElementById("mazeAlgorithm").text;
    localStorage.setItem("defaultRows", rows); 
    localStorage.setItem("defaultCols", cols); 
    localStorage.setItem("defaultAlgorithm", algo);
});