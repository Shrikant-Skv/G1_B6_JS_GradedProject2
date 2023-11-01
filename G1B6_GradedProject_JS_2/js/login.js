function validate() {
    var usernameForm = document.getElementById("username").value;
    var passwordForm = document.getElementById("password").value;
    let username = "admin";
    let password = "pass@1";

    if (usernameForm == username && passwordForm == password) {
        window.open("resume.html", "_self");
    }

    else {
        alert("Invalid username/password");
    }
}

let button = document.getElementById("login");
button.addEventListener('click', validate);

function preventback() { window.history.forward(); }
setTimeout("preventback()", 0);
window.onunload = function () { null };