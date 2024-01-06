function authenticate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Sostituisci con la tua logica di autenticazione
    if (username === "admin" && password === "password") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("content-container").classList.remove("hidden");
        document.getElementById("content-container").classList.add("visible");
    } else {
        alert("Credenziali non valide. Riprova.");
    }
}