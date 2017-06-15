window.onload = function () {
    document.getElementById("rePassword").onchange = checkPassword;
}

function checkPassword() {
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("rePassword").value;
    if (password != rePassword) {
        new PNotify({
            title: 'Password Error!',
            text: 'The Password must be match!',
        });
    }
}

var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.users = ko.observableArray(); // enables data binding
    self.Username = ko.observable();
    self.Password = ko.observable();
    self.Email = ko.observable();
    self.addUser = function () {
        var usersUri = '/api/Users/';
        var encryptPassword = b64_sha512(self.Password());
        var user = {
            Name: self.Username(),
            Password: encryptPassword,
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


