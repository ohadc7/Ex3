window.onload = function () {
    if (!localStorage.length) {
        localStorage.setItem("defaultRows", "15");
        localStorage.setItem("defaultCols", "15");
        localStorage.setItem("defaultAlgorithm", "BFS");
    }
    document.getElementById("mazeRows").value = localStorage.getItem("defaultRows");
    document.getElementById("mazeCols").value = localStorage.getItem("defaultCols");
    var algo = localStorage.getItem("defaultAlgorithm");
    $("#mazeAlgorithm").html(algo + ' ' + ' <span class="caret"></span>');
    document.getElementById("mazeAlgorithm").text = algo;
    var mazeObject;
};


$("#btnStart").click(function () {
    $(".loader").show();
    var apiUrl = "/SinglePlayer";
    name = $("#mazeName").val();
    cols = $("#mazeCols").val();
    rows = $("#mazeRows").val();
    if (name === "") {
        new PNotify({
            title: 'Name error!',
            text: 'You must give name to the game!',
            type: 'error'
        });        return;
    }
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
            mazeObject = $("#mazeCanvasName").mazeBoard(maze2dArray,rows,cols, initPosition.Row, initPosition.Col, goalPosition.Row, goalPosition.Col, user, end, true,
                function (direction, playerRow, playerCol) {
                    if (playerRow === goalPosition.Row && playerCol === goalPosition.Col) {
                        new PNotify({
                            title: 'You Win!',
                            text: 'You finish the Game!',
                            type: 'success'
                        });
                        setTimeout(function () {
                            mazeObject.clearCanvas('mazeCanvasName');
                        }, 2500);
                    }
                });
            mazeObject.clearCanvas('mazeCanvasName');
            mazeObject.drawMaze('mazeCanvasName');
            $(".loader").hide();
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
    if (algorithm === "BFS") {
        algoNum = 0;
    }
    
    $.getJSON(apiUrl + "/" + name + "/" + algoNum)
        .done(function (data) {

            var solveString = data;
            mazeObject.solveMaze('mazeCanvasName', solveString);

            setTimeout(function () {
                new PNotify({
                    title: 'Solve Finish!',
                    text: 'We solved the game for you!',
                    type: 'info'
                });
            }, 500 * solveString.length);
            
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

