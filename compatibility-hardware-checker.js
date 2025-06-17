// =============================================
// CONSTANTES Y VARIABLES GLOBALES
// =============================================
const CPU_MODAL_ID = 'cpuModal';
const CPU_INPUT_ID = 'cpu';
const DEBOUNCE_DELAY = 300;
const FORM_ID = 'hardwareCheckerForm';
const RESULT_AREA_ID = 'compatibilityResult';

// Requisitos mínimos para cada sistema operativo
const OS_REQUIREMENTS = {
  windows11: {
    minRam: 4,
    recommendedRam: 8,
    cpuTypes: ['intel', 'amd'],
    requiresTpm: true,
    requiresSecureBoot: true,
    gpuRequirements: 'DirectX 12 compatible',
    storageRecommendation: 'SSD recomendado'
  },
  windows10: {
    minRam: 2,
    recommendedRam: 4,
    cpuTypes: ['intel', 'amd', 'qualcomm'],
    gpuRequirements: 'DirectX 9 compatible',
    storageRecommendation: 'SSD recomendado'
  },
  linuxUbuntu: {
    minRam: 2,
    recommendedRam: 4,
    cpuTypes: ['intel', 'amd', 'arm'],
    gpuRequirements: 'Varies by desktop environment',
    storageRecommendation: '25GB mínimo'
  },
  linuxMint: {
    minRam: 2,
    recommendedRam: 4,
    cpuTypes: ['intel', 'amd'],
    gpuRequirements: 'Varies by desktop environment',
    storageRecommendation: '20GB mínimo'
  },
  macosSonoma: {
    minRam: 8,
    recommendedRam: 16,
    cpuTypes: ['intel', 'apple'],
    gpuRequirements: 'Metal compatible',
    storageRecommendation: 'SSD obligatorio'
  },
  chromeosFlex: {
    minRam: 4,
    recommendedRam: 8,
    cpuTypes: ['intel', 'amd'],
    gpuRequirements: 'Any modern GPU',
    storageRecommendation: 'SSD recomendado'
  }
};

// =============================================
// INICIALIZACIÓN AL CARGAR EL DOCUMENTO
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  initializeCPUModal();
  setupTabs();
  setupSearch();
  setupCPUSelection();
  setupCompatibilityChecker();
  
  // Mostrar primera pestaña por defecto
  const firstTab = document.querySelector('.tablinks');
  if (firstTab) firstTab.click();
});

// =============================================
// CONFIGURACIÓN DEL MODAL
// =============================================
function initializeCPUModal() {
  const modal = document.getElementById(CPU_MODAL_ID);
  const cpuInput = document.getElementById(CPU_INPUT_ID);
  
  if (!modal || !cpuInput) return;

  // Abrir modal al hacer clic en el input
  cpuInput.addEventListener('click', () => toggleModal(true));
  
  // Cerrar modal al hacer clic fuera o en la X
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('close')) {
      toggleModal(false);
    }
  });
  
  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      toggleModal(false);
    }
  });
}

function toggleModal(show) {
  const modal = document.getElementById(CPU_MODAL_ID);
  if (!modal) return;

  if (show) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    // Enfocar el campo de búsqueda al abrir
    const searchInput = modal.querySelector('input[type="text"]');
    if (searchInput) searchInput.focus();
  } else {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// =============================================
// CONFIGURACIÓN DE PESTAÑAS
// =============================================
function setupTabs() {
  const tabsContainer = document.querySelector('.tab');
  if (!tabsContainer) return;

  tabsContainer.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.tablinks');
    if (!tabBtn || tabBtn.classList.contains('active')) return;
    
    const brandName = tabBtn.dataset.brand;
    if (!brandName) return;
    
    // Actualizar UI de pestañas
    updateActiveTab(tabBtn);
    
    // Mostrar contenido correspondiente
    showTabContent(brandName);
  });
}

function updateActiveTab(activeBtn) {
  document.querySelectorAll('.tablinks').forEach(btn => {
    btn.classList.toggle('active', btn === activeBtn);
  });
}

function showTabContent(brandName) {
  document.querySelectorAll('.tabcontent').forEach(content => {
    if (content.id === brandName) {
      content.style.display = 'block';
      content.classList.add('active');
    } else {
      content.style.display = 'none';
      content.classList.remove('active');
    }
  });
}

// =============================================
// CONFIGURACIÓN DE BÚSQUEDA
// =============================================
function setupSearch() {
  const searchInputs = document.querySelectorAll('.modal-content input[type="text"]');
  
  searchInputs.forEach(input => {
    // Crear contenedor para el ícono de búsqueda
    const searchContainer = document.createElement('div');
    searchContainer.className = 'cpu-search-container';
    input.parentNode.insertBefore(searchContainer, input);
    searchContainer.appendChild(input);
    
    // Agregar ícono de búsqueda
    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon';
    searchContainer.appendChild(searchIcon);
    
    // Configurar búsqueda con debounce
    setupDebouncedSearch(input);
  });
}

