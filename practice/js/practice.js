document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // LEER CATEGORÍA DESDE URL
  // =========================
  const params = new URLSearchParams(window.location.search);
  const category = params.get("topic");

  if (!category) {
    alert("Category not specified");
    return;
  }

  // =========================
  // RUTAS DINÁMICAS
  // =========================
  const basePath = `./${category}`;
  const questionsPath = `${basePath}/questions.json`;
  const filesPath = `${basePath}/files/`;

  // =========================
  // ESTADO
  // =========================
  let questions = [];
  let projectName = "";
  let currentQuestion = Number(localStorage.getItem("currentQuestion")) || 0;

  // =========================
  // FETCH QUESTIONS
  // =========================
  fetch(questionsPath)
    .then(res => {
      if (!res.ok) throw new Error("Questions file not found");
      return res.json();
    })
    .then(data => {
      projectName = data.projectName;
      questions = data.questions;

      document.getElementById("projectTitle").textContent = projectName;

      renderQuestion();
      renderProgress();
      downloadExcelOnce();
      startTimer(50 * 60);
    })
    .catch(err => {
      console.error(err);
      alert("Error loading practice data");
    });

  // =========================
  // RENDER QUESTION
  // =========================
  function renderQuestion() {
    document.getElementById("questionText").textContent =
      questions[currentQuestion].text;

    localStorage.setItem("currentQuestion", currentQuestion);
    renderProgress();
  }

  // =========================
  // PROGRESS BAR (MOS STYLE)
  // =========================
  function renderProgress() {
    const bar = document.getElementById("progressBar");
    bar.innerHTML = "";

    questions.forEach((_, index) => {
      const span = document.createElement("span");
      span.textContent = index + 1;

      if (index === currentQuestion) {
        span.classList.add("active");
      } else if (index < currentQuestion) {
        span.classList.add("done");
      }

      span.addEventListener("click", () => {
        currentQuestion = index;
        renderQuestion();
      });

      bar.appendChild(span);
    });
  }

  // =========================
  // DESCARGAR ARCHIVO (1 VEZ)
  // =========================
  function downloadExcelOnce() {
    if (currentQuestion !== 0) return;

    const fileName = questions[0].file;

    const link = document.createElement("a");
    link.href = `${filesPath}${fileName}`;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

});

/* =========================
   TIMER
   ========================= */
let timerInterval;

function startTimer(seconds) {
  let time = seconds

  const timerEl = document.getElementById("timer");

  timerInterval = setInterval(() => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");

    timerEl.textContent = `${min}:${sec}`;
    localStorage.setItem("practiceTime", time);

    if (time <= 0) {
      clearInterval(timerInterval);
      alert("Time's up");
      localStorage.clear();
      location.reload();
    }

    time--;
  }, 1000);
}
