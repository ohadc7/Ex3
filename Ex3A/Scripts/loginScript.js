var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.users = ko.observableArray(); // enables data binding
    self.Username = ko.observable();
    self.Password = ko.observable();
    self.login = function () {
        var usersUri = '/api/Users/';
        var encryptPassword = b64_sha512(self.Password());
        var user = {
            Name: self.Username(),
            Password: encryptPassword,
        };
        var usersExistsUri = '/Users/';
        $.getJSON(usersExistsUri + self.Username()).done(function (data) {
            var returnString = JSON.parse(data);
            if (returnString == "exist") {

            }
        });

        $.post(usersUri, user).done(function (item) {
            self.users.push(item);
            sessionStorage.setItem("userName", user.Name);
            window.location.replace("HomePage.html");
        });


    }
};
ko.applyBindings(new ViewModel());
