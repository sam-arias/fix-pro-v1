// Módulo de técnico para la aplicación FixPro
// Configuración inicial
const technicianConfig = {
    apiBaseUrl: 'https://api.fixpro.com/v1',
    technicianId: null,
    currentView: null
};

// Elementos del DOM
const domElements = {
    dashboard: null,
    assignedOrdersTable: null,
    specialtiesList: null,
    notificationsList: null,
    statsCounters: {
        assigned: null,
        completed: null,
        priority: null
    }
};

// Estado de la aplicación
const appState = {
    orders: [],
    specialties: [],
    notifications: [],
    profile: null
};

/**
 * Inicialización del módulo de técnico
 */
function initTechnicianModule() {
    // Verificar autenticación y obtener ID del técnico
    checkAuth().then(() => {
        setupDOMReferences();
        setupEventListeners();
        loadInitialData();
    }).catch(error => {
        console.error('Error de autenticación:', error);
        redirectToLogin();
    });
}

/**
 * Verificar autenticación y rol
 */
async function checkAuth() {
    const token = localStorage.getItem('fixpro_token');
    if (!token) {
        throw new Error('No autenticado');
    }

    try {
        const response = await fetch(`${technicianConfig.apiBaseUrl}/auth/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Token inválido');
        }

        const data = await response.json();
        if (data.role !== 'technician') {
            throw new Error('Acceso no autorizado para este rol');
        }

        technicianConfig.technicianId = data.userId;
        return true;
    } catch (error) {
        throw error;
    }
}

/**
 * Configurar referencias a elementos DOM
 */
function setupDOMReferences() {
    domElements.dashboard = document.getElementById('technician-dashboard');
    domElements.assignedOrdersTable = document.getElementById('assigned-orders-table');
    domElements.specialtiesList = document.getElementById('specialties-list');
    domElements.notificationsList = document.getElementById('notifications-list');
    
    if (domElements.dashboard) {
        domElements.statsCounters.assigned = document.getElementById('assigned-count');
        domElements.statsCounters.completed = document.getElementById('completed-count');
        domElements.statsCounters.priority = document.getElementById('priority-count');
    }
}

/**
 * Configurar event listeners
 */
function setupEventListeners() {
    // Navegación
    document.getElementById('profile-link')?.addEventListener('click', showProfile);
    document.getElementById('specialties-link')?.addEventListener('click', showSpecialties);
    document.getElementById('assigned-orders-link')?.addEventListener('click', showAssignedOrders);
    document.getElementById('notifications-link')?.addEventListener('click', showNotifications);
    
    // Botón de logout
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    
    // Eventos delegados para órdenes
    if (domElements.assignedOrdersTable) {
        domElements.assignedOrdersTable.addEventListener('click', handleOrderActions);
    }
    
    // Formulario de especialidades
    document.getElementById('add-specialty-form')?.addEventListener('submit', addSpecialty);
}

/**
 * Cargar datos iniciales según la vista actual
 */
function loadInitialData() {
    const path = window.location.pathname;
    
    if (path.includes('dashboard')) {
        technicianConfig.currentView = 'dashboard';
        loadDashboardData();
    } else if (path.includes('specialties')) {
        technicianConfig.currentView = 'specialties';
        loadSpecialties();
    } else if (path.includes('orders')) {
        technicianConfig.currentView = 'orders';
        loadAssignedOrders();
    } else if (path.includes('notifications')) {
        technicianConfig.currentView = 'notifications';
        loadNotifications();
    } else {
        // Vista por defecto
        window.location.href = 'technician-dashboard.html';
    }
}

/**
 * Cargar datos del dashboard
 */
async function loadDashboardData() {
    try {
        const [ordersData, specialtiesData, notificationsData] = await Promise.all([
            fetchAssignedOrders(),
            fetchSpecialties(),
            fetchNotifications()
        ]);

        appState.orders = ordersData.orders;
        appState.specialties = specialtiesData.specialties;
        appState.notifications = notificationsData.notifications;

        updateDashboardStats();
        renderAssignedOrders(appState.orders);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Error al cargar los datos del dashboard');
    }
}

/**
 * Actualizar estadísticas del dashboard
 */
function updateDashboardStats() {
    if (!domElements.dashboard) return;

    const assigned = appState.orders.length;
    const completed = appState.orders.filter(o => o.status === 'Completada').length;
    const priority = appState.orders.filter(o => o.priority === 'Alta').length;

    domElements.statsCounters.assigned.textContent = assigned;
    domElements.statsCounters.completed.textContent = completed;
    domElements.statsCounters.priority.textContent = priority;
}

/**
 * Cargar órdenes asignadas
 */
async function loadAssignedOrders() {
    try {
        const data = await fetchAssignedOrders();
        appState.orders = data.orders;
        renderAssignedOrders(appState.orders);
    } catch (error) {
        console.error('Error loading assigned orders:', error);
        showError('Error al cargar las órdenes asignadas');
    }
}

/**
 * Renderizar órdenes asignadas en la tabla
 */
function renderAssignedOrders(orders) {
    if (!domElements.assignedOrdersTable) return;

    const tbody = domElements.assignedOrdersTable.querySelector('tbody');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    No tienes órdenes asignadas actualmente
                </td>
            </tr>
        `;
        return;
    }

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.device}</td>
            <td>${truncateText(order.problem, 30)}</td>
            <td>${formatDate(order.assignedDate)}</td>
            <td><span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary me-1 view-order-btn" data-id="${order.id}">
                    <i class="fas fa-eye"></i>
                </button>
                ${order.status === 'Pendiente' || order.status === 'En progreso' ? `
                <button class="btn btn-sm btn-success complete-order-btn" data-id="${order.id}">
                    <i class="fas fa-check"></i>
                </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Manejar acciones sobre órdenes
 */
function handleOrderActions(event) {
    const target = event.target.closest('button');
    if (!target) return;

    const orderId = target.getAttribute('data-id');
    
    if (target.classList.contains('view-order-btn')) {
        viewOrderDetails(orderId);
    } else if (target.classList.contains('complete-order-btn')) {
        completeOrder(orderId);
    }
}

/**
 * Ver detalles de una orden
 */
function viewOrderDetails(orderId) {
    window.location.href = `order-details.html?id=${orderId}&source=technician`;
}

/**
 * Marcar orden como completada
 */
async function completeOrder(orderId) {
    if (!confirm('¿Marcar esta orden como completada?')) return;

    try {
        const response = await fetch(`${technicianConfig.apiBaseUrl}/orders/${orderId}/complete`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('fixpro_token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al completar la orden');
        }

        // Actualizar la lista de órdenes
        await loadAssignedOrders();
        
        // Si estamos en el dashboard, actualizar estadísticas
        if (technicianConfig.currentView === 'dashboard') {
            await loadDashboardData();
        }

        showSuccess('Orden marcada como completada');
    } catch (error) {
        console.error('Error completing order:', error);
        showError('Error al completar la orden');
    }
}

/**
 * Cargar especialidades del técnico
 */
async function loadSpecialties() {
    try {
        const data = await fetchSpecialties();
        appState.specialties = data.specialties;
        renderSpecialties(appState.specialties);
    } catch (error) {
        console.error('Error loading specialties:', error);
        showError('Error al cargar las especialidades');
    }
}

/**
 * Renderizar lista de especialidades
 */
function renderSpecialties(specialties) {
    if (!domElements.specialtiesList) return;

    domElements.specialtiesList.innerHTML = '';

    if (specialties.length === 0) {
        domElements.specialtiesList.innerHTML = `
            <li class="list-group-item text-center text-muted py-4">
                No tienes especialidades registradas
            </li>
        `;
        return;
    }

    specialties.forEach(specialty => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        item.innerHTML = `
            <div>
                <h6 class="mb-1">${specialty.name}</h6>
                <small class="text-muted">${specialty.description || 'Sin descripción'}</small>
            </div>
            <span class="badge ${getLevelBadgeClass(specialty.level)}">${specialty.level}</span>
        `;
        domElements.specialtiesList.appendChild(item);
    });
}

/**
 * Agregar nueva especialidad
 */
async function addSpecialty(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const level = formData.get('level');
    const description = formData.get('description') || '';
    
    try {
        const response = await fetch(`${technicianConfig.apiBaseUrl}/technicians/${technicianConfig.technicianId}/specialties`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('fixpro_token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, level, description })
        });

        if (!response.ok) {
            throw new Error('Error al agregar especialidad');
        }

        // Recargar la lista de especialidades
        await loadSpecialties();
        form.reset();
        showSuccess('Especialidad agregada correctamente');
    } catch (error) {
        console.error('Error adding specialty:', error);
        showError('Error al agregar especialidad');
    }
}

/**
 * Cargar notificaciones
 */
async function loadNotifications() {
    try {
        const data = await fetchNotifications();
        appState.notifications = data.notifications;
        renderNotifications(appState.notifications);
    } catch (error) {
        console.error('Error loading notifications:', error);
        showError('Error al cargar las notificaciones');
    }
}

/**
 * Renderizar notificaciones
 */
function renderNotifications(notifications) {
    if (!domElements.notificationsList) return;

    domElements.notificationsList.innerHTML = '';

    if (notifications.length === 0) {
        domElements.notificationsList.innerHTML = `
            <li class="list-group-item text-center text-muted py-4">
                No tienes notificaciones nuevas
            </li>
        `;
        return;
    }

    notifications.forEach(notification => {
        const item = document.createElement('li');
        item.className = 'list-group-item notification-item';
        if (!notification.read) {
            item.classList.add('unread');
        }
        
        item.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${notification.title}</h6>
                <small>${formatTimeAgo(notification.date)}</small>
            </div>
            <p class="mb-1">${notification.message}</p>
            ${notification.link ? `
            <small><a href="${notification.link}" class="text-primary">Ver detalles</a></small>
            ` : ''}
        `;
        
        item.addEventListener('click', () => markNotificationAsRead(notification.id));
        domElements.notificationsList.appendChild(item);
    });
}

