/**
 * Funciones Comunes para FixPro
 * Versión 1.0
 */

/**
 * Carga una plantilla HTML en un elemento
 * @param {string} templatePath - Ruta de la plantilla
 * @param {string} elementId - ID del elemento destino
 * @param {function} callback - Función a ejecutar después de cargar
 */
function loadTemplate(templatePath, elementId, callback) {
    fetch(templatePath)
      .then(response => {
        if (!response.ok) throw new Error('Plantilla no encontrada');
        return response.text();
      })
      .then(html => {
        const element = document.getElementById(elementId);
        if (element) element.innerHTML = html;
        if (callback) callback();
      })
      .catch(error => {
        console.error('Error cargando plantilla:', error);
      });
  }
  
  /**
   * Carga el header común
   */
  function loadHeader() {
    loadTemplate('templates/header.html', 'common-header', () => {
      const user = auth.getCurrentUser();
      if (user) {
        const roleConfig = auth.getRoleConfig();
        
        // Actualizar información de usuario
        const userInfoElement = document.getElementById('user-info');
        if (userInfoElement) {
          userInfoElement.innerHTML = `
            <img src="assets/img/${user.avatar}" class="rounded-circle me-2" width="30" height="30">
            <span class="badge" style="background-color: #${roleConfig.color}">
              ${roleConfig.name}
            </span>
            <span class="ms-2 d-none d-md-inline">${user.name}</span>
          `;
        }
        
        // Configurar logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', auth.logout);
        }
      }
    });
  }
  
  /**
   * Carga el menú lateral según el rol
   */
  function loadSidebar() {
    const user = auth.getCurrentUser();
    if (!user) return;
    
    const roleConfig = auth.getRoleConfig();
    loadTemplate(`templates/sidebar-${user.role.toLowerCase()}.html`, 'main-sidebar', () => {
      // Configurar eventos del menú
      roleConfig.menuItems.forEach(item => {
        const element = document.getElementById(`menu-${item.action}`);
        if (element) {
          element.addEventListener('click', () => {
            if (window[item.action]) {
              window[item.action]();
            }
          });
        }
      });
    });
  }
  
  /**
   * Muestra notificación al usuario
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de notificación (success, error, warning, info)
   * @param {number} duration - Duración en milisegundos (opcional)
   */
  function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 500);
    }, duration);
  }
  
  /**
   * Inicializa la aplicación
   */
  function initializeApp() {
    loadHeader();
    loadSidebar();
    
    // Configurar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Mostrar dashboard por defecto
    if (typeof showDashboard === 'function') {
      showDashboard();
    }
  }
  
  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', initializeApp);