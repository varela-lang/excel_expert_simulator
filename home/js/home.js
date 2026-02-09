const userData = localStorage.getItem("loggedUser");

if (!userData) {
  // Si no hay sesión, regresamos al login
  window.location.href = "../login/index.html";
}

const user = JSON.parse(userData);

// Mostrar nombre
document.getElementById("usernameDisplay").textContent = user.username;

// Botón Launch Exam
document.getElementById("launchExam").addEventListener("click", () => {
  window.location.href = "../prep/prep.html";
});
