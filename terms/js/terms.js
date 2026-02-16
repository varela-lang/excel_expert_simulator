const userData = localStorage.getItem("loggedUser");

if (!userData) {
  window.location.href = "../../index.html";
}

const radios = document.querySelectorAll('input[name="accept"]');
const nextBtn = document.getElementById('nextBtn');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    nextBtn.disabled = radio.value !== 'yes';
  });
});


nextBtn.addEventListener("click", () => {
  const keys = ["key1"];

  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  localStorage.setItem("selectedKey", randomKey);
  localStorage.setItem("currentProject", 0);
  localStorage.setItem("currentQuestion", 0);

  window.location.href = "../exam/exam.html";
});
