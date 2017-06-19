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
}


$("#btnStart").click(function () {
    $(".loader").show();
    var apiUrl = "/MultiPlayer";
    name = $("#mazeName").val();
    cols = $("#mazeCols").val();
    rows = $("#mazeRows").val();

    $.getJSON(apiUrl + "/" + name + "/" + rows + "/" + cols)
        .done(function (data) {
            if (data == "not available") {
                alert("another maze already has this name. please choose another name.");
                return;
            }
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
            $('#mazeCanvasUser').mazeBoard('mazeBoard', maze2dArray, initPosition.Row, initPosition.Col, goalPosition.Row, goalPosition.Col, user, end, true,
                function (direction, playerRow, playerCol) {
                    if (playerRow == goalPosition.Row && playerCol == goalPosition.Col) {
                        new PNotify({
                            title: 'You Win!',
                            text: 'You finish the Game!',
                            type: 'success',
                        });
                    }
                    //alert("the player passed to the direction " + direction + " and arrived to row:" + playerRow + " column:" + playerCol);
                });
            $('#mazeCanvasUser').mazeBoard('clearCanvas');
            $('#mazeCanvasUser').mazeBoard('drawMaze');
            $(".loader").hide();
            $('#mazeCanvasUser').show();
        })
        .fail(function (jqXHR, textStatus, err) {
            $("#product").text("Error: " + err);
        });

});




/*
$("#btnUpdate").click(function () {
    var ViewModel = function () {
        var self = this; // make 'this' available to subfunctions or closures
        self.games = ko.observableArray(); // enables data binding
        var gamesUri = "/MultiPlayer";
        function getAllGames() {
            $(".loader").show();
            $.getJSON(gamesUri).done(function (data) {
                $(".loader").hide();
                //alert(data);
                self.games(data);
            });
        }
        // Fetch the initial data
        getAllGames();
    };
    ko.applyBindings(new ViewModel()); // sets up the data binding
});
*/

$("#btnJoin").click(function () {
    $(".loader").show();
    apiUrl = "/MultiPlayer";
    gamesList = document.getElementById("gamesDropdown");
    selectedGame = gamesList.options[gamesList.selectedIndex].value;
    thePath = apiUrl + '/' + selectedGame;
    $.getJSON(apiUrl + '/' + selectedGame)
        .done(function (data) {
            if (data == "not available") {
                alert("this game isn't available. please choose another game.");
                return;
            }
            var obj = JSON.parse(data);
            var initPosition = obj.Start;
            var goalPosition = obj.End;
            mazeString = obj.Maze;
            rows = obj.Rows;
            cols = obj.Cols;
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
            $('#mazeCanvasUser').mazeBoard('mazeBoard', maze2dArray, initPosition.Row, initPosition.Col, goalPosition.Row, goalPosition.Col, user, end, true,
                function (direction, playerRow, playerCol) {
                    if (playerRow == goalPosition.Row && playerCol == goalPosition.Col) {
                        new PNotify({
                            title: 'You Win!',
                            text: 'You finish the Game!',
                            type: 'success',
                        });
                    }
                    //alert("the player passed to the direction " + direction + " and arrived to row:" + playerRow + " column:" + playerCol);
                });
            $('#mazeCanvasUser').mazeBoard('clearCanvas');
            $('#mazeCanvasUser').mazeBoard('drawMaze');
            $(".loader").hide();
            $('#mazeCanvasUser').show();
        })
        .fail(function (jqXHR, textStatus, err) {
            $("#product").text("Error: " + err);
        });


});


var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.games = ko.observableArray(); // enables data binding
    var gamesUri = "/MultiPlayer";
    function getAllGames() {
        $(".loader").show();
        $.getJSON(gamesUri).done(function (data) {
            $(".loader").hide();
            self.games(data);
        });
    }
    // Fetch the initial data
    getAllGames();
};
ko.applyBindings(new ViewModel()); // sets up the data binding










