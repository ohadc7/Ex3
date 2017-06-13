gameStarted = 0;
$("#btnStart").click(function () {
    if (gameStarted) {
        alert("the game has already started");
    } else {
        gameStarted = 1;
        var apiUrl = "/SinglePlayer";
        name = $("#mazeName").val();
        cols = $("#mazeCols").val();
        rows = $("#mazeRows").val();

        $.getJSON(apiUrl + "/" + name + "/" + rows + "/" + cols)
            .done(function (data) {

                var obj = JSON.parse(data);
                var initPosition = obj.Start;
                var goalPosition = obj.End;
                //mazeString = JSON.stringify(obj.Maze);
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
                $('#mazeCanvasName').mazeBoard('mazeBoard', maze2dArray, initPosition.Row, initPosition.Col, goalPosition.Row, goalPosition.Col, user, end);
                $('#mazeCanvasName').mazeBoard('drawMaze');


            })
            .fail(function (jqXHR, textStatus, err) {
                $("#product").text("Error: " + err);
            });
    }
});

$("#btnSolve").click(function () {
    var apiUrl = "/SinglePlayer";
    name = $("#mazeName").val();
    var selText = $(this).text();
    algorithm = $("#mazeAlgorithm").text(selText);
    var algoNum=1;
    if (algorithm == "BFS") {
        algoNum = 0;
    }
    
    $.getJSON(apiUrl + "/" + name + "/" + algoNum)
        .done(function (data) {

            var obj = JSON.parse(data);
           

        })
    .fail(function (jqXHR, textStatus, err) {
        $("#product").text("Error: " + err);
    });
});

$("#tableMenu a").click(function (e) {
    e.preventDefault();
    var selText = $(this).text();
    $("#mazeAlgorithm").text(selText);
});