function setupDebouncedSearch(input) {
  let timeout;
  
  input.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      performSearch(input);
    }, DEBOUNCE_DELAY);
  });
}

function performSearch(input) {
  const searchTerm = input.value.toLowerCase().trim();
  const grid = input.closest('.tabcontent')?.querySelector('.cpu-grid');
  if (!grid) return;

  grid.querySelectorAll('.cpu-option').forEach(option => {
    const cpuName = option.dataset.value.toLowerCase();
    const cpuDetails = option.textContent.toLowerCase();
    const match = cpuName.includes(searchTerm) || cpuDetails.includes(searchTerm);
    option.style.display = match ? 'block' : 'none';
  });
}

// =============================================
// CONFIGURACIÓN DE SELECCIÓN DE CPU
// =============================================
function setupCPUSelection() {
  document.querySelectorAll('.cpu-grid').forEach(grid => {
    grid.addEventListener('click', handleCPUSelection);
    
    // Hacer los elementos seleccionables por teclado
    grid.querySelectorAll('.cpu-option').forEach(option => {
      option.setAttribute('tabindex', '0');
      option.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCPU(option, grid);
        }
      });
    });
  });
}

function handleCPUSelection(e) {
  const option = e.target.closest('.cpu-option');
  if (!option) return;
  
  const grid = e.currentTarget;
  selectCPU(option, grid);
}

function selectCPU(option, grid) {
  // Deseleccionar todos los CPUs en este grid
  grid.querySelectorAll('.cpu-option').forEach(opt => {
    opt.classList.remove('selected');
    opt.setAttribute('aria-selected', 'false');
  });
  
  // Seleccionar el CPU elegido
  option.classList.add('selected');
  option.setAttribute('aria-selected', 'true');
  
  // Actualizar el input con el valor seleccionado
  document.getElementById(CPU_INPUT_ID).value = option.dataset.value;
  
  // Cerrar el modal
  toggleModal(false);
}

// =============================================
// VERIFICADOR DE COMPATIBILIDAD
// =============================================
function setupCompatibilityChecker() {
  const form = document.getElementById(FORM_ID);
  const resultArea = document.getElementById(RESULT_AREA_ID);

  if (!form || !resultArea) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = getFormData();
    if (!validateForm(formData, resultArea)) return;
    
    const result = checkCompatibility(formData);
    displayResult(result, formData.os, resultArea);
  });
}

function getFormData() {
  return {
    os: document.getElementById('operatingSystem').value,
    cpu: document.getElementById('cpu').value,
    ram: parseInt(document.getElementById('ram').value),
    gpu: document.getElementById('gpu').value,
    storage: document.getElementById('storage').value,
    network: document.getElementById('network').value
  };
}

function validateForm(formData, resultArea) {
  if (!formData.os || !formData.cpu || !formData.ram || !formData.gpu || !formData.storage || !formData.network) {
    resultArea.innerHTML = `
      <div class="result-error">
        <i class="fas fa-exclamation-circle"></i>
        <p>Por favor, rellena todos los campos para una verificación.</p>
      </div>
    `;
    return false;
  }
  return true;
}

function checkCompatibility(formData) {
  const requirements = OS_REQUIREMENTS[formData.os] || {};
  const cpuLower = formData.cpu.toLowerCase();
  const gpuLower = formData.gpu.toLowerCase();
  const storageLower = formData.storage.toLowerCase();
  
  let status = 'Compatible con posibles limitaciones.';
  let advice = 'Investiga más a fondo los drivers específicos y los requisitos del SO.';
  let icon = 'fa-check-circle';
  let color = 'green';
  
  // Verificar RAM
  if (formData.ram < requirements.minRam) {
    status = `Incompatible. Se requieren al menos ${requirements.minRam}GB de RAM.`;
    advice = `Considera actualizar a ${requirements.recommendedRam}GB o más para mejor rendimiento.`;
    icon = 'fa-times-circle';
    color = 'red';
    return { status, advice, icon, color };
  } else if (formData.ram < requirements.recommendedRam) {
    status = `Compatible, pero se recomiendan ${requirements.recommendedRam}GB de RAM.`;
    advice = 'El sistema funcionará, pero el rendimiento podría no ser óptimo.';
    icon = 'fa-exclamation-triangle';
    color = 'orange';
  }
  
  // Verificar CPU
  const hasCompatibleCpu = requirements.cpuTypes.some(type => cpuLower.includes(type));
  if (!hasCompatibleCpu) {
    status = 'Incompatible. Procesador no soportado.';
    advice = `Este sistema operativo requiere procesadores ${requirements.cpuTypes.join(' o ')}.`;
    icon = 'fa-times-circle';
    color = 'red';
    return { status, advice, icon, color };
  }
  
  // Verificaciones específicas por SO
  if (formData.os === 'windows11') {
    if (!hasTpmSupport()) {
      status = 'Windows 11 requiere TPM 2.0 y Secure Boot.';
      advice = 'Verifica en tu BIOS/UEFI si estas características están habilitadas.';
      icon = 'fa-exclamation-triangle';
      color = 'orange';
    }
  } else if (formData.os === 'macosSonoma') {
    if (!gpuLower.includes('amd') && !gpuLower.includes('intel')) {
      status = 'Problemas potenciales de gráficos en Hackintosh.';
      advice = 'Las GPUs NVIDIA no tienen soporte moderno en macOS. Se recomienda AMD o Intel.';
      icon = 'fa-exclamation-triangle';
      color = 'orange';
    } else if (!storageLower.includes('ssd')) {
      status = 'Compatible, pero SSD es crucial para Hackintosh.';
      advice = 'Se recomienda encarecidamente un SSD para la instalación de macOS.';
      icon = 'fa-info-circle';
      color = 'blue';
    }
  } else if (formData.os === 'chromeosFlex') {
    if (!storageLower.includes('ssd')) {
      status = 'Funcionará mejor con un SSD.';
      advice = 'Un SSD mejora drásticamente los tiempos de arranque y la fluidez general.';
      icon = 'fa-info-circle';
      color = 'blue';
    }
  }
  
  return { status, advice, icon, color };
}

