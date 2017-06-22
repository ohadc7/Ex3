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





// Declare a proxy to reference the hub
var connectionWithOpponent = $.connection.multiPlayerHub;
var mazeOpponentObject;
var mazeUserObject;
// Create a function that the hub can call to broadcast messages
connectionWithOpponent.client.startPlaying = function () {
    alert("start playing");

    mazeOpponentObject.clearCanvas('mazeCanvasUser');
    mazeOpponentObject.drawMaze('mazeCanvasUser');
    $(".loader").hide();
    $('#opponentLabel').show();
    $('#mazeCanvasUser').show();


    mazeUserObject.clearCanvas('mazeCanvasOpponent');
    mazeUserObject.drawMaze('mazeCanvasOpponent');
    $(".loader").hide();
    $('#userLabel').show();
    $('#mazeCanvasOpponent').show();

};

connectionWithOpponent.client.updateMove = function (direction) {
    //alert("your opponent moved to the direction:" + direction);
};


// Get the user name and store it to prepend to messages
//var username = prompt('Enter your name:');
// Set initial focus to message input box
//$('#message').focus();

// Start the connection
$.connection.hub.start().done(function () {


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

                //opponent maze
                mazeOpponentObject = $.fn.mazeBoard(maze2dArray, rows, cols, initPosition.Row, initPosition.Col, goalPosition.Row, goalPosition.Col, user2, end2, true,
               function (direction, playerRow, playerCol) {
                   if (playerRow == goalPosition.Row && playerCol == goalPosition.Col) {
                       new PNotify({
                           title: 'You Win!',
                           text: 'You finish the Game!',
                           type: 'success',
                       });
                   }
               });

                //my maze
                mazeUserObject = $.fn.mazeBoard(maze2dArray, rows, cols, initPosition.Row, initPosition.Col, goalPosition.Row, goalPosition.Col, user1, end1, true,
               function (direction, playerRow, playerCol) {
                   if (playerRow == goalPosition.Row && playerCol == goalPosition.Col) {
                       new PNotify({
                           title: 'You Win!',
                           text: 'You finish the Game!',
                           type: 'success',
                       });
                   }
               });

                // Call the StartGame method on the hub
                //alert("connect to hub:");
                connectionWithOpponent.server.startGame(name);
            })
            .fail(function (jqXHR, textStatus, err) {
                $("#product").text("Error: " + err);
            });

    });

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

                    //opponent maze
                    mazeOpponentObject = $.fn.mazeBoard(maze2dArray, rows, cols, initPosition.Row, initPosition.Col, goalPosition.Row, goalPosition.Col, user1, end1, true,
                function (direction, playerRow, playerCol) {
                    if (playerRow == goalPosition.Row && playerCol == goalPosition.Col) {
                        new PNotify({
                            title: 'You Win!',
                            text: 'You finish the Game!',
                            type: 'success',
                        });
                    }
                });

                    //my maze
                    mazeUserObject = $.fn.mazeBoard(maze2dArray, rows, cols, initPosition.Row, initPosition.Col, goalPosition.Row, goalPosition.Col, user2, end2, true,
               function (direction, playerRow, playerCol) {
                   if (playerRow == goalPosition.Row && playerCol == goalPosition.Col) {
                       new PNotify({
                           title: 'You Win!',
                           text: 'You finish the Game!',
                           type: 'success',
                       });
                   }
               });

                    connectionWithOpponent.server.joinGame(selectedGame);
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












