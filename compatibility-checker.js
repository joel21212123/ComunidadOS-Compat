// compatibility-checker.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('hardwareCheckerForm');
  const resultArea = document.getElementById('compatibilityResult');

  if (form && resultArea) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Evita que el formulario se envíe realmente

      const os = document.getElementById('operatingSystem').value;
      const cpu = document.getElementById('cpu').value;
      const ram = document.getElementById('ram').value;
      const gpu = document.getElementById('gpu').value;
      const storage = document.getElementById('storage').value;
      const network = document.getElementById('network').value;

      // Validación básica de campos
      if (!os || !cpu || !ram || !gpu || !storage || !network) {
        resultArea.innerHTML =
          '<p style="color: red;">Por favor, rellena todos los campos para una verificación.</p>';
        return;
      }

      // Lógica de compatibilidad muy simplificada (solo para demostración, como se explicó)
      let compatibility = 'Compatible con posibles limitaciones.';
      let advice = 'Investiga más a fondo los drivers específicos y los requisitos del SO.';
      let icon = '<i class="fas fa-check-circle" style="color: green;"></i>';

      const ramValue = parseInt(ram);
      const cpuLower = cpu.toLowerCase();
      const storageLower = storage.toLowerCase();

      if (os === 'windows11') {
        if (ramValue < 4 || (!cpuLower.includes('intel') && !cpuLower.includes('amd'))) {
          compatibility = 'Posiblemente incompatible o rendimiento muy limitado para Windows 11.';
          advice =
            'Windows 11 requiere 4GB de RAM y un procesador de 64 bits compatible. También verifica TPM 2.0 y Secure Boot.';
          icon = '<i class="fas fa-exclamation-triangle" style="color: orange;"></i>';
        } else if (ramValue < 8) {
          compatibility =
            'Compatible, pero se recomienda 8GB de RAM para una mejor experiencia en Windows 11.';
          advice = 'Considera aumentar la RAM si buscas un rendimiento óptimo.';
          icon = '<i class="fas fa-info-circle" style="color: blue;"></i>';
        }
      } else if (os === 'windows10') {
        if (ramValue < 2) {
          compatibility = 'Rendimiento muy limitado para Windows 10.';
          advice = 'Se recomienda al menos 2GB de RAM para 64-bit.';
          icon = '<i class="fas fa-exclamation-triangle" style="color: orange;"></i>';
        }
      } else if (os.includes('linux')) {
        if (ramValue < 2) {
          compatibility =
            'Posiblemente incompatible con algunos entornos de escritorio modernos de Linux. Considera una distribución ligera.';
          advice =
            'Para Ubuntu/Mint, se recomiendan 4GB RAM. Para opciones más ligeras, 2GB pueden ser suficientes.';
          icon = '<i class="fas fa-exclamation-triangle" style="color: orange;"></i>';
        }
      } else if (os === 'macosSonoma') {
        // Hackintosh
        if (!cpuLower.includes('intel') && !cpuLower.includes('amd')) {
          compatibility =
            'Incompatible. macOS solo funciona con hardware Apple o procesadores Intel/AMD muy específicos en Hackintosh.';
          advice =
            'Hackintosh requiere hardware muy específico y conocimiento técnico avanzado. Tu CPU podría no ser compatible.';
          icon = '<i class="fas fa-times-circle" style="color: red;"></i>';
        } else if (!gpu.toLowerCase().includes('amd') && !gpu.toLowerCase().includes('intel')) {
          compatibility =
            'Problemas potenciales de gráficos. NVIDIA no tiene soporte moderno en macOS.';
          advice =
            'Las GPUs NVIDIA recientes no son compatibles con macOS. Se recomienda AMD o Intel.';
          icon = '<i class="fas fa-exclamation-triangle" style="color: orange;"></i>';
        } else if (!storageLower.includes('ssd')) {
          compatibility =
            'Compatible, pero un SSD es crucial para un rendimiento aceptable en Hackintosh.';
          advice = 'Se recomienda encarecidamente un SSD para la instalación de macOS.';
          icon = '<i class="fas fa-info-circle" style="color: blue;"></i>';
        }
      } else if (os === 'chromeosFlex') {
        if (ramValue < 4 || !storageLower.includes('ssd')) {
          compatibility =
            'Funcionará, pero un SSD y al menos 4GB de RAM mejorarían significativamente la experiencia con ChromeOS Flex.';
          advice =
            'Un SSD mejora drásticamente los tiempos de arranque y la fluidez general. Verifica también la compatibilidad de tu tarjeta Wi-Fi.';
          icon = '<i class="fas fa-info-circle" style="color: blue;"></i>';
        }
      }

      resultArea.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                  ${icon}
                  <h4>Resultado de Compatibilidad para ${os.replace(/([A-Z])/g, ' $1').trim()}:</h4>
              </div>
              <p><strong>Estado:</strong> ${compatibility}</p>
              <p><strong>Recomendación:</strong> ${advice}</p>
              <p><em>(Esta es una demostración. Un sistema real utilizaría bases de datos complejas o Machine Learning para predicciones más precisas.)</em></p>
          `;
    });
  }
});
