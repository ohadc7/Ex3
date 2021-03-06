﻿window.onload = function () {
    if (!localStorage.length) {
        localStorage.setItem("defaultRows", "15");
        localStorage.setItem("defaultCols", "15");
        localStorage.setItem("defaultAlgorithm", "BFS");
    }
    document.getElementById("mazeRows").value = localStorage.getItem("defaultRows");
    document.getElementById("mazeCols").value = localStorage.getItem("defaultCols");
    //var algo = localStorage.getItem("defaultAlgorithm");
    //$("#mazeAlgorithm").html(algo + ' ' + ' <span class="caret"></span>');

};


// Declare a proxy to reference the hub
var connectionWithOpponent = $.connection.multiPlayerHub;
var mazeOpponentObject;
var mazeUserObject;
//show message on disconnection
$.connection.hub.reconnecting(function () {
    new PNotify({
        title: 'Disconnected',
        text: 'trying to reconnect to the server',
        type: 'error'
    });
});

// Create a function that the hub can call to broadcast messages
connectionWithOpponent.client.startPlaying = function () {
    //clear canvases
    mazeUserObject.clearCanvas('mazeCanvasUser');
    mazeOpponentObject.clearCanvas('mazeCanvasOpponent');

    //opponent maze
    mazeOpponentObject.drawMaze('mazeCanvasOpponent');
    $(".loader").hide();
    $('#userLabel').show();
    $('#mazeCanvasOpponent').show();

    //my maze
    mazeUserObject.drawMaze('mazeCanvasUser');
    $(".loader").hide();
    $('#opponentLabel').show();
    $('#mazeCanvasUser').show();

};

//handle move command from the server to the opponent mazeBoard
connectionWithOpponent.client.updateMove = function (direction) {
    mazeOpponentObject.move('mazeCanvasOpponent', direction);
};

//create mazes when the game is starting
function createMazes(obj) {
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
    var myUserName = sessionStorage.getItem("userName");

    //opponent maze
    mazeOpponentObject = $("#mazeCanvasOpponent").mazeBoard(maze2dArray, rows, cols, initPosition.Row,
        initPosition.Col, goalPosition.Row, goalPosition.Col, user2, end2, false,
        function (direction, playerRow, playerCol) {
            if (playerRow === goalPosition.Row && playerCol === goalPosition.Col) {
                new PNotify({
                    title: 'You Lose!',
                    text: 'Your opponent finished the game!',
                    type: 'error'
                });
                setTimeout(function () {
                    mazeUserObject.clearCanvas('mazeCanvasUser');
                    mazeOpponentObject.clearCanvas('mazeCanvasOpponent');
                }, 2500);
            }
        });

    //my maze
    mazeUserObject = $("#mazeCanvasUser").mazeBoard(maze2dArray, rows, cols, initPosition.Row,
        initPosition.Col, goalPosition.Row, goalPosition.Col, user1, end1, true,
        function (direction, playerRow, playerCol) {
            connectionWithOpponent.server.iamMoving(name, direction);
            if (playerRow === goalPosition.Row && playerCol === goalPosition.Col) {
                new PNotify({
                    title: 'You Win!',
                    text: 'You finish the Game!',
                    type: 'success'
                });
                var url = "/MultiPlayer/Iwon/" + name + "/" + myUserName;
                $.getJSON(url)
                    .done(function (data) {
                        var usersController = '/Users/';
                        $.getJSON(usersController + myUserName + "/" + data + "/dummy/dummy").done(function (data) {
                        }); 


                    });
                setTimeout(function () {
                    mazeUserObject.clearCanvas('mazeCanvasUser');
                    mazeOpponentObject.clearCanvas('mazeCanvasOpponent');
                }, 2500);
            }
        });
}

// Start the connection
$.connection.hub.start().done(function () {

    var myUserName = sessionStorage.getItem("userName");

    //start button click
    $("#btnStart").click(function () {
        $(".loader").show();
        var apiUrl = "/MultiPlayer";
        name = $("#mazeName").val();
        cols = $("#mazeCols").val();
        rows = $("#mazeRows").val();
        if (name === "") {
            new PNotify({
                text: 'You must give name to the game!',
                type: 'error'
            });
            $(".loader").hide();
            return;
        }
        if (rows === "") {
            new PNotify({
                text: 'You must set number of rows!',
                type: 'error'
            });
            $(".loader").hide();
            return;
        }
        if (cols === "") {
            new PNotify({
                text: 'You must set number of columns!',
                type: 'error'
            });
            $(".loader").hide();
            return;
        }
        $.getJSON(apiUrl + "/" + name + "/" + rows + "/" + cols + "/" + myUserName)
            .done(function (data) {
                if (data === "not available") {
                    new PNotify({
                        title: 'Invalid Name!',
                        text: 'Another maze has this name. Please choose another name!',
                        type: 'error'
                    });
                    $(".loader").hide();
                    return;
                }
                var obj = JSON.parse(data);
                createMazes(obj);
                document.title = name;

                // Call the StartGame method on the hub
                connectionWithOpponent.server.startGame(name);
            })
            .fail(function (jqXHR, textStatus, err) {
                $("#product").text("Error: " + err);
            });

    });

        //join button click
        $("#btnJoin").click(function () {
            $(".loader").show();
            apiUrl = "/MultiPlayer";
            gamesList = document.getElementById("gamesDropdown");
            if (-1 === gamesList.selectedIndex) {
                new PNotify({
                    text: 'You must choose game from the list!',
                    type: 'error'
                });
                $(".loader").hide();
                return;
            }
            selectedGame = gamesList.options[gamesList.selectedIndex].value;            
            $.getJSON(apiUrl + '/' + selectedGame + "/" + myUserName)
                .done(function (data) {
                    if (data === "not available") {
                        new PNotify({
                            title: 'invalid Game!',
                            text: 'this game has already started, please choose another one!',
                            type: 'error'
                        });
                        $(".loader").hide();
                        return;
                    }

                    name = selectedGame;
                    var obj = JSON.parse(data);
                    createMazes(obj);
                    document.title = selectedGame;
                    connectionWithOpponent.server.joinGame(selectedGame);
                    $(".loader").hide();

                })
                .fail(function (jqXHR, textStatus, err) {
                    $("#product").text("Error: " + err);
                });

        });

});



var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.games = ko.observableArray(); // enables data binding
    var gamesUri = "/MultiPlayer";
     getGames = function() {
        $(".loader").show();
        $.getJSON(gamesUri).done(function (data) {
            $(".loader").hide();
            self.games(data);
        });
    };
};
ko.applyBindings(new ViewModel()); // sets up the data binding

