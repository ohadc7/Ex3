
var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.users = ko.observableArray(); // enables data binding
    self.mazeName = ko.observable();
    self.mazeRows = ko.observable();
    self.mazeCols = ko.observable();
    self.avilableGames = ko.observable();


    function getAllGames() {
        $(".loader").show();
        var MultiPlayerHub = $.connection.multiPlayerHub;

        /*
            messagesHub.client.gotMessage = function (senderPhoneNum, text) {
                $("#lstMessages").append("<li><strong>" + senderPhoneNum + "</strong>:" + text + "</li>");
            };
            */
        $.connection.hub.start().done(function () {
            MultiPlayerHub.server.connectedUsers.add(,Context.ConnectionId)
            var apiUrl = "/MultiPlayer";
            name = self.mazeName();
           rows = self.mazeRows();
            cols = self.mazeCols();

            $.getJSON(apiUrl + "/" + name + "/" + rows + "/" + cols + "/" + Context.ConnectionId)
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
                            if (playerRow == goalPosition.Row && playerCol == goalPosition.Col) {
                                new PNotify({
                                    title: 'You Win!',
                                    text: 'You finish the Game!',
                                    type: 'success',
                                });
                            }
                            //alert("the player passed to the direction " + direction + " and arrived to row:" + playerRow + " column:" + playerCol);
                        });
                    $('#mazeCanvasName').mazeBoard('clearCanvas');
                   // $('#mazeCanvasName').mazeBoard('drawMaze');
                    $(".loader").hide();
                    $('#mazeCanvasName').show();
                })
                .fail(function (jqXHR, textStatus, err) {
                    $("#product").text("Error: " + err);
                });






              /*  $("#btnConnect").click(function () {
                    var userPhoneNum = $("#userPhoneNum").val();
                    messagesHub.server.connect(userPhoneNum);
                });

                $("#btnSendMessage").click(function () {
                    var userPhoneNum = $("#userPhoneNum").val();
                    var senderPhoneNum = $("#targetPhoneNum").val();
                    var text = $("#msgText").val();
                    messagesHub.server.sendMessage(userPhoneNum, senderPhoneNum, text);
                });*/
            });




          
                //self.avilableGames = MultiPlayerHub.server.list();
                //self.avilableGames = ['test','test1','test2'];

                //self.selectedGame = ko.observable();
                /*messagesHub.client.gotMessage = function (senderPhoneNum, text) {
                    $("#lstMessages").append("<li><strong>" + senderPhoneNum + "</strong>:" + text + "</li>");
                };*/
                $(".loader").hide();
                //self.users(data);

        }

    self.startGame = function () {
    }
    // Fetch the initial data
    getAllGames();
    
};
ko.applyBindings(new ViewModel()); // sets up the data binding