﻿$("#btnStart").click(function () {
    var apiUrl = "/SinglePlayer";
    name = $("#mazeName").val();
    cols = $("#mazeCols").val();
    rows = $("#mazeRows").val();

    $.getJSON(apiUrl + "/" + name + "/" + rows + "/" + cols)
        .done(function (data) {
            var obj = JSON.parse(data);
            var initPosition = obj.Start;
            var goalPosition = obj.End;
            mazeString = obj.Maze;
            var i, j;
            maze2dArray = [];
            mazeArray = [];
            for (i = 0; i < rows; i++) {
                for (j = 0; j < cols; j++) {
                    mazeArray.push(mazeString.charAt(i * cols + j));

                }
                maze2dArray.push(mazeArray);
                mazeArray = [];
            }
            $('#mazeCanvasName').mazeBoard('mazeBoard', maze2dArray, initPosition.Row, initPosition.Col, goalPosition.Row, goalPosition.Col, user, end, true,
                function (direction, playerRow, playerCol) {
                    alert(direction);
                });
            $('#mazeCanvasName').mazeBoard('clearCanvas');
            $('#mazeCanvasName').mazeBoard('drawMaze');
            $('#mazeCanvasName').show();
        })
        .fail(function (jqXHR, textStatus, err) {
            $("#product").text("Error: " + err);
        });

});

$("#btnSolve").click(function () {
    var apiUrl = "/SinglePlayer";
    name = $("#mazeName").val();
    algorithm = $("#mazeAlgorithm").text().trim();
    var algoNum=1;
    if (algorithm == "BFS") {
        algoNum = 0;
    }
    
    $.getJSON(apiUrl + "/" + name + "/" + algoNum)
        .done(function (data) {

            var solveString = data;
            $('#mazeCanvasName').mazeBoard('solveMaze',solveString);
           
        })
    .fail(function (jqXHR, textStatus, err) {
        $("#product").text("Error: " + err);
    });
});

$("#tableMenu a").click(function (e) {
    e.preventDefault();
    var selText = $(this).text();
    $("#mazeAlgorithm").html(selText + ' ' + ' <span class="caret"></span>');
});

