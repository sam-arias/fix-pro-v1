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
function showDashboard() {
  const content = document.getElementById('main-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card stat-card bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">Ventas</h5>
            <h2 class="card-stat">$${managerData.stats.sales.toLocaleString()}</h2>
            <p class="card-text">Este mes</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Órdenes</h5>
            <h2 class="card-stat">${managerData.stats.orders}</h2>
            <p class="card-text">Totales</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card bg-warning text-white">
          <div class="card-body">
            <h5 class="card-title">Completadas</h5>
            <h2 class="card-stat">${managerData.stats.completed}</h2>
            <p class="card-text">Órdenes</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">Pendientes</h5>
            <h2 class="card-stat">${managerData.stats.pending}</h2>
            <p class="card-text">Órdenes</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>Órdenes recientes</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Orden #</th>
                    <th>Cliente</th>
                    <th>Dispositivo</th>
                    <th>Estado</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${managerData.recentOrders.map(order => `
                    <tr>
                      <td>${order.id}</td>
                      <td>${order.client}</td>
                      <td>${order.device}</td>
                      <td>
                        <span class="badge ${
                          order.status === 'Completada' ? 'bg-success' : 
                          order.status === 'En progreso' ? 'bg-warning' : 'bg-info'
                        }">${order.status}</span>
                      </td>
                      <td>$${order.total}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>Ventas por categoría</h5>
          </div>
          <div class="card-body">
            <canvas id="salesChart" height="250"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Inicializar gráfico
  initSalesChart();
}

/**
 * Inicializa el gráfico de ventas
 */
function initSalesChart() {
  const ctx = document.getElementById('salesChart').getContext('2d');
  const labels = managerData.salesByCategory.map(item => item.category);
  const data = managerData.salesByCategory.map(item => item.sales);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Ventas por categoría ($)',
        data: data,
        backgroundColor: [
          'rgba(78, 115, 223, 0.8)',
          'rgba(28, 200, 138, 0.8)',
          'rgba(231, 74, 59, 0.8)'
        ],
        borderColor: [
          'rgba(78, 115, 223, 1)',
          'rgba(28, 200, 138, 1)',
          'rgba(231, 74, 59, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
// =============================
// GESTIÓN DE ÓRDENES
// =============================

// Datos de técnicos disponibles
const adminData = {
  technicians: []
};

// Datos iniciales de órdenes
let ordersData = [];

// Mostrar todas las órdenes
function showInterventionOrders(filter = 'all') {
  const mainContent = document.getElementById('main-content');
  const filteredOrders = filter === 'all' ? ordersData : ordersData.filter(order => 
    order.status.toLowerCase().includes(filter.toLowerCase())
  );
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Gestión de Órdenes</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button class="btn btn-sm btn-outline-secondary" onclick="showInterventionOrders('all')">Todas</button>
          <button class="btn btn-sm btn-outline-primary" onclick="showInterventionOrders('pendiente')">Pendientes</button>
          <button class="btn btn-sm btn-outline-warning" onclick="showInterventionOrders('progreso')">En progreso</button>
          <button class="btn btn-sm btn-outline-success" onclick="showInterventionOrders('completada')">Completadas</button>
        </div>
        <button class="btn btn-sm btn-primary" onclick="showOrderForm()">
          <i class="fas fa-plus me-1"></i> Nueva orden
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>Orden #</th>
            <th>Cliente</th>
            <th>Dispositivo</th>
            <th>Técnico</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${filteredOrders.map(order => `
            <tr>
              <td>${order.id}</td>
              <td>${order.client}</td>
              <td>${order.device}</td>
              <td>${order.technician || 'Sin asignar'}</td>
              <td>${order.date}</td>
              <td>
                <span class="badge ${getStatusBadgeClass(order.status)}">
                  ${order.status}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-primary me-1" onclick="showOrderDetails(${order.id})">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning me-1" onclick="editOrder(${order.id})">
                  <i class="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// Clases para los badges de estado
function getStatusBadgeClass(status) {
  switch(status.toLowerCase()) {
    case 'completada': return 'bg-success';
    case 'en progreso': return 'bg-warning';
    case 'pendiente': return 'bg-info';
    default: return 'bg-secondary';
  }
}

// Mostrar formulario para nueva/editar orden
function showOrderForm(order = null) {
  const isEdit = order !== null;
  const mainContent = document.getElementById('main-content');
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">${isEdit ? 'Editar' : 'Nueva'} Orden</h1>
    </div>
    
    <div class="card">
      <div class="card-body">
        <form id="orderForm" onsubmit="handleOrderForm(event, ${isEdit ? order.id : 'null'})">
          <div class="row">
            <div class="col-md-6">
              <h5 class="mb-3"><i class="fas fa-user me-2"></i>Datos del Cliente</h5>
              <div class="mb-3">
                <label for="clientName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="clientName" value="${isEdit ? order.client : ''}" required>
              </div>
              <div class="mb-3">
                <label for="clientName" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="clientName" value="${isEdit ? order.client : ''}" required>
              </div>
              <div class="mb-3">
                <label for="clientPhone" class="form-label">Teléfono</label>
                <input type="tel" class="form-control" id="clientPhone" value="${isEdit ? order.phone || '' : ''}" required>
              </div>
              <div class="mb-3">
                <label for="clientAddress" class="form-label">Dirección</label>
                <input type="tel" class="form-control" id="clientaddress" value="${isEdit ? order.Addres || '' : ''}" required>
              </div>
               
            </div>
            <div class="col-md-6">
              <h5 class="mb-3"><i class="fas fa-laptop me-2"></i>Datos del Dispositivo</h5>
              <div class="mb-3">
                <label for="deviceType" class="form-label">Tipo de dispositivo</label>
                <select class="form-select" id="deviceType" required>
                  <option value="">Seleccionar...</option>
                  <option value="Smartphone" ${isEdit && order.deviceType === 'Smartphone' ? 'selected' : ''}>Smartphone</option>
                  <option value="Tablet" ${isEdit && order.deviceType === 'Tablet' ? 'selected' : ''}>Tablet</option>
                  <option value="Laptop" ${isEdit && order.deviceType === 'Laptop' ? 'selected' : ''}>Laptop</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="deviceModel" class="form-label">Modelo</label>
                <input type="text" class="form-control" id="deviceModel" value="${isEdit ? order.device : ''}" required>
              </div>
              <div class="mb-3">
                <label for="deviceMarca" class="form-label">Marca</label>
                <input type="text" class="form-control" id="deviceMarca" value="${isEdit ? order.device : ''}" required>
              </div>
              <div class="mb-3">
                <label for="deviceSerial" class="form-label">Serial</label>
                <input type="text" class="form-control" id="deviceSerial" value="${isEdit ? order.device : ''}" required>
              </div>
            </div>
          </div>
          
          <div class="mb-3">
            <label for="problemDescription" class="form-label">Descripción del problema</label>
            <textarea 
              class="form-control auto-expand" 
              id="problemDescription" 
              rows="1" 
              required
              style="min-height: 100px; overflow-y: hidden;"
              oninput="this.style.height = 'auto'; this.style.height = (this.scrollHeight) + 'px'"
            >${isEdit ? order.problem : ''}</textarea>
          </div>
          
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="technician" class="form-label">Técnico asignado</label>
                <select class="form-select" id="technician">
                  <option value="">Sin asignar</option>
                  ${adminData.technicians.map(tech => `
                    <option value="${tech.id}" ${isEdit && order.technicianId === tech.id ? 'selected' : ''}>
                      ${tech.name}
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="estimatedDate" class="form-label">Fecha estimada</label>
                <input type="date" class="form-control" id="estimatedDate" value="${isEdit ? order.estimatedDate || '' : ''}">
              </div>
            </div>
          </div>
          
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
            <button type="button" class="btn btn-secondary me-md-2" onclick="showInterventionOrders()">Cancelar</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Actualizar' : 'Guardar'} Orden</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  // Establecer fecha mínima como hoy
  document.getElementById('estimatedDate').min = new Date().toISOString().split('T')[0];
}

// Manejar envío del formulario
function handleOrderForm(event, orderId = null) {
  event.preventDefault();
  
  const selectedTechId = document.getElementById('technician').value;
  const selectedTech = adminData.technicians.find(t => t.id == selectedTechId);
  
  const newOrder = {
    id: orderId || Math.max(...ordersData.map(o => o.id), 0) + 1,
    client: document.getElementById('clientName').value,
    phone: document.getElementById('clientPhone').value,
    deviceType: document.getElementById('deviceType').value,
    device: document.getElementById('deviceModel').value,
    problem: document.getElementById('problemDescription').value,
    technicianId: selectedTechId,
    technician: selectedTech ? selectedTech.name : null,
    priority: document.getElementById('priority').value,
    estimatedDate: document.getElementById('estimatedDate').value,
    status: 'Pendiente',
    date: new Date().toLocaleDateString('es-ES')
  };
  
  if (orderId) {
    const index = ordersData.findIndex(o => o.id === orderId);
    if (index !== -1) ordersData[index] = newOrder;
  } else {
    ordersData.unshift(newOrder);
  }
  
  showInterventionOrders();
}

// Mostrar detalles de una orden
function showOrderDetails(orderId) {
  const order = ordersData.find(o => o.id === orderId);
  if (!order) return;
  
  const mainContent = document.getElementById('main-content');
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Detalles de Orden #${order.id}</h1>
      <button class="btn btn-sm btn-outline-secondary" onclick="showInterventionOrders()">
        <i class="fas fa-arrow-left me-1"></i> Volver
      </button>
    </div>
    
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5 class="mb-3"><i class="fas fa-user me-2"></i>Datos del Cliente</h5>
            <p><strong>Nombre:</strong> ${order.client}</p>
            <p><strong>Teléfono:</strong> ${order.phone || 'No especificado'}</p>
          </div>
          <div class="col-md-6">
            <h5 class="mb-3"><i class="fas fa-laptop me-2"></i>Datos del Dispositivo</h5>
            <p><strong>Tipo:</strong> ${order.deviceType}</p>
            <p><strong>Modelo:</strong> ${order.device}</p>
          </div>
        </div>
        
        <hr>
        
        <h5 class="mb-3"><i class="fas fa-exclamation-circle me-2"></i>Problema Reportado</h5>
        <p>${order.problem}</p>
        
        <div class="row mt-4">
          <div class="col-md-4">
            <p><strong>Técnico Asignado:</strong> ${order.technician || 'Sin asignar'}</p>
          </div>
          <div class="col-md-4">
            <p><strong>Prioridad:</strong> 
              <span class="badge ${order.priority === 'Alta' ? 'bg-danger' : 'bg-primary'}">
                ${order.priority}
              </span>
            </p>
          </div>
          <div class="col-md-4">
            <p><strong>Fecha Estimada:</strong> ${order.estimatedDate || 'No especificada'}</p>
          </div>
        </div>
        
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button class="btn btn-warning me-md-2" onclick="editOrder(${order.id})">
            <i class="fas fa-edit me-1"></i> Editar
          </button>
          <button class="btn btn-success" onclick="completeOrder(${order.id})">
            <i class="fas fa-check me-1"></i> Marcar como Completada
          </button>
        </div>
      </div>
    </div>
  `;
}
// =============================
// MÓDULO DE VENTAS - SIN GRÁFICAS
// =============================

const salesData = {
  monthlySummary: [],
  byCategory: [],
  recentTransactions: []
};

// Función para formatear moneda
function formatCurrency(amount) {
  return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Función para formatear fechas
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Función principal para mostrar el dashboard de ventas
function showSales() {
  const content = document.getElementById('main-content');
  if (!content) return;

  content.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Ventas</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" onclick="exportSalesReport()">
            <i class="fas fa-file-pdf me-1"></i> Exportar
          </button>
        </div>
      </div>
    </div>

    <!-- Tarjetas de resumen -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card stat-card bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">Órdenes Totales</h5>
            <h2 class="card-stat">${salesData.monthlySummary.reduce((sum, month) => sum + month.orders, 0)}</h2>
            <p class="card-text">Últimos 6 meses</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Órdenes Completas</h5>
            <h2 class="card-stat">${salesData.monthlySummary.reduce((sum, month) => sum + (month.completedOrders || 0), 0)}</h2>
            <p class="card-text">Últimos 6 meses</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card bg-warning text-white">
          <div class="card-body">
            <h5 class="card-title">Órdenes Pendientes</h5>
            <h2 class="card-stat">${salesData.monthlySummary.reduce((sum, month) => sum + (month.pendingOrders || 0), 0)}</h2>
            <p class="card-text">Últimos 6 meses</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">Órdenes en Proceso</h5>
            <h2 class="card-stat">${salesData.monthlySummary.reduce((sum, month) => sum + (month.inProgressOrders || 0), 0)}</h2>
            <p class="card-text">Últimos 6 meses</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Transacciones recientes -->
    <div class="card">
      <div class="card-header">
        <h5>Transacciones Recientes</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Transacción #</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Método</th>
              </tr>
            </thead>
            <tbody>
              ${salesData.recentTransactions.map(transaction => `
                <tr>
                  <td>${transaction.id}</td>
                  <td>${formatDate(transaction.date)}</td>
                  <td>${transaction.client}</td>
                  <td>${formatCurrency(transaction.amount)}</td>
                  <td>
                    <span class="badge ${
                      transaction.status === 'Completada' ? 'bg-success' : 
                      transaction.status === 'Pendiente' ? 'bg-warning' : 'bg-danger'
                    }">${transaction.status}</span>
                  </td>
                  <td>${transaction.method}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Exportar reporte de ventas
function exportSalesReport() {
  alert('Esta función generaría un reporte PDF en una implementación real.');
}


// =============================
// PERFIL DE USUARIO (GERENTE)
// =============================

// Datos del gerente
let currentUser = {
  id: null,
  name: "",
  lastName: "",
  email: "",
  phone: "",
  avatar: "assets/img/profile-placeholder.png",
  role: "",
  department: "",
  lastLogin: "",
  notifications: false,
  darkMode: false,
};

// Función para mostrar el perfil del gerente
function showProfile() {
  const mainContent = document.getElementById('main-content'); // Corregido el ID
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Mi Perfil</h1>
    </div>

    <div class="row">
      <!-- Sección de Avatar -->
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body text-center">
            <img src="${currentUser.avatar}" 
                 alt="Avatar" 
                 class="rounded-circle mb-3 profile-avatar" 
                 width="150" 
                 height="150"
                 id="profileAvatarImg">
            <h4>${currentUser.name} ${currentUser.lastName}</h4>
            <p class="text-muted mb-0">${currentUser.role}</p>
            <p class="text-muted">${currentUser.email}</p>
            
            <input type="file" id="avatarUpload" style="display: none;" accept="image/*" onchange="updateAvatar(event)">
            
            <div class="mt-3">
              <button class="btn btn-sm btn-outline-danger" onclick="showPasswordModal()">
                <i class="fas fa-key me-1"></i> Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
        
        <div class="card mt-3">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-info-circle me-1"></i>Información del Gerente</h5>
            <ul class="list-group list-group-flush small">
              <li class="list-group-item d-flex justify-content-between">
                <span>Departamento:</span>
                <span class="text-muted">${currentUser.department}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Estado:</span>
                <span class="badge bg-success">Activo</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Notificaciones:</span>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" 
                         id="notificationToggle" 
                         ${currentUser.notifications ? 'checked' : ''}
                         onchange="toggleNotifications()">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Formulario de Edición -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-user-edit me-2"></i>Editar Información</h5>
            <form id="profileForm">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="inputFirstName" class="form-label">Nombre</label>
                  <input type="text" class="form-control" id="inputFirstName" value="${currentUser.name}" required>
                </div>
                <div class="col-md-6">
                  <label for="inputLastName" class="form-label">Apellidos</label>
                  <input type="text" class="form-control" id="inputLastName" value="${currentUser.lastName}" required>
                </div>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="inputEmail" class="form-label">Correo electrónico</label>
                  <input type="email" class="form-control" id="inputEmail" value="${currentUser.email}" required>
                </div>
                <div class="col-md-6">
                  <label for="inputPhone" class="form-label">Teléfono</label>
                  <input type="tel" class="form-control" id="inputPhone" value="${currentUser.phone}">
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="techDirección" class="form-label">Dirección</label>
                    <input type="Dirección" class="form-control" id="inputDirección" value="${currentUser?.Addres || ''}" required>
                  </div>
                </div>
              </div>              
              
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" onclick="showDashboard()">
                  Cancelar
                </button>
                <button type="button" class="btn btn-primary" onclick="updateProfile()">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal para Cambio de Contraseña -->
    <div class="modal fade" id="passwordModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title"><i class="fas fa-key me-2"></i>Cambiar Contraseña</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="passwordForm">
              <div class="mb-3">
                <label for="currentPassword" class="form-label">Contraseña Actual</label>
                <input type="password" class="form-control" id="currentPassword" required>
              </div>
              <div class="mb-3">
                <label for="newPassword" class="form-label">Nueva Contraseña</label>
                <input type="password" class="form-control" id="newPassword" required>
                <div class="form-text">Mínimo 8 caracteres, incluir números y letras</div>
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
                <input type="password" class="form-control" id="confirmPassword" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="changePassword()">Cambiar Contraseña</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Actualizar el nombre en el header
  document.getElementById('username-display').textContent = currentUser.name;
}

// Función para actualizar el avatar
function updateAvatar(event) {
const file = event.target.files[0];
if (file && file.type.match('image.*')) {
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('profileAvatarImg').src = e.target.result;
        currentUser.avatar = e.target.result;
        // Aquí normalmente enviarías la imagen al servidor
    };
    reader.readAsDataURL(file);
} else {
    alert('Por favor selecciona un archivo de imagen válido');
}
}

// Función para mostrar el modal de contraseña
function showPasswordModal() {
const passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
passwordModal.show();
}

// Función para cambiar contraseña
function changePassword() {
const currentPass = document.getElementById('currentPassword').value;
const newPass = document.getElementById('newPassword').value;
const confirmPass = document.getElementById('confirmPassword').value;

// Validaciones básicas
if (newPass !== confirmPass) {
    alert('Las contraseñas no coinciden');
    return;
}

if (newPass.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres');
    return;
}

// Aquí iría la lógica para enviar al servidor
alert('Contraseña cambiada exitosamente');
const passwordModal = bootstrap.Modal.getInstance(document.getElementById('passwordModal'));
passwordModal.hide();
}

// Función para actualizar el perfil
function updateProfile() {
currentUser = {
    ...currentUser,
    name: document.getElementById('inputFirstName').value,
    lastName: document.getElementById('inputLastName').value,
    email: document.getElementById('inputEmail').value,
    phone: document.getElementById('inputPhone').value,
    bio: document.getElementById('inputBio').value
};

alert('Perfil actualizado correctamente');
showProfile(); // Recargar la vista
}

// Función para toggle de notificaciones
function toggleNotifications() {
currentUser.notifications = document.getElementById('notificationToggle').checked;
// Aquí podrías guardar este cambio en el servidor
}