/**
 * Lógica específica del Dashboard de Gerente
 * Versión 1.0
 */

// Datos de ejemplo para el dashboard
const managerData = {
  stats: {
    sales: 12500,
    orders: 156,
    completed: 120,
    pending: 36
  },
  recentOrders: [
    { id: 1245, client: 'María González', device: 'iPhone 12', status: 'En progreso', total: 120 },
    { id: 1244, client: 'Carlos Mendoza', device: 'Samsung S21', status: 'Completada', total: 80 },
    { id: 1243, client: 'Laura Jiménez', device: 'iPad Pro', status: 'Pendiente', total: 150 }
  ],
  salesByCategory: [
    { category: 'Pantallas', sales: 6500, count: 45 },
    { category: 'Baterías', sales: 3200, count: 32 },
    { category: 'Software', sales: 2800, count: 28 }
  ]
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
  technicians: [
    { id: 1, name: "Juan Pérez" },
    { id: 2, name: "María García" },
    { id: 3, name: "Carlos López" }
  ]
};

// Datos iniciales de órdenes
let ordersData = [
  {
    id: 1245,
    client: "María González",
    device: "iPhone 12",
    problem: "Pantalla rota",
    status: "En progreso",
    date: "15/05/2023",
    technician: "Juan Pérez",
    priority: "Alta"
  },
  {
    id: 1244,
    client: "Carlos Mendoza",
    device: "Samsung S21",
    problem: "Batería defectuosa",
    status: "Completada",
    date: "14/05/2023",
    technician: "María García",
    priority: "Normal"
  }
];

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
            <th>Problema</th>
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
              <td>${order.problem}</td>
              <td>${order.technician || 'Sin asignar'}</td>
              <td>${order.date}</td>
              <td>
                <span class="badge ${getStatusBadgeClass(order.status)}">
                  ${order.status}
                </span>
                ${order.priority === 'Alta' ? '<span class="badge bg-danger ms-1">Urgente</span>' : ''}
              </td>
              <td>
                <button class="btn btn-sm btn-primary me-1" onclick="showOrderDetails(${order.id})">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning me-1" onclick="editOrder(${order.id})">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-success" onclick="completeOrder(${order.id})">
                  <i class="fas fa-check"></i>
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
                <label for="clientName" class="form-label">Nombre completo</label>
                <input type="text" class="form-control" id="clientName" value="${isEdit ? order.client : ''}" required>
              </div>
              <div class="mb-3">
                <label for="clientPhone" class="form-label">Teléfono</label>
                <input type="tel" class="form-control" id="clientPhone" value="${isEdit ? order.phone || '' : ''}" required>
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
            </div>
          </div>
          
          <div class="mb-3">
            <label for="problemDescription" class="form-label">Descripción del problema</label>
            <textarea class="form-control" id="problemDescription" rows="3" required>${isEdit ? order.problem : ''}</textarea>
          </div>
          
          <div class="row">
            <div class="col-md-4">
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
            <div class="col-md-4">
              <div class="mb-3">
                <label for="priority" class="form-label">Prioridad</label>
                <select class="form-select" id="priority">
                  <option value="Normal" ${isEdit && order.priority === 'Normal' ? 'selected' : ''}>Normal</option>
                  <option value="Alta" ${isEdit && order.priority === 'Alta' ? 'selected' : ''}>Alta</option>
                  <option value="Urgente" ${isEdit && order.priority === 'Urgente' ? 'selected' : ''}>Urgente</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
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
// MÓDULO DE TECNICOS
// =============================

// Editar una orden existente
function editOrder(orderId) {
  const order = ordersData.find(o => o.id === orderId);
  if (order) showOrderForm(order);
}

// Marcar orden como completada
function completeOrder(orderId) {
  if (confirm('¿Marcar esta orden como completada?')) {
    const index = ordersData.findIndex(o => o.id === orderId);
    if (index !== -1) {
      ordersData[index].status = 'Completada';
      showInterventionOrders();
    }
  }
}

// Datos de ejemplo para técnicos
let techniciansData = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@fixpro.com",
    phone: "555-1234",
    specialty: "Smartphones",
    status: "Activo",
    hireDate: "15/03/2022",
    ordersCompleted: 42
  },
  {
    id: 2,
    name: "María García",
    email: "maria.garcia@fixpro.com",
    phone: "555-5678",
    specialty: "Tablets",
    status: "Activo",
    hireDate: "10/05/2021",
    ordersCompleted: 68
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos.lopez@fixpro.com",
    phone: "555-9012",
    specialty: "Laptops",
    status: "Inactivo",
    hireDate: "22/01/2023",
    ordersCompleted: 15
  }
];

