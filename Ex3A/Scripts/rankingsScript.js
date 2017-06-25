var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.users = ko.observableArray(); // enables data binding
    var usersUri = "/api/Users";
    function getAllUsers() {
        $(".loader").show();
        $.getJSON(usersUri).done(function (data) {
            $(".loader").hide();

            function compare(user1, user2) {
                /*
                //sort according to Name
                if (user1.Name < user2.Name)
                    return -1;
                if (user1.Name > user2.Name)
                    return 1;
                return 0;
                */
                //sort according to difference between Wins to Loses
                user1Score = user1.Wins - user1.Loses;
                user2Score = user2.Wins - user2.Loses;
                return (user2Score - user1Score);
                //return (user1Score - user2Score);
            };

            data.sort(compare);

            counter = 0;
            data.forEach(function (someUser) {
                counter++;
                someUser.Rank = counter;
            });

            self.users(data);
        });
    }
    // Fetch the initial data
    getAllUsers();
};
ko.applyBindings(new ViewModel()); // sets up the data binding
