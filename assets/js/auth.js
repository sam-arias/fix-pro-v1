/**
 * Sistema de Autenticación y Gestión de Roles para FixPro - Versión Consolidada
 * Combina las mejores características de auth.js y login.js
 * Versión 2.0
 */

// Configuración de roles (ampliada)
const ROLES_CONFIG = {
  ADMIN: {
      name: 'Administrador',
      color: 'e74a3b',
      dashboard: 'admin-dashboard.html',
      level: 3, // Nivel de jerarquía
      menuItems: [
          { icon: 'fa-users', text: 'Usuarios', action: 'showUserManagement' },
          { icon: 'fa-boxes', text: 'Inventario', action: 'showInventory' },
          { icon: 'fa-clipboard-list', text: 'Órdenes', action: 'showAllOrders' },
          { icon: 'fa-chart-bar', text: 'Reportes', action: 'showReports' },
          { icon: 'fa-cog', text: 'Configuración', action: 'showSettings' }
      ]
  },
  MANAGER: {
      name: 'Gerente',
      color: '1cc88a',
      dashboard: 'manager-dashboard.html',
      level: 2,
      menuItems: [
          { icon: 'fa-clipboard-list', text: 'Órdenes', action: 'showAllOrders' },
          { icon: 'fa-chart-line', text: 'Ventas', action: 'showSales' },
          { icon: 'fa-boxes', text: 'Inventario', action: 'showInventory' },
          { icon: 'fa-users', text: 'Técnicos', action: 'showTechnicians' }
      ]
  },
  TECHNICIAN: {
      name: 'Técnico',
      color: '4e73df',
      dashboard: 'technician-dashboard.html',
      level: 1,
      menuItems: [
          { icon: 'fa-tasks', text: 'Mis Órdenes', action: 'showMyOrders' },
          { icon: 'fa-clock', text: 'Horarios', action: 'showSchedule' },
          { icon: 'fa-tools', text: 'Repuestos', action: 'showParts' },
          { icon: 'fa-certificate', text: 'Especialidades', action: 'showSpecialties' }
      ]
  }
};

// Datos de usuarios (en producción usar base de datos)
const USERS = [
  {
      id: 1,
      username: 'admin',
      password: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // 'admin123' (hash correcto)
      name: 'Administrador Principal',
      email: 'admin@fixpro.com',
      role: 'ADMIN',
      avatar: 'profile-placeholder.png'
  },
  {
      id: 2,
      username: 'gerente1',
      password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // password
      name: 'Gerente Regional',
      email: 'gerente@fixpro.com',
      role: 'MANAGER',
      avatar: 'profile-placeholder.png'
  },
  {
      id: 3,
      username: 'tecnico1',
      password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // password
      name: 'Técnico Especialista',
      email: 'tecnico@fixpro.com',
      role: 'TECHNICIAN',
      avatar: 'profile-placeholder.png'
  },
  {
      id: 4,
      username: 'tecnico2',
      password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // password
      name: 'Técnico Auxiliar',
      email: 'tecnico2@fixpro.com',
      role: 'TECHNICIAN',
      avatar: 'profile-placeholder.png'
  }
];

/**
* Hashea una contraseña usando SHA-256
* @param {string} password - Contraseña en texto plano
* @returns {string} Contraseña hasheada
*/
function hashPassword(password) {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

/**
* Valida las credenciales del usuario
* @param {string} username - Nombre de usuario
* @param {string} password - Contraseña en texto plano
* @returns {object|null} Objeto usuario si es válido, null si no
*/
function validateUser(username, password) {
  const hashedPassword = hashPassword(password);
  return USERS.find(user => 
      user.username === username && 
      user.password === hashedPassword
  );
}

/**
* Obtiene el usuario actual de sessionStorage
* @returns {object|null} Objeto usuario o null si no hay sesión
*/
function getCurrentUser() {
  const userData = sessionStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
}

/**
* Redirige al dashboard según el rol del usuario
* @param {string} role - Rol del usuario (ADMIN, MANAGER, TECHNICIAN)
*/
function redirectToDashboard(role) {
  const roleConfig = ROLES_CONFIG[role] || ROLES_CONFIG.TECHNICIAN;
  window.location.href = roleConfig.dashboard;
}

/**
* Verifica la autenticación y redirige si es necesario
*/
function checkAuth() {
  const user = getCurrentUser();
  const currentPage = window.location.pathname.split('/').pop();
  
  if (!user) {
      if (currentPage !== 'login.html') {
          window.location.href = 'login.html';
      }
      return;
  }
  
  const roleConfig = ROLES_CONFIG[user.role];
  const isOnDashboard = currentPage === roleConfig.dashboard;
  
  if (!isOnDashboard && currentPage !== 'login.html') {
      redirectToDashboard(user.role);
  }
}

/**
* Cierra la sesión actual
*/
function logout() {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      sessionStorage.removeItem('currentUser');
      window.location.href = 'login.html';
  }
}