// Mostrar lista de técnicos
function showTechnicians() {
  const content = document.getElementById('main-content');
  
  content.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Gestión de Técnicos</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button class="btn btn-sm btn-outline-secondary" onclick="exportTechniciansToExcel()">
            <i class="fas fa-file-excel me-1"></i> Exportar
          </button>
        </div>
        <button class="btn btn-sm btn-primary" onclick="showTechnicianForm()">
          <i class="fas fa-plus me-1"></i> Nuevo Técnico
        </button>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" id="technicianSearch" class="form-control" placeholder="Buscar técnico..." 
                onkeyup="searchTechnicians()">
          <button class="btn btn-outline-secondary" type="button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <select class="form-select" id="technicianStatusFilter" onchange="filterTechnicians()">
          <option value="">Todos los estados</option>
          <option value="Activo">Activos</option>
          <option value="Inactivo">Inactivos</option>
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Órdenes Completadas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${techniciansData.map(tech => `
            <tr>
              <td>${tech.id}</td>
              <td>${tech.name}</td>
              <td>${tech.specialty}</td>
              <td>${tech.phone}</td>
              <td>
                <span class="badge ${tech.status === 'Activo' ? 'bg-success' : 'bg-secondary'}">
                  ${tech.status}
                </span>
              </td>
              <td>${tech.ordersCompleted}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editTechnician(${tech.id})">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="confirmDeleteTechnician(${tech.id}, '${tech.name}')">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Modal para agregar/editar técnico -->
    <div class="modal fade" id="technicianModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="technicianModalTitle">Nuevo Técnico</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="technicianForm">
              <input type="hidden" id="technicianId">
              <div class="mb-3">
                <label for="technicianName" class="form-label">Nombre Completo*</label>
                <input type="text" class="form-control" id="technicianName" required>
              </div>
              <div class="mb-3">
                <label for="technicianEmail" class="form-label">Correo Electrónico*</label>
                <input type="email" class="form-control" id="technicianEmail" required>
              </div>
              <div class="mb-3">
                <label for="technicianPhone" class="form-label">Teléfono</label>
                <input type="tel" class="form-control" id="technicianPhone">
              </div>
              <div class="mb-3">
                <label for="technicianSpecialty" class="form-label">Especialidad*</label>
                <select class="form-select" id="technicianSpecialty" required>
                  <option value="">Seleccionar...</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Tablets">Tablets</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Software">Software</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="technicianStatus" class="form-label">Estado*</label>
                <select class="form-select" id="technicianStatus" required>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="technicianHireDate" class="form-label">Fecha de Contratación</label>
                <input type="date" class="form-control" id="technicianHireDate">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="saveTechnician()">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para confirmar eliminación -->
    <div class="modal fade" id="confirmDeleteTechModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirmar Eliminación</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro que deseas eliminar este técnico?</p>
            <p class="fw-bold" id="techToDeleteName"></p>
            <p class="text-muted">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteTechBtn">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Mostrar formulario para nuevo técnico
function showTechnicianForm(technician = null) {
  const isEdit = technician !== null;
  const modal = new bootstrap.Modal(document.getElementById('technicianModal'));
  
  document.getElementById('technicianModalTitle').textContent = isEdit ? 'Editar Técnico' : 'Nuevo Técnico';
  document.getElementById('technicianId').value = isEdit ? technician.id : '';
  document.getElementById('technicianName').value = isEdit ? technician.name : '';
  document.getElementById('technicianEmail').value = isEdit ? technician.email : '';
  document.getElementById('technicianPhone').value = isEdit ? technician.phone : '';
  document.getElementById('technicianSpecialty').value = isEdit ? technician.specialty : '';
  document.getElementById('technicianStatus').value = isEdit ? technician.status : 'Activo';
  document.getElementById('technicianHireDate').value = isEdit ? formatDateForInput(technician.hireDate) : '';
  
  modal.show();
}

// Formatear fecha para input date
function formatDateForInput(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('/');
  return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
}

// Guardar técnico (nuevo o editado)
function saveTechnician() {
  const form = document.getElementById('technicianForm');
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  const techId = document.getElementById('technicianId').value;
  const techData = {
    id: techId ? parseInt(techId) : generateTechId(),
    name: document.getElementById('technicianName').value,
    email: document.getElementById('technicianEmail').value,
    phone: document.getElementById('technicianPhone').value,
    specialty: document.getElementById('technicianSpecialty').value,
    status: document.getElementById('technicianStatus').value,
    hireDate: document.getElementById('technicianHireDate').value 
      ? new Date(document.getElementById('technicianHireDate').value).toLocaleDateString('es-ES')
      : new Date().toLocaleDateString('es-ES'),
    ordersCompleted: techId 
      ? techniciansData.find(t => t.id === parseInt(techId)).ordersCompleted 
      : 0
  };

  if (techId) {
    // Editar técnico existente
    const index = techniciansData.findIndex(t => t.id === parseInt(techId));
    if (index !== -1) {
      techniciansData[index] = techData;
    }
  } else {
    // Agregar nuevo técnico
    techniciansData.push(techData);
  }

  // Cerrar modal y actualizar tabla
  bootstrap.Modal.getInstance(document.getElementById('technicianModal')).hide();
  showTechnicians();
  
  // Mostrar notificación de éxito
  showAlert('¡Éxito!', `Técnico ${techId ? 'actualizado' : 'agregado'} correctamente.`, 'success');
}

// Generar nuevo ID para técnico
function generateTechId() {
  const maxId = Math.max(...techniciansData.map(t => t.id));
  return maxId + 1;
}

// Editar técnico
function editTechnician(id) {
  const technician = techniciansData.find(t => t.id === id);
  if (technician) {
    showTechnicianForm(technician);
  }
}

// Confirmar eliminación de técnico
function confirmDeleteTechnician(id, name) {
  const modal = new bootstrap.Modal(document.getElementById('confirmDeleteTechModal'));
  document.getElementById('techToDeleteName').textContent = name;
  document.getElementById('confirmDeleteTechBtn').onclick = () => deleteTechnician(id);
  modal.show();
}

// Eliminar técnico
function deleteTechnician(id) {
  const index = techniciansData.findIndex(t => t.id === id);
  if (index !== -1) {
    techniciansData.splice(index, 1);
    showTechnicians();
    bootstrap.Modal.getInstance(document.getElementById('confirmDeleteTechModal')).hide();
    showAlert('¡Éxito!', 'El técnico ha sido eliminado.', 'success');
  }
}

// Filtrar técnicos
function filterTechnicians() {
  const statusFilter = document.getElementById('technicianStatusFilter').value;
  const searchTerm = document.getElementById('technicianSearch').value.toLowerCase();

  let filteredData = techniciansData;

  if (statusFilter) {
    filteredData = filteredData.filter(t => t.status === statusFilter);
  }

  if (searchTerm) {
    filteredData = filteredData.filter(t => 
      t.name.toLowerCase().includes(searchTerm) || 
      t.specialty.toLowerCase().includes(searchTerm)
    );
  }

  // Actualizar la tabla con los datos filtrados
  const tbody = document.querySelector('#main-content table tbody');
  tbody.innerHTML = filteredData.map(tech => `
    <tr>
      <td>${tech.id}</td>
      <td>${tech.name}</td>
      <td>${tech.specialty}</td>
      <td>${tech.phone}</td>
      <td>
        <span class="badge ${tech.status === 'Activo' ? 'bg-success' : 'bg-secondary'}">
          ${tech.status}
        </span>
      </td>
      <td>${tech.ordersCompleted}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editTechnician(${tech.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmDeleteTechnician(${tech.id}, '${tech.name}')">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Buscar técnicos
function searchTechnicians() {
  filterTechnicians();
}

// Exportar a Excel (simulado)
function exportTechniciansToExcel() {
  showAlert('Exportar a Excel', 'Esta función exportaría los datos a Excel en una implementación real.', 'info');
}

// =============================
// MÓDULO DE INVENTARIO
// =============================

// Datos de ejemplo para el inventario
const inventoryData = [
  { id: 1001, name: 'Pantalla iPhone 12', category: 'Pantallas', stock: 15, minStock: 5, price: 89.99, location: 'A1-02', supplier: 'Apple Parts' },
  { id: 1002, name: 'Batería Samsung S21', category: 'Baterías', stock: 8, minStock: 10, price: 45.50, location: 'B2-05', supplier: 'Samsung OEM' },
  { id: 1003, name: 'Herramienta iFixit Pro', category: 'Herramientas', stock: 12, minStock: 3, price: 129.99, location: 'C3-01', supplier: 'iFixit' },
  { id: 1004, name: 'Cargador USB-C', category: 'Accesorios', stock: 25, minStock: 15, price: 19.99, location: 'A1-08', supplier: 'Anker' },
  { id: 1005, name: 'Software Diagnóstico', category: 'Software', stock: 5, minStock: 2, price: 199.00, location: 'Digital', supplier: 'FixPro Tools' },
  { id: 1006, name: 'Pantalla iPad Pro 11"', category: 'Pantallas', stock: 3, minStock: 4, price: 149.99, location: 'A1-05', supplier: 'Apple Parts' },
  { id: 1007, name: 'Kit Reparación Básico', category: 'Herramientas', stock: 7, minStock: 5, price: 59.99, location: 'C3-02', supplier: 'iFixit' }
];

/**
 * Muestra la vista de inventario
 */
function showInventory() {
  const content = document.getElementById('main-content');
  if (!content) return;

  content.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Gestión de Inventario</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" onclick="exportInventoryToExcel()">
            <i class="fas fa-file-excel me-1"></i> Exportar
          </button>
        </div>
        <button type="button" class="btn btn-sm btn-primary" onclick="showAddItemModal()">
          <i class="fas fa-plus me-1"></i> Nuevo Producto
        </button>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <div class="input-group">
          <input type="text" id="inventorySearch" class="form-control" placeholder="Buscar producto..." 
                onkeyup="searchInventory()">
          <button class="btn btn-outline-secondary" type="button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div class="col-md-4">
        <select class="form-select" id="inventoryCategoryFilter" onchange="filterInventory()">
          <option value="">Todas las categorías</option>
          <option value="Pantallas">Pantallas</option>
          <option value="Baterías">Baterías</option>
          <option value="Software">Software</option>
          <option value="Herramientas">Herramientas</option>
          <option value="Accesorios">Accesorios</option>
        </select>
      </div>
      <div class="col-md-4">
        <select class="form-select" id="inventoryStatusFilter" onchange="filterInventory()">
          <option value="">Todos los estados</option>
          <option value="Disponible">Disponible</option>
          <option value="Bajo stock">Bajo stock</option>
          <option value="Agotado">Agotado</option>
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover" id="inventoryTable">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="inventoryTableBody">
          <!-- Los datos se cargarán dinámicamente -->
        </tbody>
      </table>
    </div>

    <nav aria-label="Inventory pagination">
      <ul class="pagination justify-content-center" id="inventoryPagination">
        <!-- Paginación se generará dinámicamente -->
      </ul>
    </nav>

    <!-- Modal para agregar/editar producto -->
    <div class="modal fade" id="inventoryItemModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="inventoryModalTitle">Nuevo Producto</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="inventoryItemForm">
              <input type="hidden" id="itemId">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="itemName" class="form-label">Nombre del Producto*</label>
                  <input type="text" class="form-control" id="itemName" required>
                </div>
                <div class="col-md-6">
                  <label for="itemCategory" class="form-label">Categoría*</label>
                  <select class="form-select" id="itemCategory" required>
                    <option value="">Seleccionar categoría</option>
                    <option value="Pantallas">Pantallas</option>
                    <option value="Baterías">Baterías</option>
                    <option value="Software">Software</option>
                    <option value="Herramientas">Herramientas</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="itemStock" class="form-label">Stock Actual*</label>
                  <input type="number" class="form-control" id="itemStock" min="0" required>
                </div>
                <div class="col-md-4">
                  <label for="itemMinStock" class="form-label">Stock Mínimo*</label>
                  <input type="number" class="form-control" id="itemMinStock" min="1" required>
                </div>
                <div class="col-md-4">
                  <label for="itemPrice" class="form-label">Precio Unitario ($)*</label>
                  <input type="number" step="0.01" class="form-control" id="itemPrice" min="0" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="itemLocation" class="form-label">Ubicación en Almacén</label>
                  <input type="text" class="form-control" id="itemLocation" placeholder="Ej: A1-02">
                </div>
                <div class="col-md-6">
                  <label for="itemSupplier" class="form-label">Proveedor</label>
                  <input type="text" class="form-control" id="itemSupplier">
                </div>
              </div>
              <div class="mb-3">
                <label for="itemNotes" class="form-label">Notas</label>
                <textarea class="form-control" id="itemNotes" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="saveItemBtn" onclick="saveInventoryItem()">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para confirmar eliminación -->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirmar Eliminación</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro que deseas eliminar este producto del inventario?</p>
            <p class="fw-bold" id="itemToDeleteName"></p>
            <p class="text-muted">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Cargar los datos del inventario
  loadInventoryTable(inventoryData);
}

/**
 * Carga los datos en la tabla de inventario
 * @param {Array} data - Array de productos
 */
function loadInventoryTable(data) {
  const tableBody = document.getElementById('inventoryTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  data.forEach(item => {
    const status = getInventoryStatus(item.stock, item.minStock);
    const statusClass = status === 'Disponible' ? 'success' : status === 'Bajo stock' ? 'warning' : 'danger';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.stock}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><span class="badge bg-${statusClass}">${status}</span></td>
      <td>${item.location || '-'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editInventoryItem(${item.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmDeleteItem(${item.id}, '${item.name}')">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

/**
 * Determina el estado del inventario basado en el stock
 * @param {number} stock - Cantidad actual
 * @param {number} minStock - Cantidad mínima requerida
 * @returns {string} Estado del producto
 */
function getInventoryStatus(stock, minStock) {
  if (stock === 0) return 'Agotado';
  if (stock <= minStock) return 'Bajo stock';
  return 'Disponible';
}

/**
 * Filtra los productos del inventario
 */
function filterInventory() {
  const categoryFilter = document.getElementById('inventoryCategoryFilter').value;
  const statusFilter = document.getElementById('inventoryStatusFilter').value;
  const searchTerm = document.getElementById('inventorySearch').value.toLowerCase();

  let filteredData = inventoryData;

  // Aplicar filtros
  if (categoryFilter) {
    filteredData = filteredData.filter(item => item.category === categoryFilter);
  }

  if (statusFilter) {
    filteredData = filteredData.filter(item => {
      const status = getInventoryStatus(item.stock, item.minStock);
      return status === statusFilter;
    });
  }

if (searchTerm) {
    filteredData = filteredData.filter(item => {
      return item.name.toLowerCase().includes(searchTerm) || 
             item.id.toString().includes(searchTerm);
    });
}

  loadInventoryTable(filteredData);
}
/**
 * Busca productos en el inventario
 */
function searchInventory() {
  filterInventory(); // Reutilizamos la función de filtrado
}

/**
 * Muestra el modal para agregar un nuevo producto
 */
function showAddItemModal() {
  const modal = new bootstrap.Modal(document.getElementById('inventoryItemModal'));
  document.getElementById('inventoryModalTitle').textContent = 'Nuevo Producto';
  document.getElementById('itemId').value = '';
  document.getElementById('inventoryItemForm').reset();
  document.getElementById('saveItemBtn').onclick = () => saveInventoryItem();
  modal.show();
}

/**
 * Muestra el modal para editar un producto existente
 * @param {number} id - ID del producto a editar
 */
function editInventoryItem(id) {
  const item = inventoryData.find(item => item.id === id);
  if (!item) return;

  const modal = new bootstrap.Modal(document.getElementById('inventoryItemModal'));
  document.getElementById('inventoryModalTitle').textContent = 'Editar Producto';
  document.getElementById('itemId').value = item.id;
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemCategory').value = item.category;
  document.getElementById('itemStock').value = item.stock;
  document.getElementById('itemMinStock').value = item.minStock;
  document.getElementById('itemPrice').value = item.price;
  document.getElementById('itemLocation').value = item.location || '';
  document.getElementById('itemSupplier').value = item.supplier || '';
  document.getElementById('itemNotes').value = item.notes || '';
  document.getElementById('saveItemBtn').onclick = () => saveInventoryItem();
  modal.show();
}

/**
 * Guarda un producto en el inventario (nuevo o existente)
 */
function saveInventoryItem() {
  const form = document.getElementById('inventoryItemForm');
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  const itemId = document.getElementById('itemId').value;
  const itemData = {
    id: itemId ? parseInt(itemId) : generateItemId(),
    name: document.getElementById('itemName').value,
    category: document.getElementById('itemCategory').value,
    stock: parseInt(document.getElementById('itemStock').value),
    minStock: parseInt(document.getElementById('itemMinStock').value),
    price: parseFloat(document.getElementById('itemPrice').value),
    location: document.getElementById('itemLocation').value,
    supplier: document.getElementById('itemSupplier').value,
    notes: document.getElementById('itemNotes').value
  };

  if (itemId) {
    // Editar producto existente
    const index = inventoryData.findIndex(item => item.id === parseInt(itemId));
    if (index !== -1) {
      inventoryData[index] = itemData;
    }
  } else {
    // Agregar nuevo producto
    inventoryData.push(itemData);
  }

  // Cerrar modal y actualizar tabla
  bootstrap.Modal.getInstance(document.getElementById('inventoryItemModal')).hide();
  loadInventoryTable(inventoryData);
  
  // Mostrar notificación de éxito
  showAlert('¡Éxito!', 'El producto se ha guardado correctamente.', 'success');
}

/**
 * Genera un nuevo ID para productos
 * @returns {number} Nuevo ID
 */
function generateItemId() {
  const maxId = Math.max(...inventoryData.map(item => item.id));
  return maxId + 1;
}

/**
 * Muestra el modal de confirmación para eliminar un producto
 * @param {number} id - ID del producto
 * @param {string} name - Nombre del producto
 */
function confirmDeleteItem(id, name) {
  const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
  document.getElementById('itemToDeleteName').textContent = name;
  document.getElementById('confirmDeleteBtn').onclick = () => deleteInventoryItem(id);
  modal.show();
}

/**
 * Elimina un producto del inventario
 * @param {number} id - ID del producto a eliminar
 */
function deleteInventoryItem(id) {
  const index = inventoryData.findIndex(item => item.id === id);
  if (index !== -1) {
    inventoryData.splice(index, 1);
    loadInventoryTable(inventoryData);
    bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')).hide();
    showAlert('¡Éxito!', 'El producto ha sido eliminado.', 'success');
  }
}

/**
 * Exporta el inventario a Excel (simulado)
 */
function exportInventoryToExcel() {
  // En una implementación real, aquí iría el código para generar un Excel
  showAlert('Exportar a Excel', 'Esta función exportaría los datos a Excel en una implementación real.', 'info');
}

/**
 * Muestra una alerta/notificación
 * @param {string} title - Título de la alerta
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de alerta (success, error, info, warning)
 */
function showAlert(title, message, type) {
  // Implementación básica - podrías usar Toast de Bootstrap o SweetAlert en producción
  alert(`${title}\n${message}`);
}
// =============================
// MÓDULO DE VENTAS - COMPLETO
// =============================

// Datos de ejemplo para ventas
const salesData = {
  monthlySummary: [
    { month: 'Ene', sales: 12500, orders: 42 },
    { month: 'Feb', sales: 15800, orders: 51 },
    { month: 'Mar', sales: 14200, orders: 47 },
    { month: 'Abr', sales: 18900, orders: 63 },
    { month: 'May', sales: 21000, orders: 72 },
    { month: 'Jun', sales: 19800, orders: 68 }
  ],
  byCategory: [
    { category: 'Pantallas', sales: 35600, percentage: 42 },
    { category: 'Baterías', sales: 21500, percentage: 25 },
    { category: 'Software', sales: 12800, percentage: 15 },
    { category: 'Accesorios', sales: 9800, percentage: 11 },
    { category: 'Herramientas', sales: 5200, percentage: 6 }
  ],
  recentTransactions: [
    { id: 10045, date: '2023-06-15', client: 'María González', amount: 189.98, status: 'Completada', method: 'Tarjeta' },
    { id: 10044, date: '2023-06-14', client: 'Carlos Mendoza', amount: 245.50, status: 'Completada', method: 'Efectivo' },
    { id: 10043, date: '2023-06-14', client: 'Laura Jiménez', amount: 89.99, status: 'Reembolsada', method: 'Tarjeta' },
    { id: 10042, date: '2023-06-13', client: 'Roberto Sánchez', amount: 320.00, status: 'Completada', method: 'Transferencia' },
    { id: 10041, date: '2023-06-12', client: 'Ana López', amount: 150.00, status: 'Pendiente', method: 'Tarjeta' }
  ]
};

// Función para formatear moneda
function formatCurrency(amount) {
  return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Función para mostrar alertas
function showAlert(title, message, type = 'info') {
  // Puedes reemplazar esto con SweetAlert o Toast de Bootstrap
  alert(`${title}: ${message}`);
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
      <h1 class="h2">Dashboard de Ventas</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" onclick="exportSalesReport()">
            <i class="fas fa-file-pdf me-1"></i> Exportar
          </button>
        </div>
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-calendar-alt me-1"></i> 
            <span id="currentPeriod">Últimos 6 meses</span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#" onclick="changeSalesPeriod('Hoy')">Hoy</a></li>
            <li><a class="dropdown-item" href="#" onclick="changeSalesPeriod('week')">Esta semana</a></li>
            <li><a class="dropdown-item" href="#" onclick="changeSalesPeriod('month')">Este mes</a></li>
            <li><a class="dropdown-item" href="#" onclick="changeSalesPeriod('year')">Este año</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" onclick="showCustomDateRange()">Rango personalizado</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Tarjetas de resumen -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card stat-card bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">Ventas Totales</h5>
            <h2 class="card-stat">${formatCurrency(salesData.monthlySummary.reduce((sum, month) => sum + month.sales, 0))}</h2>
            <p class="card-text">Últimos 6 meses</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Órdenes</h5>
            <h2 class="card-stat">${salesData.monthlySummary.reduce((sum, month) => sum + month.orders, 0)}</h2>
            <p class="card-text">Últimos 6 meses</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card bg-warning text-white">
          <div class="card-body">
            <h5 class="card-title">Ticket Promedio</h5>
            <h2 class="card-stat">${formatCurrency(
              salesData.monthlySummary.reduce((sum, month) => sum + month.sales, 0) / 
              (salesData.monthlySummary.reduce((sum, month) => sum + month.orders, 0) || 1)
            )}</h2>
            <p class="card-text">Valor promedio</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">Crecimiento</h5>
            <h2 class="card-stat">+${calculateGrowth()}%</h2>
            <p class="card-text">Vs período anterior</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráficos -->
    <div class="row mb-4">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5>Ventas Mensuales</h5>
          </div>
          <div class="card-body">
            <canvas id="monthlySalesChart" height="250"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5>Ventas por Categoría</h5>
          </div>
          <div class="card-body">
            <canvas id="salesByCategoryChart" height="250"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Transacciones recientes -->
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h5>Transacciones Recientes</h5>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-secondary" onclick="refreshTransactions()">
              <i class="fas fa-sync-alt me-1"></i> Actualizar
            </button>
          </div>
        </div>
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
                <th>Acciones</th>
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
                  <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewTransactionDetails(${transaction.id})">
                      <i class="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modales -->
    <div class="modal fade" id="transactionDetailsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Detalles de Transacción #<span id="transactionId"></span></h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="transactionDetailsContent">
            <!-- Contenido cargado dinámicamente -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" onclick="printTransaction()">
              <i class="fas fa-print me-1"></i> Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="customDateRangeModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Seleccionar Rango de Fechas</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="dateRangeForm">
              <div class="mb-3">
                <label for="startDate" class="form-label">Fecha Inicio</label>
                <input type="date" class="form-control" id="startDate" required>
              </div>
              <div class="mb-3">
                <label for="endDate" class="form-label">Fecha Fin</label>
                <input type="date" class="form-control" id="endDate" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="applyCustomDateRange()">Aplicar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inicializar gráficos
  initMonthlySalesChart();
  initSalesByCategoryChart();
}

// Función para calcular el crecimiento
function calculateGrowth() {
  const months = salesData.monthlySummary;
  if (months.length < 2) return 0;
  
  const current = months[months.length - 1].sales;
  const previous = months[months.length - 2].sales;
  
  return (((current - previous) / previous) * 100).toFixed(1);
}

// Inicializar gráfico de ventas mensuales
function initMonthlySalesChart() {
  const ctx = document.getElementById('monthlySalesChart')?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: salesData.monthlySummary.map(m => m.month),
      datasets: [{
        label: 'Ventas ($)',
        data: salesData.monthlySummary.map(m => m.sales),
        backgroundColor: 'rgba(78, 115, 223, 0.8)',
        borderColor: 'rgba(78, 115, 223, 1)',
        borderWidth: 1
      }, {
        label: 'Órdenes',
        data: salesData.monthlySummary.map(m => m.orders),
        backgroundColor: 'rgba(28, 200, 138, 0.8)',
        borderColor: 'rgba(28, 200, 138, 1)',
        borderWidth: 1,
        type: 'line',
        yAxisID: 'y1'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Ventas ($)'
          }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          grid: {
            drawOnChartArea: false
          },
          title: {
            display: true,
            text: 'Número de Órdenes'
          }
        }
      }
    }
  });
}

// Inicializar gráfico de ventas por categoría
function initSalesByCategoryChart() {
  const ctx = document.getElementById('salesByCategoryChart')?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: salesData.byCategory.map(c => c.category),
      datasets: [{
        data: salesData.byCategory.map(c => c.sales),
        backgroundColor: [
          'rgba(78, 115, 223, 0.8)',
          'rgba(28, 200, 138, 0.8)',
          'rgba(231, 74, 59, 0.8)',
          'rgba(246, 194, 62, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
          'rgba(78, 115, 223, 1)',
          'rgba(28, 200, 138, 1)',
          'rgba(231, 74, 59, 1)',
          'rgba(246, 194, 62, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${formatCurrency(value)} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Cambiar período de visualización
function changeSalesPeriod(period) {
  const periodText = 
    period === 'Hoy' ? 'Hoy' :
    period === 'week' ? 'Esta semana' :
    period === 'month' ? 'Este mes' :
    period === 'year' ? 'Este año' : 'Últimos 6 meses';
  
  document.getElementById('currentPeriod').textContent = periodText;
  showAlert('Período cambiado', `Mostrando datos de ${periodText}`, 'info');
}

// Mostrar modal de rango personalizado
function showCustomDateRange() {
  const modal = new bootstrap.Modal(document.getElementById('customDateRangeModal'));
  document.getElementById('dateRangeForm').reset();
  modal.show();
}

// Aplicar rango personalizado
function applyCustomDateRange() {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  
  if (!startDate || !endDate) {
    showAlert('Error', 'Debes seleccionar ambas fechas', 'error');
    return;
  }
  
  document.getElementById('currentPeriod').textContent = 
    `${formatDate(startDate)} al ${formatDate(endDate)}`;
  
  bootstrap.Modal.getInstance(document.getElementById('customDateRangeModal')).hide();
  showAlert('Rango aplicado', `Mostrando datos del ${document.getElementById('currentPeriod').textContent}`, 'success');
}

// Ver detalles de transacción
function viewTransactionDetails(transactionId) {
  const transaction = salesData.recentTransactions.find(t => t.id === transactionId);
  if (!transaction) return;

  document.getElementById('transactionId').textContent = transactionId;
  
  const detailsContent = `
    <div class="row mb-3">
      <div class="col-md-6">
        <h6>Información de la Transacción</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between">
            <span>Fecha:</span>
            <span>${formatDate(transaction.date)}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Estado:</span>
            <span class="badge ${
              transaction.status === 'Completada' ? 'bg-success' : 
              transaction.status === 'Pendiente' ? 'bg-warning' : 'bg-danger'
            }">${transaction.status}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Método de Pago:</span>
            <span>${transaction.method}</span>
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <h6>Información del Cliente</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between">
            <span>Nombre:</span>
            <span>${transaction.client}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Contacto:</span>
            <span>${transaction.client.replace(/\s+/g, '').toLowerCase()}@ejemplo.com</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Teléfono:</span>
            <span>+52 55 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}</span>
          </li>
        </ul>
      </div>
    </div>
    
    <h6 class="mt-4">Productos/Servicios</h6>
    <div class="table-responsive">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reparación de ${transaction.amount > 200 ? 'Pantalla' : 'Batería'}</td>
            <td>1</td>
            <td>${formatCurrency(transaction.amount)}</td>
            <td>${formatCurrency(transaction.amount)}</td>
          </tr>
          ${transaction.amount > 200 ? `
          <tr>
            <td>Protector de Pantalla</td>
            <td>1</td>
            <td>${formatCurrency(19.99)}</td>
            <td>${formatCurrency(19.99)}</td>
          </tr>
          ` : ''}
        </tbody>
        <tfoot class="table-dark">
          <tr>
            <td colspan="3" class="text-end">Total:</td>
            <td>${formatCurrency(transaction.amount + (transaction.amount > 200 ? 19.99 : 0))}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    
    <div class="mt-3">
      <h6>Notas</h6>
      <p class="text-muted">${transaction.status === 'Reembolsada' ? 
        'El cliente solicitó reembolso por garantía' : 
        'Ninguna nota adicional'}</p>
    </div>
  `;
  
  document.getElementById('transactionDetailsContent').innerHTML = detailsContent;
  new bootstrap.Modal(document.getElementById('transactionDetailsModal')).show();
}

// Funciones auxiliares
function refreshTransactions() {
  showAlert('Datos actualizados', 'La lista de transacciones se ha actualizado', 'success');
}

function exportSalesReport() {
  showAlert('Exportar Reporte', 'Esta función generaría un reporte PDF en una implementación real', 'info');
}

function printTransaction() {
  showAlert('Imprimir', 'Esta función abriría el diálogo de impresión en una implementación real', 'info');
}


// =============================
// PERFIL DE USUARIO (GERENTE)
// =============================

// Datos del gerente (simulados)
let currentUser = {
  id: 2,
  name: "Juan",
  lastName: "Pérez",
  email: "Asesor@fixpro.com",
  phone: "555-5678",
  avatar: "assets/img/profile-placeholder.png",
  role: "Asesor de Ventas",
  department: "Ventas",
  lastLogin: new Date().toLocaleString(),
  notifications: true,
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