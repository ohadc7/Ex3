﻿window.onload = function () {
    document.getElementById("rePassword").onchange = checkPassword;
    document.getElementById("userName").onchange = checkName;

}

$("#userName").onchange(function () {
    var userName = document.getElementById("userName").value;
    var usersExistsUri = '/Users/';
    $.getJSON(usersExistsUri + userName).done(function (data) {
        if (data == "exist") {
            new PNotify({
                title: 'UserName Error!',
                text: 'This Username is already taken, please choose another!',
            });
            return 0;
        } else {
            return 1;
        }
    });
});

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
function checkName() {
    var userName = document.getElementById("userName").value;
    var usersExistsUri = '/Users/';
    $.getJSON(usersExistsUri + userName).done(function (data) {
        if (data == "exist") {
            new PNotify({
                title: 'UserName Error!',
                text: 'This Username is already taken, please choose another!',
            });
            return 0;
        } else {
            return 1;
        }
    });
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
        while (!checkName()) {

        }
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


