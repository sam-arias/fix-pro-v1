// ==============================================
// ADMINISTRADOR - FUNCIONES ESPECÍFICAS
// ==============================================

// Variables globales para el admin
let adminData = {
  orders: 0,
  income: 0,
  lowStock: 0,
  lateOrders: 0,
  technicians: [],
  parts: []
};
// ======================
// FUNCIONES DEL DASHBOARD
// ======================



// =====================
// INICIALIZACIÓN
// =====================

document.addEventListener('DOMContentLoaded', function() {
  // Verificar rol de usuario (en una app real esto vendría del sistema de autenticación)
  const userRole = localStorage.getItem('userRole') || 'admin';
  
  if (userRole === 'admin') {
    // Cargar dashboard por defecto
    loadAdminDashboard();
    
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