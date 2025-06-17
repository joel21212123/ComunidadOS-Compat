document.addEventListener('DOMContentLoaded', () => {
  // --- Funcionalidad para el menú desplegable "Sistemas" y mostrar/ocultar secciones ---

  const systemDropdownLinks = document.querySelectorAll('.nav .dropdown a[href^="#"]');
  const systemContentArea = document.getElementById('system-content-area');
  const systemContentTabs = document.querySelectorAll('.system-tab-content');

  function hideAllSystemTabs() {
    systemContentTabs.forEach((tab) => {
      tab.classList.remove('active');
    });
  }

  function showSystemTab(id) {
    const targetTab = document.getElementById(id);
    if (targetTab) {
      hideAllSystemTabs();
      targetTab.classList.add('active');
      systemContentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  systemDropdownLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSystemTab(targetId);
    });
  });

  // --- Funcionalidad para el botón "Verificar Compatibilidad" en la sección Hero ---
  const checkCompatibilityButton = document.querySelector('.hero .btn-primary');
  if (checkCompatibilityButton) {
    checkCompatibilityButton.addEventListener('click', (event) => {
      event.preventDefault();
      const targetSection = document.getElementById('seccion-compatibilidad');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // --- Funcionalidad para los "card-link" de la sección "Sistemas Operativos" (las tarjetas grandes) ---
  const osCardLinks = document.querySelectorAll('.os-card .card-link[href^="#"]');
  osCardLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSystemTab(targetId);
    });
  });

  // ELIMINADA toda la lógica del modo oscuro de aquí.
  
});