/**
* Muestra un error de autenticación
* @param {string} message - Mensaje de error
*/
function showAuthError(message) {
  const errorElement = document.getElementById('login-error');
  if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
  } else {
      // Fallback con SweetAlert si no existe el elemento
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message,
          confirmButtonColor: '#3085d6'
      });
  }
}

// API pública
window.auth = {
  /**
   * Inicia sesión con usuario y contraseña
   * @param {string} username 
   * @param {string} password 
   * @returns {boolean} True si el login fue exitoso
   */
  login: function(username, password) {
      const user = validateUser(username, password);
      
      if (user) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          redirectToDashboard(user.role);
          return true;
      }
      
      showAuthError('Usuario o contraseña incorrectos');
      return false;
  },
  
  logout: logout,
  getCurrentUser: getCurrentUser,
  checkAuth: checkAuth,
  
  /**
   * Verifica si el usuario tiene un rol específico o superior
   * @param {string} requiredRole - Rol a verificar
   * @returns {boolean} True si el usuario tiene el rol o uno superior
   */
  hasRole: function(requiredRole) {
      const user = getCurrentUser();
      if (!user) return false;
      
      const userLevel = ROLES_CONFIG[user.role]?.level || 0;
      const requiredLevel = ROLES_CONFIG[requiredRole]?.level || 0;
      
      return userLevel >= requiredLevel;
  },
  
  /**
   * Verifica si el usuario tiene exactamente este rol
   * @param {string} role - Rol exacto a verificar
   * @returns {boolean} True si el usuario tiene exactamente este rol
   */
  isExactly: function(role) {
      const user = getCurrentUser();
      return user ? user.role === role : false;
  },
  
  /**
   * Verifica si el usuario tiene alguno de los roles proporcionados
   * @param {...string} roles - Roles a verificar
   * @returns {boolean} True si el usuario tiene alguno de los roles
   */
  hasAnyRole: function(...roles) {
      const user = getCurrentUser();
      return user ? roles.includes(user.role) : false;
  },
  
  /**
   * Requiere un rol específico, redirige si no lo tiene
   * @param {string} requiredRole - Rol requerido
   * @param {string} redirectUrl - URL a redirigir si no tiene permisos
   * @returns {boolean} True si tiene el rol requerido
   */
  requireRole: function(requiredRole, redirectUrl = 'unauthorized.html') {
      if (!this.hasRole(requiredRole)) {
          showAuthError('No tienes permisos para acceder a esta sección');
          window.location.href = redirectUrl;
          return false;
      }
      return true;
  },
  
  /**
   * Obtiene la configuración del rol actual
   * @returns {object} Configuración del rol
   */
  getRoleConfig: function() {
      const user = getCurrentUser();
      return user ? ROLES_CONFIG[user.role] : null;
  }
};

// Inicializar autenticación al cargar
document.addEventListener('DOMContentLoaded', function() {
  // Configurar el formulario de login si existe en la página
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const username = document.getElementById('username').value.trim();
          const password = document.getElementById('password').value;
          
          if (!username || !password) {
              showAuthError('Usuario y contraseña son requeridos');
              return;
          }
          
          window.auth.login(username, password);
      });
  }
  
  // Verificar autenticación
  checkAuth();
});