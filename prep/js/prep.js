const userData = localStorage.getItem("loggedUser");

if (!userData) {
  window.location.href = "../login/index.html";
}

const user = JSON.parse(userData);

document.getElementById("usernameDisplay").textContent = user.username;
document.getElementById("welcomeName").textContent = user.username;

document.getElementById("nextBtn").addEventListener("click", () => {
  window.location.href = "../select-exam/select_exam.html";
});
