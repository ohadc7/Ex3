window.onload = function () {
    document.getElementById("rePassword").onchange = checkPassword;
    document.getElementById("userName").onchange = checkName;

};

//verify that password and rePassword are the same
function checkPassword() {
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("rePassword").value;
    if (password !== rePassword) {
        new PNotify({
            title: 'Password Error!',
            text: 'The Password must be match!'
        });
    }
}
//check that username is unique
function checkName() {
    var userName = document.getElementById("userName").value;
    var usersExistsUri = '/Users/';
    $.getJSON(usersExistsUri + userName).done(function (data) {
        if (data === "exist") {
            new PNotify({
                title: 'UserName Error!',
                text: 'This Username is already taken, please choose another!'
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
        $(".loader").show();
        //check input validity
        if ($("#userName").val() === "") {
            new PNotify({
                text: 'Please enter User Name'
            });
            $(".loader").hide();
            return;
        }
        if ($("#password").val() === "") {
            new PNotify({
                text: 'Please enter Password'
            });
            $(".loader").hide();
            return;
        }
        if ($("#rePassword").val() === "") {
            new PNotify({
                text: 'Please enter RePassword'
            });
            $(".loader").hide();
            return;
        }
        if ($("#email").val() === "") {
            new PNotify({
                text: 'Please enter email'
            });
            $(".loader").hide();
            return;
        }
        var password1 = document.getElementById("password").value;
        var rePassword2 = document.getElementById("rePassword").value;
        if (password1 !== rePassword2) {
            new PNotify({
                title: 'Password Error!',
                text: 'Register failed. Password and RePassword must be the same!'
            });
            $(".loader").hide();
            return;
        }
        var usersUri = '/api/Users/';
        var shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(self.Password());
        var hash = shaObj.getHash("HEX");
        var user = {
            Name: self.Username(),
            Password: hash,
            Email: self.Email()
        };
        var usersExistsUri = '/Users/';
        $.getJSON(usersExistsUri + self.Username()).done(function (data) {
            $(".loader").hide();
            if (data === "notExists") {
                $.post(usersUri, user).done(function (item) {
                    self.users.push(item);
                    sessionStorage.setItem("userName", user.Name);
                    window.location.replace("HomePage.html");
                });
            } else {
                new PNotify({
                    title: 'UserName Error!',
                    text: 'Refister failed. Invalid Username!'
                });
            }
        });
    };
};
ko.applyBindings(new ViewModel());


