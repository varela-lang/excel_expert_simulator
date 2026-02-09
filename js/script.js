const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  fetch("../data/users.json")
    .then(response => response.json())
    .then(users => {
      const user = users.find(
        u =>
          u.username === usernameInput &&
          u.password === passwordInput
      );

      if (user) {
        // Guardamos sesión (simulada)
        localStorage.setItem("loggedUser", JSON.stringify(user));

        // Redirección
        window.location.href = "../home/home.html";
      } else {
        errorMessage.style.display = "block";
      }
    })
    .catch(error => {
      console.error("Error loading users:", error);
    });
});
