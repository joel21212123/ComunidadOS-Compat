document.addEventListener('DOMContentLoaded', () => {
  // 1. Lógica de Modo Oscuro/Claro
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Cargar tema guardado en localStorage al inicio
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  } else {
    // Por defecto, si no hay tema guardado o es 'light', no se añade 'dark-mode'
    // Y el icono ya estará en 'fa-moon' por defecto en el HTML si es el tema claro
    if (themeToggle) themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
  }

  // Toggle de tema al hacer click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
      }
    });
  }

  // --- Funcionalidad de Publicación (Post Creator) ---
  const postInput = document.getElementById('post-input');
  const publishBtn = document.getElementById('publish-btn');
  const postsContainer = document.getElementById('posts-container');
  const selectFileBtn = document.getElementById('select-file-btn');
  const fileUploadInput = document.getElementById('file-upload-input');
  const selectedFileNameSpan = document.getElementById('selected-file-name');

  // Funcionalidad para el input de archivo
  if (selectFileBtn && fileUploadInput && selectedFileNameSpan) {
    selectFileBtn.addEventListener('click', () => {
      fileUploadInput.click(); // Simular clic en el input de archivo oculto
    });

    fileUploadInput.addEventListener('change', (event) => {
      if (event.target.files.length > 0) {
        selectedFileNameSpan.textContent = event.target.files[0].name;
      } else {
        selectedFileNameSpan.textContent = 'Sin archivos seleccionados';
      }
    });
  }

  if (publishBtn && postInput && postsContainer) {
    publishBtn.addEventListener('click', () => {
      const postText = postInput.value.trim();
      if (postText) {
        const newPostHtml = `
          <div class="post-card">
            <div class="post-header">
              <img src="https://randomuser.me/api/portraits/men/78.jpg" alt="Avatar" />
              <div>
                <div class="font-bold text-text-color">John Doe</div>
                <div class="text-sm text-text-light-color">hace un momento</div>
              </div>
            </div>
            <p class="post-text text-text-color mb-4">${postText}</p>
            <div class="flex justify-between items-center text-text-light-color text-sm">
              <div class="flex space-x-4">
                <button class="like-btn" data-post-id="${Date.now()}">
                  <i class="fas fa-heart"></i>
                  <span>0</span>
                </button>
                <button class="comment-toggle-btn" data-post-id="${Date.now()}">
                  <i class="fas fa-comment"></i>
                  <span>0</span>
                </button>
              </div>
              <div class="flex space-x-2">
                <i class="fas fa-share-alt"></i>
                <i class="fas fa-bookmark"></i>
              </div>
            </div>
            <div class="comments-section hidden" data-post-id="${Date.now()}">
              <div class="mt-4 flex items-center space-x-2">
                <img src="https://randomuser.me/api/portraits/men/78.jpg" alt="Tu avatar" class="w-8 h-8 rounded-full" />
                <input type="text" placeholder="Añade un comentario..." class="flex-1 px-3 py-2 rounded-full bg-input-bg border border-border-color text-text-color" />
                <button class="text-primary-color hover:text-button-hover-darken">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        `;
        postsContainer.insertAdjacentHTML('afterbegin', newPostHtml);
        postInput.value = ''; // Limpiar el input
        selectedFileNameSpan.textContent = 'Sin archivos seleccionados'; // Limpiar nombre de archivo
        fileUploadInput.value = ''; // Resetear input de archivo
      }
    });
  }

  // --- Lógica de Likes (delegación de eventos) ---
  postsContainer.addEventListener('click', (event) => {
    const likeBtn = event.target.closest('.like-btn');
    if (likeBtn) {
      const icon = likeBtn.querySelector('i');
      const span = likeBtn.querySelector('span');
      let likes = parseInt(span.textContent);

      if (icon.classList.contains('text-red-500')) {
        icon.classList.remove('text-red-500');
        likes--;
      } else {
        icon.classList.add('text-red-500');
        likes++;
      }
      span.textContent = likes;
    }
  });

  // --- Lógica de Comentarios (delegación de eventos) ---
  postsContainer.addEventListener('click', (event) => {
    const commentToggleBtn = event.target.closest('.comment-toggle-btn');
    if (commentToggleBtn) {
      const postId = commentToggleBtn.dataset.postId;
      const commentsSection = postsContainer.querySelector(`.comments-section[data-post-id="${postId}"]`);
      if (commentsSection) {
        commentsSection.classList.toggle('hidden');
      }
    }
  });

  // --- Lógica de Filtros del Feed ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const mainSearchInput = document.getElementById('main-search-input');

  function applyFeedFilter() {
    const activeFilter = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
    const searchTerm = mainSearchInput.value.toLowerCase();
    const allPosts = postsContainer.querySelectorAll('.post-card');

    allPosts.forEach(post => {
      const postText = post.querySelector('.post-text').textContent.toLowerCase();
      const postHashtag = post.querySelector('.post-header a')?.textContent.toLowerCase() || '';

      const matchesSearch = searchTerm === '' || postText.includes(searchTerm) || postHashtag.includes(searchTerm);
      
      // Lógica de filtrado de contenido (simplificada, solo busca texto)
      let matchesFilter = true;
      if (activeFilter === 'followed') {
        // En un caso real, aquí comprobarías si el autor es seguido
        matchesFilter = false; // Simplificado para este ejemplo
      } else if (activeFilter === 'popular') {
        // En un caso real, aquí comprobarías si el post tiene muchos likes/comentarios
        matchesFilter = false; // Simplificado para este ejemplo
      } else if (activeFilter === 'latest') {
        // En un caso real, aquí tendrías un timestamp para ordenar
        matchesFilter = true; // Todos son "más recientes" si no hay lógica real
      }

      if (matchesSearch && matchesFilter) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFeedFilter();
    });
  });

  if (mainSearchInput) {
    mainSearchInput.addEventListener('input', applyFeedFilter);
  }

  // --- Lógica del Modal de Encuesta ---
  const pollBtn = document.getElementById('poll-btn');
  const pollModal = document.getElementById('poll-modal');
  const cancelPollBtn = document.getElementById('cancel-poll-btn');
  const addOptionBtn = document.getElementById('add-option-btn');
  const pollOptionsContainer = document.getElementById('poll-options-container');

  if (pollBtn && pollModal && cancelPollBtn && addOptionBtn && pollOptionsContainer) {
    pollBtn.addEventListener('click', () => {
      pollModal.classList.remove('hidden');
    });

    cancelPollBtn.addEventListener('click', () => {
      pollModal.classList.add('hidden');
      // Opcional: Limpiar el formulario de la encuesta
      document.getElementById('poll-question-input').value = '';
      pollOptionsContainer.innerHTML = `
        <div class="flex items-center space-x-2 mb-2">
            <input type="text" class="poll-option-input w-full px-4 py-2 border border-border-color rounded-md bg-input-bg text-text-color focus:outline-none focus:ring-2 focus:ring-primary-color" placeholder="Opción 1" />
            <button class="remove-option-btn text-red-500 hover:text-red-700 hidden"><i class="fas fa-times-circle"></i></button>
        </div>
        <div class="flex items-center space-x-2 mb-2">
            <input type="text" class="poll-option-input w-full px-4 py-2 border border-border-color rounded-md bg-input-bg text-text-color focus:outline-none focus:ring-2 focus:ring-primary-color" placeholder="Opción 2" />
            <button class="remove-option-btn text-red-500 hover:text-red-700 hidden"><i class="fas fa-times-circle"></i></button>
        </div>
      `;
    });

    addOptionBtn.addEventListener('click', () => {
      const optionCount = pollOptionsContainer.querySelectorAll('.poll-option-input').length + 1;
      const newOptionHtml = `
        <div class="flex items-center space-x-2 mb-2">
            <input type="text" class="poll-option-input w-full px-4 py-2 border border-border-color rounded-md bg-input-bg text-text-color focus:outline-none focus:ring-2 focus:ring-primary-color" placeholder="Opción ${optionCount}" />
            <button class="remove-option-btn text-red-500 hover:text-red-700"><i class="fas fa-times-circle"></i></button>
        </div>
      `;
      pollOptionsContainer.insertAdjacentHTML('beforeend', newOptionHtml);
    });

    pollOptionsContainer.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('.remove-option-btn');
      if (removeBtn && pollOptionsContainer.querySelectorAll('.poll-option-input').length > 2) {
        removeBtn.closest('.flex.items-center.space-x-2').remove();
        // Opcional: Renumerar las opciones si es necesario
      }
    });

    const postPollBtn = document.getElementById('post-poll-btn');
    if (postPollBtn) {
      postPollBtn.addEventListener('click', () => {
        const question = document.getElementById('poll-question-input').value.trim();
        const options = Array.from(pollOptionsContainer.querySelectorAll('.poll-option-input'))
                            .map(input => input.value.trim())
                            .filter(value => value !== '');

        if (question && options.length >= 2) {
          // Aquí iría la lógica para "publicar" la encuesta,
          // por ejemplo, añadirla al postsContainer
          console.log('Encuesta Publicada:', { question, options });
          alert('Encuesta creada con éxito: ' + question);
          pollModal.classList.add('hidden');
          // Limpiar el formulario después de publicar
          document.getElementById('poll-question-input').value = '';
          pollOptionsContainer.innerHTML = `
            <div class="flex items-center space-x-2 mb-2">
                <input type="text" class="poll-option-input w-full px-4 py-2 border border-border-color rounded-md bg-input-bg text-text-color focus:outline-none focus:ring-2 focus:ring-primary-color" placeholder="Opción 1" />
                <button class="remove-option-btn text-red-500 hover:text-red-700 hidden"><i class="fas fa-times-circle"></i></button>
            </div>
            <div class="flex items-center space-x-2 mb-2">
                <input type="text" class="poll-option-input w-full px-4 py-2 border border-border-color rounded-md bg-input-bg text-text-color focus:outline-none focus:ring-2 focus:ring-primary-color" placeholder="Opción 2" />
                <button class="remove-option-btn text-red-500 hover:text-red-700 hidden"><i class="fas fa-times-circle"></i></button>
            </div>
          `;
        } else {
          alert('Por favor, ingresa una pregunta y al menos dos opciones para la encuesta.');
        }
      });
    }
  }

  // --- Lógica de Notificaciones (Badge) ---
 const notificationBtn = document.getElementById('notification-btn');
  const notificationBadge = document.getElementById('notification-badge');
  const notificationDropdown = document.getElementById('notification-dropdown');
  const notificationList = document.getElementById('notification-list');
  const markAllReadBtn = document.getElementById('mark-all-read-btn');
  const noNotificationsMessage = document.querySelector('.no-notifications-message');

  let unreadNotifications = parseInt(notificationBadge.textContent);
  let notifications = []; // Array para almacenar todas las notificaciones
  // Función para renderizar las notificaciones en el dropdown
  function renderNotifications() {
     notificationList.innerHTML = ''; // Limpiar la lista actual
    if (notifications.length === 0) {
      noNotificationsMessage.classList.remove('hidden');
      notificationList.appendChild(noNotificationsMessage);
    } else {
      noNotificationsMessage.classList.add('hidden');
      notifications.forEach(notif => {
        const notificationItem = document.createElement('a');
        notificationItem.href = notif.link || '#'; // Enlace de la notificación
        notificationItem.classList.add('notification-item', 'transition-colors');
        if (notif.unread) {
          notificationItem.classList.add('unread');
        }

        notificationItem.innerHTML = `
          <img src="${notif.avatar}" alt="Avatar" class="notification-item-avatar" />
          <div class="notification-content">
            <h4>${notif.title}</h4>
            <p>${notif.message}</p>
            <span class="notification-timestamp">${notif.timestamp}</span>
          </div>
          ${notif.icon ? `<i class="notification-icon ${notif.icon}"></i>` : ''}
        `;
        notificationItem.addEventListener('click', (e) => {
          if (notif.unread) {
            notif.unread = false;
            notificationItem.classList.remove('unread');
            updateNotificationBadge();
          }
          // Si hay un enlace, permite que el navegador lo siga
          if (notif.link) {
            // El navegador seguirá el href del <a>
          } else {
            e.preventDefault(); // Previene la navegación si no hay enlace específico
          }
        });
        notificationList.appendChild(notificationItem);
      });
    }
    updateNotificationBadge();
  }

  // Función para añadir una notificación (simulada)
  function addNotification( title,
    message,
    avatar = 'https://randomuser.me/api/portraits/men/99.jpg',
    type = 'general',
    link = '#',
    icon = '' // Puedes pasar un icono de Font Awesome aquí, ej. 'fas fa-heart'
  ) {
     const now = new Date();
    const timestamp = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + ' ' + now.toLocaleDateString('es-ES');
        const newNotification = {
          id: Date.now(), // ID único
      title,
      message,
      avatar,
      type,
      link,
      icon,
      unread: true,
      timestamp
    };
     notifications.unshift(newNotification); // Añadir al principio para que las nuevas salgan arriba
    updateNotificationBadge();
    renderNotifications(); // Vuelve a renderizar la lista

      // Animación visual en el badge
    notificationBadge.classList.add('animate-ping-once');
    setTimeout(() => {
      notificationBadge.classList.remove('animate-ping-once');
    }, 1000);
  }
