document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Función para aplicar el tema
  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      // Asegúrate de que themeToggleBtn no sea null antes de intentar acceder a querySelector
      if (themeToggleBtn) {
        themeToggleBtn.querySelector('i').classList.remove('fa-moon');
        themeToggleBtn.querySelector('i').classList.add('fa-sun');
      }
    } else {
      body.classList.remove('dark-mode');
      // Asegúrate de que themeToggleBtn no sea null antes de intentar acceder a querySelector
      if (themeToggleBtn) {
        themeToggleBtn.querySelector('i').classList.remove('fa-sun');
        themeToggleBtn.querySelector('i').classList.add('fa-moon');
      }
    }
  }

  // 1. Cargar el tema guardado en localStorage al cargar la página
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Si no hay tema guardado, detectar la preferencia del sistema operativo
    applyTheme('dark');
  } else {
    applyTheme('light'); // Por defecto, modo claro
  }

  // 2. Escuchar el clic en el botón de alternancia
  // Asegúrate de que themeToggleBtn exista antes de añadir el event listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
      } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
});
