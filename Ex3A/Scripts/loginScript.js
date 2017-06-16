var ViewModel = function () {
    var self = this; // make 'this' available to subfunctions or closures
    self.users = ko.observableArray(); // enables data binding
    self.Username = ko.observable();
    self.Password = ko.observable();
    self.login = function () {
        var usersUri = '/api/Users/';
        var shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(self.Password());
        var hash = shaObj.getHash("HEX");
        var userName = self.Username();
        var usersExistsUri = '/Users/';
        $.getJSON(usersExistsUri + userName).done(function (data) {
            if (data == "exist") {
                var usersCheckCorrectUserAndPassword = '/Users/';
                $.getJSON(usersCheckCorrectUserAndPassword + userName + "/" + hash + "/" + "1").done(function (data) {
                    if (data == "OK") {
                        sessionStorage.setItem("userName", userName);
                        window.location.replace("HomePage.html");
                    } else {
                        new PNotify({
                            title: 'Password Error!',
                            text: 'Your password is incroect, please try again.',
                        });
                    }
                });
            } else {
                new PNotify({
                    title: 'UserName Error!',
                    text: 'This Username is not part of our DataBase!',
                });
            }
        });
    }
};
ko.applyBindings(new ViewModel());
