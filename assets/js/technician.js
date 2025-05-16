// ==============================================
// TÉCNICO - FUNCIONES ESPECÍFICAS
// ==============================================

// Variables globales para el técnico
let technicianData = {
    id: null,
    name: "",
    email: "",
    specialties: [],
    status: "",
    assignedOrders: [],
    stats: {
        assigned: 0,
        completed: 0,
        completionRate: 0
    }
};




// =============================
// FUNCIONES DE UTILIDAD
// =============================

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function formatTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de una hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} días`;
}

function formatNotificationType(type) {
    const types = {
      'assignment': 'Asignación',
      'inventory': 'Inventario',
      'reminder': 'Recordatorio',
      'system': 'Sistema'
    };
    return types[type] || type;
}

function getStatusBadgeClass(status) {
    const statusClasses = {
      'Pendiente': 'bg-secondary',
      'En progreso': 'bg-warning',
      'Completada': 'bg-success',
      'Cancelada': 'bg-danger'
    };
    return statusClasses[status] || 'bg-light text-dark';
}

function showSuccess(message) {
    // Implementar toast de éxito
    alert(message); // Temporal, reemplazar con implementación real
}

// =============================
// INICIALIZACIÓN
// =============================

document.addEventListener('DOMContentLoaded', function() {
    // Verificar rol de usuario (en una app real esto vendría del sistema de autenticación)
    const userRole = localStorage.getItem('userRole') || 'technician';
    
    if (userRole === 'technician') {
      // Cargar dashboard por defecto
      loadTechnicianDashboard();
      
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