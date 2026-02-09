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
  window.location.href = "../tutorial/tutorial.html";
});

