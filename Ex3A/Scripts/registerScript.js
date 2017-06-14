var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.users = ko.observableArray(); // enables data binding
    self.Username = ko.observable();
    self.Password = ko.observable();
    self.Email = ko.observable();
    self.RePassword = ko.observable();
    self.addUser = function () {
        var usersUri = '/api/Users/';
        var user = {
            Name: self.Username(),
            Password: self.Password(),
            Email: self.Email()
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


