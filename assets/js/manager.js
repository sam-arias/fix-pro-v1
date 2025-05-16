/**
 * Lógica específica del Dashboard de Gerente
 * Versión 1.0
 */

// Datos del dashboard
const managerData = {
  stats: {
    sales: 0,
    orders: 0,
    completed: 0,
    pending: 0
  },
  recentOrders: [],
  salesByCategory: []
};
/**
 * Muestra el dashboard principal del gerente
 */



// INICIALIZACIÓN
// =============================

document.addEventListener('DOMContentLoaded', function() {
  // Verificar rol de usuario (en una app real esto vendría del sistema de autenticación)
  const userRole = localStorage.getItem('userRole') || 'manager';
  
  if (userRole === 'manager') {
    // Cargar dashboard por defecto
    showDashboard();
    
    // Configurar menú activo
    document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
    });
  } else {
    window.location.href = 'unauthorized.html';
  }
});
