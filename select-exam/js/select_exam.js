const userData = localStorage.getItem("loggedUser");

if (!userData) {
  window.location.href = "../../index.html";
}

const user = JSON.parse(userData);
document.getElementById("usernameDisplay").textContent = user.username;

document.querySelectorAll("#exam").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = "../terms/terms.html";
  });
});
