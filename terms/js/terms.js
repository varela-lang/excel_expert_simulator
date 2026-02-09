const radios = document.querySelectorAll('input[name="accept"]');
const nextBtn = document.getElementById('nextBtn');

/* Habilitar botón solo si acepta */
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    nextBtn.disabled = radio.value !== 'yes';
  });
});

/* Acción del botón */
nextBtn.addEventListener("click", () => {
  const keys = ["key1"];

  // Elegir clave al azar 🎲
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  // Inicializar flujo del examen
  localStorage.setItem("selectedKey", randomKey);
  localStorage.setItem("currentProject", 0);
  localStorage.setItem("currentQuestion", 0);

  // Ir directo al examen (sin escalas)
  window.location.href = "../exam/exam.html";
});
