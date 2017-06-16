$("#navBar").load("NavBar.html", function () {
    if (sessionStorage.getItem("userName")) {
        document.getElementById("registerId").textContent = "Hello " + sessionStorage.getItem("userName");
        document.getElementById("registerId").href = "#";
        document.getElementById("loginId").textContent = "Log Off";
        document.getElementById("loginId").onclick = logOff;
        document.getElementById("loginId").href = "HomePage.html";

    }
});

function logOff() {
    
    sessionStorage.removeItem("userName");
};