function hasTpmSupport() {
  // Esta es una simulación - en un sistema real se detectaría el TPM
  return Math.random() > 0.5; // 50% de probabilidad para demostración
}

function displayResult(result, os, resultArea) {
  const osName = os.replace(/([A-Z])/g, ' $1').trim()
    .replace('linux', 'Linux')
    .replace('windows', 'Windows ')
    .replace('macos', 'macOS ')
    .replace('chromeos', 'ChromeOS ');
  
  resultArea.innerHTML = `
    <div class="result-header" style="display: flex; align-items: center; justify-content: center; gap: 10px;">
      <i class="fas ${result.icon}" style="color: ${result.color}; font-size: 1.5em;"></i>
      <h4>Resultado de Compatibilidad para ${osName}:</h4>
    </div>
    <div class="result-content">
      <p><strong>Estado:</strong> ${result.status}</p>
      <p><strong>Recomendación:</strong> ${result.advice}</p>
      ${getAdditionalRequirements(os)}
    </div>
    <div class="result-footer">
      <p><em>Nota: Esta es una demostración. Un sistema real utilizaría bases de datos complejas para predicciones más precisas.</em></p>
    </div>
  `;
}

function getAdditionalRequirements(os) {
  const requirements = OS_REQUIREMENTS[os];
  if (!requirements) return '';
  
  let html = '<div class="additional-requirements"><p><strong>Requisitos clave:</strong></p><ul>';
  
  if (requirements.minRam) {
    html += `<li>RAM mínima: ${requirements.minRam}GB (recomendados ${requirements.recommendedRam}GB)</li>`;
  }
  if (requirements.cpuTypes) {
    html += `<li>Procesadores compatibles: ${requirements.cpuTypes.join(', ')}</li>`;
  }
  if (requirements.gpuRequirements) {
    html += `<li>Gráficos: ${requirements.gpuRequirements}</li>`;
  }
  if (requirements.storageRecommendation) {
    html += `<li>Almacenamiento: ${requirements.storageRecommendation}</li>`;
  }
  if (requirements.requiresTpm) {
    html += `<li>Requiere TPM 2.0</li>`;
  }
  if (requirements.requiresSecureBoot) {
    html += `<li>Requiere Secure Boot</li>`;
  }
  
  html += '</ul></div>';
  return html;
}

// =============================================
// POLYFILLS Y FUNCIONES DE COMPATIBILIDAD
// =============================================
// Para navegadores antiguos que no soportan classList.toggle con 2 parámetros
if (!DOMTokenList.prototype.toggle || (function() {
  var test = document.createElement('div').classList;
  if (!test.toggle) return true;
  try {
    test.toggle('test', false);
    return false;
  } catch (e) {
    return true;
  }
})()) {
  DOMTokenList.prototype.toggle = function(token, force) {
    if (force === undefined) {
      force = !this.contains(token);
    }
    if (force) {
      this.add(token);
    } else {
      this.remove(token);
    }
    return force;
  };
}
function initializeCPUModal() {
  const modal = document.getElementById('cpuModal');
  const cpuInput = document.getElementById('cpu');
  
  if (!modal || !cpuInput) return;

  // Abrir modal al hacer clic en el input
  cpuInput.addEventListener('click', () => toggleModal(true));
  
  // Cerrar modal
  modal.querySelector('.close').addEventListener('click', () => toggleModal(false));
  
  // Cerrar al hacer clic fuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal(false);
  });
}

function toggleModal(show) {
  const modal = document.getElementById('cpuModal');
  if (show) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  } else {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}