checkBeforeLoad();
function checkBeforeLoad() {
    if (sessionStorage.getItem("userName")) {
        window.location.replace("Login.html");
    }
};