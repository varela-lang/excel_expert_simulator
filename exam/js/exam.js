document.addEventListener("DOMContentLoaded", () => {

  const key = localStorage.getItem("selectedKey");
  if (!key) {
    alert("No exam key found");
    return;
  }

  let currentProject = Number(localStorage.getItem("currentProject")) || 0;
  let currentQuestion = Number(localStorage.getItem("currentQuestion")) || 0;

  const projectJsonPath = `../data/${key}/proyect${currentProject + 1}/project${currentProject + 1}.json`;

  fetch(projectJsonPath)
    .then(res => res.json())
    .then(data => {
      render(data);
      downloadExcelOnce(data);
      renderProgress(data);
      startTimer(50 * 60); // 50 minutos
    })
    .catch(err => console.error("Error loading project:", err));

  /* =========================
     RENDER PRINCIPAL
     ========================= */
  function render(data) {
    document.getElementById("examTitle").innerText =
      `Project ${currentProject + 1}: ${data.projectName}`;

    document.getElementById("questionText").innerText =
      data.questions[currentQuestion].text;

    renderProgress(data);

    // Mostrar botón de siguiente proyecto si es la última pregunta
    const nextProjectContainer = document.getElementById("nextProjectContainer");
    nextProjectContainer.innerHTML = ""; // limpiar

    if (currentQuestion === data.questions.length - 1) {
      const button = document.createElement("button");
      button.textContent = "Pasar al siguiente proyecto";
      button.classList.add("next-project-btn");
      button.addEventListener("click", nextProject);
      nextProjectContainer.appendChild(button);
    }
  }

  /* =========================
     PROGRESO / NAVEGACIÓN
     ========================= */
  function renderProgress(data) {
    const bar = document.getElementById("progressBar");
    bar.innerHTML = "";

    data.questions.forEach((_, index) => {
      const span = document.createElement("span");
      span.textContent = index + 1;

      if (index === currentQuestion) {
        span.classList.add("active");
      } else if (index < currentQuestion) {
        span.classList.add("done");
      }

      span.addEventListener("click", () => {
        goToQuestion(index, data);
      });

      bar.appendChild(span);
    });
  }

  /* =========================
     CAMBIO DE PREGUNTA / PROYECTO
     ========================= */
  function goToQuestion(index, data) {

    // 👉 Caso normal: cambiar de pregunta
    if (index < data.questions.length) {
      currentQuestion = index;
      localStorage.setItem("currentQuestion", currentQuestion);
      render(data);
      return;
    }

    // 👉 Fin del proyecto → siguiente proyecto
    nextProject();
  }

  function nextProject() {
    currentProject++;
    currentQuestion = 0;

    localStorage.setItem("currentProject", currentProject);
    localStorage.setItem("currentQuestion", 0);

    if (currentProject >= 5) {
      alert("Examen finalizado. Buen trabajo");
      localStorage.clear();
      return;
    }

    location.reload();
  }

  /* =========================
     DESCARGA EXCEL (UNA VEZ)
     ========================= */
  function downloadExcelOnce(data) {
    if (currentQuestion !== 0) return;

    const fileName = data.questions[0].file;

    const link = document.createElement("a");
    link.href = `../data/${key}/proyect${currentProject + 1}/files/${fileName}`;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

});

/* =========================
   TEMPORIZADOR
   ========================= */
let timerInterval;

function startTimer(seconds) {
  const saved = localStorage.getItem("examTime");
  let time = saved ? Number(saved) : seconds;

  const timerEl = document.getElementById("timer");

  timerInterval = setInterval(() => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");

    timerEl.textContent = `⏱ ${min}:${sec}`;
    localStorage.setItem("examTime", time);

    if (time <= 0) {
      clearInterval(timerInterval);
      alert("Tiempo agotado");
      localStorage.clear();
      location.reload();
    }

    time--;
  }, 1000);
}