/**
 * Marcar notificación como leída
 */
async function markNotificationAsRead(notificationId) {
    try {
        await fetch(`${technicianConfig.apiBaseUrl}/notifications/${notificationId}/read`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('fixpro_token')}`
            }
        });
        
        // Recargar notificaciones
        await loadNotifications();
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
}

/**
 * Funciones de ayuda para API
 */
async function fetchAssignedOrders() {
    const response = await fetch(`${technicianConfig.apiBaseUrl}/technicians/${technicianConfig.technicianId}/orders`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('fixpro_token')}`
        }
    });
    return await response.json();
}

async function fetchSpecialties() {
    const response = await fetch(`${technicianConfig.apiBaseUrl}/technicians/${technicianConfig.technicianId}/specialties`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('fixpro_token')}`
        }
    });
    return await response.json();
}

async function fetchNotifications() {
    const response = await fetch(`${technicianConfig.apiBaseUrl}/notifications`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('fixpro_token')}`
        }
    });
    return await response.json();
}

/**
 * Funciones de navegación
 */
function showProfile() {
    window.location.href = 'profile.html?role=technician';
}

function showSpecialties() {
    window.location.href = 'technician-specialties.html';
}

function showAssignedOrders() {
    window.location.href = 'technician-orders.html';
}

function showNotifications() {
    window.location.href = 'notifications.html?role=technician';
}

function logout() {
    localStorage.removeItem('fixpro_token');
    redirectToLogin();
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

/**
 * Funciones de utilidad
 */
function getStatusBadgeClass(status) {
    const statusClasses = {
        'Pendiente': 'bg-info',
        'En progreso': 'bg-warning',
        'Completada': 'bg-success',
        'Cancelada': 'bg-danger',
        'Rechazada': 'bg-secondary'
    };
    return statusClasses[status] || 'bg-light text-dark';
}

function getLevelBadgeClass(level) {
    const levelClasses = {
        'Básico': 'bg-secondary',
        'Intermedio': 'bg-primary',
        'Avanzado': 'bg-success',
        'Experto': 'bg-dark'
    };
    return levelClasses[level] || 'bg-light text-dark';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function formatTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Hace unos segundos';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
    return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function showSuccess(message) {
    // Implementar toast o alerta de éxito
    alert(message); // Reemplazar con implementación real
}

function showError(message) {
    // Implementar toast o alerta de error
    alert(message); // Reemplazar con implementación real
}

/**
 * Inicializar módulo cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', initTechnicianModule);