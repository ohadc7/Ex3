var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.users = ko.observableArray(); // enables data binding
    self.addUser = function () {
        var usersUri = '/api/Users/';
        var user = {
            Name: self.newUser.Username(),
            Password: self.newUser.Password(),
            Email: self.newUser.Email()
        };

        $.getJSON(usersUri).done(function (data) {
            console.log(data);
        });

        $.post(usersUri, user).done(function (item) {
            self.users.push(item);
        });
    }
};
ko.applyBindings(new ViewModel());


