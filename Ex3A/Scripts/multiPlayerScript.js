
var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.users = ko.observableArray(); // enables data binding
    self.mazeName = ko.observable();
    self.mazeRows = ko.observable();
    self.mazeCols = ko.observable();
    self.avilableGames = ko.observable();


    function getAllGames() {
        $(".loader").show();
        var MultiPlayerHub = $.connection.MultiPlayerHub;
        self.avilableGames = MultiPlayerHub.server.list();
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