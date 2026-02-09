const userData = localStorage.getItem("loggedUser");

if (!userData) {
  window.location.href = "../login/index.html";
}

const user = JSON.parse(userData);
document.getElementById("usernameDisplay").textContent = user.username;

document.querySelectorAll(".selectExam").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = "../terms/terms.html";
  });
});
