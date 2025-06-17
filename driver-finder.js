// driver-finder.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('driverSearchForm');
  const resultArea = document.getElementById('driverSearchResult');

  if (form && resultArea) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const type = document.getElementById('componentType').value;
      const model = document.getElementById('componentModel').value;
      const os = document.getElementById('targetOs').value;

      if (!type || !model || !os) {
        resultArea.innerHTML =
          '<p style="color: red;">Por favor, selecciona un tipo, ingresa el modelo y el sistema operativo.</p>';
        return;
      }

      let suggestion = `Busca "${model} driver ${os}" en el sitio web oficial del fabricante.`;
      let specificAdvice = '';
      let icon = '<i class="fas fa-search" style="color: #007bff;"></i>';

      const modelLower = model.toLowerCase();

      if (os.includes('windows')) {
        specificAdvice =
          'Para Windows, los fabricantes suelen tener instaladores automáticos. También revisa Windows Update (Configuración > Actualización y seguridad > Windows Update > Ver actualizaciones opcionales) para drivers genéricos o básicos.';
      } else if (os.includes('linux')) {
        if (modelLower.includes('nvidia')) {
          specificAdvice =
            'Para GPUs NVIDIA en Linux, necesitarás descargar los drivers propietarios desde el sitio web de NVIDIA o instalarlos a través de los repositorios de tu distribución (ej. "sudo apt install nvidia-driver-xxx" en Ubuntu).';
        } else if (modelLower.includes('amd')) {
          specificAdvice =
            'Para GPUs AMD en Linux, los drivers suelen estar integrados en el kernel o disponibles a través de los repositorios de tu distribución. Visita la web de AMD si necesitas drivers propietarios o más recientes.';
        } else if (modelLower.includes('intel')) {
          specificAdvice =
            'Los drivers de gráficos Intel en Linux suelen estar bien integrados en el kernel. Asegúrate de tener tu sistema actualizado.';
        } else {
          specificAdvice =
            'Para Linux, muchos drivers ya están integrados en el kernel. Si el componente es propietario o muy nuevo, busca en los repositorios de tu distribución o en el sitio web del fabricante del chip/componente.';
        }
      } else if (os.includes('macos')) {
        icon = '<i class="fas fa-exclamation-triangle" style="color: orange;"></i>';
        specificAdvice =
          'Para Hackintosh, la compatibilidad de drivers es compleja. Necesitarás "kexts" (extensiones del kernel) específicos para tu hardware. Consulta foros especializados como tonymacx86.com o r/hackintosh en Reddit. Las GPUs NVIDIA modernas no tienen soporte en macOS.';
      } else if (os.includes('chromeos')) {
        specificAdvice =
          'Chrome OS gestiona los drivers automáticamente. Si estás usando ChromeOS Flex en un PC, los problemas de Wi-Fi o Bluetooth son los más comunes. Busca si tu modelo de chip de red (ej. Intel AX200, Realtek RTL8822CE) es compatible con ChromeOS Flex o si hay informes de la comunidad.';
      }

      resultArea.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                  ${icon}
                  <h4>Sugerencia de Búsqueda para ${model} en ${os
        .replace(/([A-Z])/g, ' $1')
        .trim()}:</h4>
              </div>
              <p><strong>Paso clave:</strong> ${suggestion}</p>
              <p><strong>Consejo específico:</strong> ${specificAdvice}</p>
              <p><em>(Esta es una demostración. Un sistema real tendría una base de datos de drivers y enlaces directos.)</em></p>
          `;
    });
  }
});
// driver-finder.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('driverSearchForm');
  const resultArea = document.getElementById('driverSearchResult');

  if (form && resultArea) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const type = document.getElementById('componentType').value;
      const model = document.getElementById('componentModel').value;
      const os = document.getElementById('targetOs').value;

      if (!type || !model || !os) {
        resultArea.innerHTML =
          '<p style="color: red;">Por favor, selecciona un tipo, ingresa el modelo y el sistema operativo.</p>';
        return;
      }

      let suggestion = `Busca "${model} driver ${os}" en el sitio web oficial del fabricante.`;
      let specificAdvice = '';
      let icon = '<i class="fas fa-search" style="color: #007bff;"></i>';

      const modelLower = model.toLowerCase();

      if (os.includes('windows')) {
        specificAdvice =
          'Para Windows, los fabricantes suelen tener instaladores automáticos. También revisa Windows Update (Configuración > Actualización y seguridad > Windows Update > Ver actualizaciones opcionales) para drivers genéricos o básicos.';
      } else if (os.includes('linux')) {
        if (modelLower.includes('nvidia')) {
          specificAdvice =
            'Para GPUs NVIDIA en Linux, necesitarás descargar los drivers propietarios desde el sitio web de NVIDIA o instalarlos a través de los repositorios de tu distribución (ej. "sudo apt install nvidia-driver-xxx" en Ubuntu).';
        } else if (modelLower.includes('amd')) {
          specificAdvice =
            'Para GPUs AMD en Linux, los drivers suelen estar integrados en el kernel o disponibles a través de los repositorios de tu distribución. Visita la web de AMD si necesitas drivers propietarios o más recientes.';
        } else if (modelLower.includes('intel')) {
          specificAdvice =
            'Los drivers de gráficos Intel en Linux suelen estar bien integrados en el kernel. Asegúrate de tener tu sistema actualizado.';
        } else {
          specificAdvice =
            'Para Linux, muchos drivers ya están integrados en el kernel. Si el componente es propietario o muy nuevo, busca en los repositorios de tu distribución o en el sitio web del fabricante del chip/componente.';
        }
      } else if (os.includes('macos')) {
        icon = '<i class="fas fa-exclamation-triangle" style="color: orange;"></i>';
        specificAdvice =
          'Para Hackintosh, la compatibilidad de drivers es compleja. Necesitarás "kexts" (extensiones del kernel) específicos para tu hardware. Consulta foros especializados como tonymacx86.com o r/hackintosh en Reddit. Las GPUs NVIDIA modernas no tienen soporte en macOS.';
      } else if (os.includes('chromeos')) {
        specificAdvice =
          'Chrome OS gestiona los drivers automáticamente. Si estás usando ChromeOS Flex en un PC, los problemas de Wi-Fi o Bluetooth son los más comunes. Busca si tu modelo de chip de red (ej. Intel AX200, Realtek RTL8822CE) es compatible con ChromeOS Flex o si hay informes de la comunidad.';
      }

      resultArea.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                  ${icon}
                  <h4>Sugerencia de Búsqueda para ${model} en ${os
        .replace(/([A-Z])/g, ' $1')
        .trim()}:</h4>
              </div>
              <p><strong>Paso clave:</strong> ${suggestion}</p>
              <p><strong>Consejo específico:</strong> ${specificAdvice}</p>
              <p><em>(Esta es una demostración. Un sistema real tendría una base de datos de drivers y enlaces directos.)</em></p>
          `;
    });
  }
});
