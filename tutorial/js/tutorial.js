// Entrar automáticamente a pantalla completa al cargar
window.addEventListener("load", () => {
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  }
});

/* Evitar salida accidental */
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    alert("The exam must remain in full screen mode.");
  }
});