// Función para actualizar el número del badge
  function updateNotificationBadge() {
    unreadNotifications = notifications.filter(notif => notif.unread).length;
    notificationBadge.textContent = unreadNotifications;
    if (unreadNotifications > 0) {
      notificationBadge.classList.add('bg-red-500'); // Rojo para notificaciones no leídas
      notificationBadge.classList.remove('bg-gray-500');
    } else {
      notificationBadge.classList.remove('bg-red-500');
      notificationBadge.classList.add('bg-gray-500'); // Gris cuando no hay notificaciones
    }
  }

  // Toggle del dropdown de notificaciones
  if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que el clic se propague al documento
      notificationDropdown.classList.toggle('hidden');
      if (!notificationDropdown.classList.contains('hidden')) {
        renderNotifications(); // Renderiza las notificaciones al abrir
      }
    });
  }

  // Marcar todas como leídas
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      notifications.forEach(notif => notif.unread = false);
      renderNotifications(); // Vuelve a renderizar para quitar el estilo 'unread'
      updateNotificationBadge();
    });
  }

  // Cerrar el dropdown si se hace clic fuera de él
  document.addEventListener('click', (e) => {
    if (
      !notificationDropdown.classList.contains('hidden') &&
      !notificationDropdown.contains(e.target) &&
      e.target !== notificationBtn && // Asegúrate de que el clic en el botón no lo cierre inmediatamente
      !e.target.closest('.notification-btn') // Y que el clic en los hijos del botón tampoco
    ) {
      notificationDropdown.classList.add('hidden');
    }
  });
  // Ejemplos de uso (puedes llamar a addNotification desde donde necesites en tu JS)
  addNotification('Nuevo Comentario', '¡Alguien ha comentado en tu publicación!', 'https://randomuser.me/api/portraits/women/1.jpg', 'comment', '#post-id-123', 'fas fa-comment');
  addNotification('Nuevo Seguimiento', '¡John Doe te está siguiendo ahora!', 'https://randomuser.me/api/portraits/men/2.jpg', 'follow', '#profile-john-doe', 'fas fa-user-plus');

  addNotification('Notificación General', '¡Bienvenido a la comunidad OS-Compat!', 'https://randomuser.me/api/portraits/lego/1.jpg', 'general', '#welcome-info', 'fas fa-info-circle');

  // Inicializar el badge al cargar la página
  updateNotificationBadge();
});