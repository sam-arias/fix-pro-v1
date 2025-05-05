// ==============================================
// ADMINISTRADOR - FUNCIONES ESPECÍFICAS
// ==============================================

// Variables globales para el admin
let adminData = {
  orders: 87,
  income: 5420,
  lowStock: 7,
  lateOrders: 3,
  technicians: [
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com", specialties: ["Pantallas", "Baterías"], status: "Disponible" },
    { id: 2, name: "María García", email: "maria.garcia@example.com", specialties: ["Placas", "Conectores"], status: "Disponible" }
  ],
  parts: [
    { code: "SCR-001", description: "Pantalla iPhone 12", type: "Pantalla", stock: 5, price: 120 },
    { code: "BAT-045", description: "Batería Samsung S21", type: "Batería", stock: 3, price: 65 }
  ]
};

// ======================
// FUNCIONES DEL DASHBOARD
// ======================

function loadAdminDashboard() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card stats-card primary">
          <div class="card-body">
            <h5 class="card-title">Órdenes totales</h5>
            <h2 class="card-text">${adminData.orders}</h2>
            <p class="small text-muted">Este mes</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stats-card success">
          <div class="card-body">
            <h5 class="card-title">Ingresos</h5>
            <h2 class="card-text">$${adminData.income.toLocaleString()}</h2>
            <p class="small text-muted">Este mes</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stats-card warning">
          <div class="card-body">
            <h5 class="card-title">Repuestos bajos</h5>
            <h2 class="card-text">${adminData.lowStock}</h2>
            <p class="small text-muted">Necesitan reposición</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stats-card danger">
          <div class="card-body">
            <h5 class="card-title">Órdenes atrasadas</h5>
            <h2 class="card-text">${adminData.lateOrders}</h2>
            <p class="small text-muted">Fuera de plazo</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-chart-line me-2"></i>Estadísticas</h5>
            <canvas id="ordersChart" width="400" height="200"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-exclamation-triangle me-2"></i>Alertas</h5>
            <div class="alert alert-warning">
              <strong>Repuestos bajos:</strong> Pantallas iPhone 12, baterías Samsung S20
            </div>
            <div class="alert alert-danger">
              <strong>Órdenes atrasadas:</strong> #1234, #1237, #1239
            </div>
            <div class="alert alert-info">
              <strong>Nuevo técnico:</strong> Carlos López se unió al equipo
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  initAdminCharts();
}

function initAdminCharts() {
  const ctx = document.getElementById('ordersChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
      datasets: [{
        label: 'Órdenes por mes',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
// GESTIÓN DE REPUESTOS (PARTS)
// =============================

function showPartsManagement() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Gestión de Repuestos</h1>
      <button class="btn btn-success" onclick="showAddPartForm()">
        <i class="fas fa-plus me-2"></i>Agregar repuesto
      </button>
    </div>
    
    <div class="table-responsive">
      <table class="table table-hover admin-table">
        <thead class="table-dark">
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Marca/Modelo</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${adminData.parts.map(part => `
            <tr>
              <td>${part.code}</td>
              <td>${part.description}</td>
              <td>${part.type}</td>
              <td>${part.model || 'N/A'}</td>
              <td>${part.stock}</td>
              <td>$${part.price}</td>
              <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editPart('${part.code}')">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deletePart('${part.code}')">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function showAddPartForm(partData = null) {
  const mainContent = document.getElementById('mainContent');
  const isEdit = partData !== null;
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">${isEdit ? 'Editar' : 'Agregar'} Repuesto</h1>
    </div>
    
    <div class="admin-form">
      <form id="partForm" onsubmit="handlePartForm(event, ${isEdit ? `'${partData?.code}'` : 'null'})">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="partCode" class="form-label">Código</label>
              <input type="text" class="form-control" id="partCode" value="${partData?.code || ''}" ${isEdit ? 'readonly' : 'required'}>
            </div>
            <div class="mb-3">
              <label for="partDescription" class="form-label">Descripción</label>
              <input type="text" class="form-control" id="partDescription" value="${partData?.description || ''}" required>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="partType" class="form-label">Tipo</label>
              <select class="form-select" id="partType" required>
                <option value="">Seleccione...</option>
                <option value="Pantalla" ${partData?.type === 'Pantalla' ? 'selected' : ''}>Pantalla</option>
                <option value="Batería" ${partData?.type === 'Batería' ? 'selected' : ''}>Batería</option>
                <option value="Conector" ${partData?.type === 'Conector' ? 'selected' : ''}>Conector</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="partBrand" class="form-label">Marca</label>
              <input type="text" class="form-control" id="partBrand" value="${partData?.brand || ''}">
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-4">
            <div class="mb-3">
              <label for="partModel" class="form-label">Modelo compatible</label>
              <input type="text" class="form-control" id="partModel" value="${partData?.model || ''}">
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label for="partStock" class="form-label">Stock</label>
              <input type="number" class="form-control" id="partStock" min="0" value="${partData?.stock || 0}" required>
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label for="partPrice" class="form-label">Precio unitario</label>
              <input type="number" class="form-control" id="partPrice" min="0" step="0.01" value="${partData?.price || 0}" required>
            </div>
          </div>
        </div>
        
        <div class="mb-3">
          <label for="partNotes" class="form-label">Notas</label>
          <textarea class="form-control" id="partNotes" rows="2">${partData?.notes || ''}</textarea>
        </div>
        
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" class="btn btn-secondary me-md-2" onclick="showPartsManagement()">Cancelar</button>
          <button type="submit" class="btn btn-primary">${isEdit ? 'Actualizar' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  `;
}

function handlePartForm(event, partCode = null) {
  event.preventDefault();
  
  const partData = {
    code: document.getElementById('partCode').value,
    description: document.getElementById('partDescription').value,
    type: document.getElementById('partType').value,
    brand: document.getElementById('partBrand').value,
    model: document.getElementById('partModel').value,
    stock: parseInt(document.getElementById('partStock').value),
    price: parseFloat(document.getElementById('partPrice').value),
    notes: document.getElementById('partNotes').value
  };
  
  if (partCode) {
    // Editar repuesto existente
    const index = adminData.parts.findIndex(p => p.code === partCode);
    if (index !== -1) {
      adminData.parts[index] = partData;
    }
  } else {
    // Agregar nuevo repuesto
    adminData.parts.push(partData);
  }
  
  showPartsManagement();
}

function editPart(code) {
  const part = adminData.parts.find(p => p.code === code);
  if (part) {
    showAddPartForm(part);
  }
}

function deletePart(code) {
  if (confirm('¿Está seguro de eliminar este repuesto?')) {
    adminData.parts = adminData.parts.filter(p => p.code !== code);
    showPartsManagement();
  }
}

// =============================
// GESTIÓN DE TÉCNICOS
// =============================

function showTechniciansManagement() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Gestión de Técnicos</h1>
      <button class="btn btn-success" onclick="showAddTechnicianForm()">
        <i class="fas fa-plus me-2"></i>Agregar técnico
      </button>
    </div>
    
    <div class="table-responsive">
      <table class="table table-hover admin-table">
        <thead class="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Especialidades</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${adminData.technicians.map(tech => `
            <tr>
              <td>${tech.name}</td>
              <td>${tech.email}</td>
              <td>${tech.phone || 'N/A'}</td>
              <td>${tech.specialties.join(', ')}</td>
              <td>
                <span class="badge ${tech.status === 'Disponible' ? 'bg-success' : 'bg-secondary'}">
                  ${tech.status}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editTechnician(${tech.id})">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="manageSpecialties(${tech.id})">
                  <i class="fas fa-certificate"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function showAddTechnicianForm(techData = null) {
  const mainContent = document.getElementById('mainContent');
  const isEdit = techData !== null;
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">${isEdit ? 'Editar' : 'Agregar'} Técnico</h1>
    </div>
    
    <div class="admin-form">
      <form id="techForm" onsubmit="handleTechForm(event, ${isEdit ? techData.id : 'null'})">
        <h5 class="mb-3"><i class="fas fa-user-tie me-2"></i>Datos personales</h5>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="techName" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="techName" value="${techData?.name?.split(' ')[0] || ''}" required>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="techLastName" class="form-label">Apellidos</label>
              <input type="text" class="form-control" id="techLastName" value="${techData?.name?.split(' ').slice(1).join(' ') || ''}" required>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="techEmail" class="form-label">Email</label>
              <input type="email" class="form-control" id="techEmail" value="${techData?.email || ''}" required>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="techPhone" class="form-label">Teléfono</label>
              <input type="tel" class="form-control" id="techPhone" value="${techData?.phone || ''}">
            </div>
          </div>
        </div>
        
        <h5 class="mb-3 mt-4"><i class="fas fa-key me-2"></i>Datos de acceso</h5>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="techUsername" class="form-label">Usuario</label>
              <input type="text" class="form-control" id="techUsername" value="${techData?.username || ''}" ${isEdit ? 'readonly' : 'required'}>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="techPassword" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="techPassword" ${isEdit ? 'placeholder="Dejar en blanco para no cambiar"' : 'required'}>
            </div>
          </div>
        </div>
        
        <h5 class="mb-3 mt-4"><i class="fas fa-certificate me-2"></i>Especialidades</h5>
        <div class="row">
          <div class="col-md-6">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="spec1" ${techData?.specialties?.includes('Pantallas') ? 'checked' : ''}>
              <label class="form-check-label" for="spec1">Pantallas</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="spec2" ${techData?.specialties?.includes('Baterías') ? 'checked' : ''}>
              <label class="form-check-label" for="spec2">Baterías</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="spec3" ${techData?.specialties?.includes('Placas') ? 'checked' : ''}>
              <label class="form-check-label" for="spec3">Placas</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="spec4" ${techData?.specialties?.includes('Software') ? 'checked' : ''}>
              <label class="form-check-label" for="spec4">Software</label>
            </div>
          </div>
        </div>
        
        <div class="mb-3 mt-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="techActive" ${!techData || techData.status === 'Disponible' ? 'checked' : ''}>
            <label class="form-check-label" for="techActive">Técnico activo</label>
          </div>
        </div>
        
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button type="button" class="btn btn-secondary me-md-2" onclick="showTechniciansManagement()">Cancelar</button>
          <button type="submit" class="btn btn-primary">${isEdit ? 'Actualizar' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  `;
}

function handleTechForm(event, techId = null) {
  event.preventDefault();
  
  const specialties = [];
  if (document.getElementById('spec1').checked) specialties.push('Pantallas');
  if (document.getElementById('spec2').checked) specialties.push('Baterías');
  if (document.getElementById('spec3').checked) specialties.push('Placas');
  if (document.getElementById('spec4').checked) specialties.push('Software');
  
  const techData = {
    id: techId || Math.max(...adminData.technicians.map(t => t.id), 0) + 1,
    name: `${document.getElementById('techName').value} ${document.getElementById('techLastName').value}`,
    email: document.getElementById('techEmail').value,
    phone: document.getElementById('techPhone').value,
    username: document.getElementById('techUsername').value,
    specialties,
    status: document.getElementById('techActive').checked ? 'Disponible' : 'Inactivo'
  };
  
  const password = document.getElementById('techPassword').value;
  if (password) {
    techData.password = password; // En una app real, esto debería encriptarse
  }
  
  if (techId) {
    // Editar técnico existente
    const index = adminData.technicians.findIndex(t => t.id === techId);
    if (index !== -1) {
      adminData.technicians[index] = techData;
    }
  } else {
    // Agregar nuevo técnico
    adminData.technicians.push(techData);
  }
  
  showTechniciansManagement();
}

function editTechnician(id) {
  const tech = adminData.technicians.find(t => t.id === id);
  if (tech) {
    showAddTechnicianForm(tech);
  }
}

function manageSpecialties(id) {
  // Implementar gestión avanzada de especialidades
  alert(`Gestión de especialidades para técnico ID: ${id}`);
}

// =====================
// REPORTES Y ESTADÍSTICAS
// =====================

function showReports() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Reportes y Estadísticas</h1>
      <div>
        <button class="btn btn-success me-2" onclick="exportToExcel()">
          <i class="fas fa-file-excel me-1"></i>Excel
        </button>
        <button class="btn btn-danger" onclick="exportToPDF()">
          <i class="fas fa-file-pdf me-1"></i>PDF
        </button>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-chart-pie me-2"></i>Órdenes por estado</h5>
            <canvas id="statusChart" width="400" height="250"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-chart-bar me-2"></i>Órdenes mensuales</h5>
            <canvas id="monthlyChart" width="400" height="250"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-chart-line me-2"></i>Ingresos mensuales</h5>
            <canvas id="incomeChart" width="400" height="250"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-users me-2"></i>Productividad por técnico</h5>
            <canvas id="productivityChart" width="400" height="250"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Inicializar gráficos
  initReportCharts();
}

function initReportCharts() {
  // Gráfico de estado de órdenes
  new Chart(document.getElementById('statusChart'), {
    type: 'pie',
    data: {
      labels: ['Completadas', 'En progreso', 'Pendientes', 'Canceladas'],
      datasets: [{
        data: [65, 15, 10, 5],
        backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545']
      }]
    }
  });
  
  // Gráfico de órdenes mensuales
  new Chart(document.getElementById('monthlyChart'), {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
      datasets: [{
        label: 'Órdenes',
        data: [45, 60, 75, 65, 85],
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      }]
    }
  });
  
  // Gráfico de ingresos
  new Chart(document.getElementById('incomeChart'), {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
      datasets: [{
        label: 'Ingresos ($)',
        data: [3200, 4100, 3750, 4800, 5200],
        borderColor: 'rgba(40, 167, 69, 1)',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true
      }]
    }
  });
  
  // Gráfico de productividad
  new Chart(document.getElementById('productivityChart'), {
    type: 'bar',
    data: {
      labels: adminData.technicians.map(t => t.name.split(' ')[0]),
      datasets: [{
        label: 'Órdenes completadas',
        data: [12, 8, 5],
        backgroundColor: 'rgba(108, 117, 125, 0.7)'
      }]
    }
  });
}

function exportToExcel() {
  alert('Exportando a Excel...'); // Implementación real usaría una librería como SheetJS
}

function exportToPDF() {
  alert('Exportando a PDF...'); // Implementación real usaría una librería como jsPDF
}



// =============================
// GESTIÓN DE ÓRDENES (ADMIN)
// =============================

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

function showInterventionOrders(filter = 'all') {
  const mainContent = document.getElementById('mainContent');
  const filteredOrders = filter === 'all' ? ordersData : ordersData.filter(order => order.status.toLowerCase().includes(filter.toLowerCase()));
  
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

function getStatusBadgeClass(status) {
  switch(status.toLowerCase()) {
      case 'completada': return 'bg-success';
      case 'en progreso': return 'bg-warning';
      case 'pendiente': return 'bg-info';
      default: return 'bg-secondary';
  }
}

function showOrderForm(order = null) {
  const isEdit = order !== null;
  const mainContent = document.getElementById('mainContent');
  
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

function handleOrderForm(event, orderId = null) {
  event.preventDefault();
  
  const newOrder = {
      id: orderId || Math.max(...ordersData.map(o => o.id), 0) + 1,
      client: document.getElementById('clientName').value,
      phone: document.getElementById('clientPhone').value,
      deviceType: document.getElementById('deviceType').value,
      device: document.getElementById('deviceModel').value,
      problem: document.getElementById('problemDescription').value,
      technicianId: document.getElementById('technician').value,
      technician: document.getElementById('technician').options[document.getElementById('technician').selectedIndex].text,
      priority: document.getElementById('priority').value,
      estimatedDate: document.getElementById('estimatedDate').value,
      status: 'Pendiente',
      date: new Date().toLocaleDateString('es-ES')
  };
  
  if (orderId) {
      // Editar orden existente
      const index = ordersData.findIndex(o => o.id === orderId);
      if (index !== -1) {
          ordersData[index] = newOrder;
      }
  } else {
      // Agregar nueva orden
      ordersData.unshift(newOrder);
  }
  
  showInterventionOrders();
}

function showOrderDetails(orderId) {
  const order = ordersData.find(o => o.id === orderId);
  if (!order) return;
  
  const mainContent = document.getElementById('mainContent');
  
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

function editOrder(orderId) {
  const order = ordersData.find(o => o.id === orderId);
  if (order) {
      showOrderForm(order);
  }
}

function completeOrder(orderId) {
  if (confirm('¿Marcar esta orden como completada?')) {
      const index = ordersData.findIndex(o => o.id === orderId);
      if (index !== -1) {
          ordersData[index].status = 'Completada';
          showInterventionOrders();
      }
  }
}


// =============================
// GESTIÓN DE PERMISOS
// =============================

let permissionsData = {
  roles: ['Administrador', 'Técnico', 'Asesor'],
  permissions: {
      'Dashboard': ['read'],
      'Repuestos': ['read', 'create', 'update', 'delete'],
      'Técnicos': ['read', 'create', 'update', 'delete'],
      'Órdenes': ['read', 'create', 'update', 'complete'],
      'Reportes': ['read'],
      'Configuración': ['read', 'update']
  },
  rolePermissions: {
      'Administrador': {
          'Dashboard': ['read'],
          'Repuestos': ['read', 'create', 'update', 'delete'],
          'Técnicos': ['read', 'create', 'update', 'delete'],
          'Órdenes': ['read', 'create', 'update', 'complete'],
          'Reportes': ['read'],
          'Configuración': ['read', 'update']
      },
      'Técnico': {
          'Dashboard': ['read'],
          'Órdenes': ['read', 'update', 'complete']
      },
      'Asesor': {
          'Dashboard': ['read'],
          'Órdenes': ['read', 'create']
      }
  }
};

function showPermissionsManagement() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Gestión de Permisos</h1>
          <button class="btn btn-sm btn-primary" onclick="showAddRoleForm()">
              <i class="fas fa-plus me-1"></i> Nuevo Rol
          </button>
      </div>
      
      <div class="card">
          <div class="card-body">
              <div class="table-responsive">
                  <table class="table table-hover">
                      <thead class="table-dark">
                          <tr>
                              <th>Rol</th>
                              ${Object.keys(permissionsData.permissions).map(module => `
                                  <th>${module}</th>
                              `).join('')}
                              <th>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${permissionsData.roles.map(role => `
                              <tr>
                                  <td><strong>${role}</strong></td>
                                  ${Object.keys(permissionsData.permissions).map(module => `
                                      <td>
                                          ${permissionsData.rolePermissions[role]?.[module]?.map(perm => `
                                              <span class="badge bg-secondary me-1">${perm}</span>
                                          `).join('') || '—'}
                                      </td>
                                  `).join('')}
                                  <td>
                                      <button class="btn btn-sm btn-warning me-1" onclick="editRolePermissions('${role}')">
                                          <i class="fas fa-edit"></i>
                                      </button>
                                      ${role !== 'Administrador' ? `
                                      <button class="btn btn-sm btn-danger" onclick="deleteRole('${role}')">
                                          <i class="fas fa-trash"></i>
                                      </button>
                                      ` : ''}
                                  </td>
                              </tr>
                          `).join('')}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  `;
}

function editRolePermissions(role) {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Editar Permisos: ${role}</h1>
      </div>
      
      <div class="card">
          <div class="card-body">
              <form id="permissionsForm" onsubmit="saveRolePermissions(event, '${role}')">
                  <div class="row">
                      ${Object.keys(permissionsData.permissions).map(module => `
                          <div class="col-md-6 mb-4">
                              <h5>${module}</h5>
                              ${permissionsData.permissions[module].map(perm => `
                                  <div class="form-check">
                                      <input class="form-check-input" type="checkbox" 
                                          id="perm-${module}-${perm}" 
                                          name="${module}" 
                                          value="${perm}"
                                          ${permissionsData.rolePermissions[role]?.[module]?.includes(perm) ? 'checked' : ''}>
                                      <label class="form-check-label" for="perm-${module}-${perm}">
                                          ${perm.charAt(0).toUpperCase() + perm.slice(1)}
                                      </label>
                                  </div>
                              `).join('')}
                          </div>
                      `).join('')}
                  </div>
                  
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button type="button" class="btn btn-secondary me-md-2" onclick="showPermissionsManagement()">Cancelar</button>
                      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                  </div>
              </form>
          </div>
      </div>
  `;
}

function saveRolePermissions(event, role) {
  event.preventDefault();
  
  const formData = new FormData(document.getElementById('permissionsForm'));
  const permissions = {};
  
  // Organizar permisos por módulo
  for (let [module, perm] of formData.entries()) {
      if (!permissions[module]) {
          permissions[module] = [];
      }
      permissions[module].push(perm);
  }
  
  // Actualizar permisos del rol
  permissionsData.rolePermissions[role] = permissions;
  
  showPermissionsManagement();
  alert('Permisos actualizados correctamente');
}

function showAddRoleForm() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Crear Nuevo Rol</h1>
      </div>
      
      <div class="card">
          <div class="card-body">
              <form id="newRoleForm" onsubmit="createNewRole(event)">
                  <div class="mb-3">
                      <label for="roleName" class="form-label">Nombre del Rol</label>
                      <input type="text" class="form-control" id="roleName" required>
                  </div>
                  
                  <div class="mb-3">
                      <label class="form-label">Seleccionar permisos base:</label>
                      <select class="form-select" id="baseRole">
                          <option value="">Personalizado</option>
                          ${permissionsData.roles.filter(r => r !== 'Administrador').map(role => `
                              <option value="${role}">Copiar de ${role}</option>
                          `).join('')}
                      </select>
                  </div>
                  
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button type="button" class="btn btn-secondary me-md-2" onclick="showPermissionsManagement()">Cancelar</button>
                      <button type="submit" class="btn btn-primary">Crear Rol</button>
                  </div>
              </form>
          </div>
      </div>
  `;
}

function createNewRole(event) {
  event.preventDefault();
  
  const roleName = document.getElementById('roleName').value;
  const baseRole = document.getElementById('baseRole').value;
  
  if (permissionsData.roles.includes(roleName)) {
      alert('¡Ya existe un rol con ese nombre!');
      return;
  }
  
  // Agregar nuevo rol
  permissionsData.roles.push(roleName);
  
  // Configurar permisos base
  permissionsData.rolePermissions[roleName] = baseRole ? 
      {...permissionsData.rolePermissions[baseRole]} : 
      {};
  
  showPermissionsManagement();
  alert(`Rol "${roleName}" creado correctamente`);
}

function deleteRole(role) {
  if (confirm(`¿Estás seguro de eliminar el rol "${role}"? Esta acción no se puede deshacer.`)) {
      permissionsData.roles = permissionsData.roles.filter(r => r !== role);
      delete permissionsData.rolePermissions[role];
      showPermissionsManagement();
  }
}

// =============================
// GESTIÓN DE CATEGORÍAS
// =============================

let categoriesData = [
  { id: 1, name: 'Pantallas', description: 'Reparación y reemplazo de pantallas' },
  { id: 2, name: 'Baterías', description: 'Reemplazo de baterías' },
  { id: 3, name: 'Software', description: 'Problemas de sistema operativo' }
];

function showCategoriesManagement() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Gestión de Categorías</h1>
          <button class="btn btn-sm btn-primary" onclick="showAddCategoryForm()">
              <i class="fas fa-plus me-1"></i> Nueva Categoría
          </button>
      </div>
      
      <div class="card">
          <div class="card-body">
              <div class="table-responsive">
                  <table class="table table-hover">
                      <thead class="table-dark">
                          <tr>
                              <th>ID</th>
                              <th>Nombre</th>
                              <th>Descripción</th>
                              <th>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${categoriesData.map(category => `
                              <tr>
                                  <td>${category.id}</td>
                                  <td>${category.name}</td>
                                  <td>${category.description}</td>
                                  <td>
                                      <button class="btn btn-sm btn-warning me-1" onclick="editCategory(${category.id})">
                                          <i class="fas fa-edit"></i>
                                      </button>
                                      <button class="btn btn-sm btn-danger" onclick="deleteCategory(${category.id})">
                                          <i class="fas fa-trash"></i>
                                      </button>
                                  </td>
                              </tr>
                          `).join('')}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  `;
}

function showAddCategoryForm(category = null) {
  const isEdit = category !== null;
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">${isEdit ? 'Editar' : 'Nueva'} Categoría</h1>
      </div>
      
      <div class="card">
          <div class="card-body">
              <form id="categoryForm" onsubmit="handleCategoryForm(event, ${isEdit ? category.id : 'null'})">
                  <div class="mb-3">
                      <label for="categoryName" class="form-label">Nombre</label>
                      <input type="text" class="form-control" id="categoryName" value="${isEdit ? category.name : ''}" required>
                  </div>
                  
                  <div class="mb-3">
                      <label for="categoryDescription" class="form-label">Descripción</label>
                      <textarea class="form-control" id="categoryDescription" rows="3">${isEdit ? category.description : ''}</textarea>
                  </div>
                  
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button type="button" class="btn btn-secondary me-md-2" onclick="showCategoriesManagement()">Cancelar</button>
                      <button type="submit" class="btn btn-primary">${isEdit ? 'Actualizar' : 'Guardar'}</button>
                  </div>
              </form>
          </div>
      </div>
  `;
}

function handleCategoryForm(event, categoryId = null) {
  event.preventDefault();
  
  const categoryData = {
      id: categoryId || Math.max(...categoriesData.map(c => c.id), 0) + 1,
      name: document.getElementById('categoryName').value,
      description: document.getElementById('categoryDescription').value
  };
  
  if (categoryId) {
      // Editar categoría existente
      const index = categoriesData.findIndex(c => c.id === categoryId);
      if (index !== -1) {
          categoriesData[index] = categoryData;
      }
  } else {
      // Agregar nueva categoría
      categoriesData.push(categoryData);
  }
  
  showCategoriesManagement();
}

function editCategory(categoryId) {
  const category = categoriesData.find(c => c.id === categoryId);
  if (category) {
      showAddCategoryForm(category);
  }
}

function deleteCategory(categoryId) {
  if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      categoriesData = categoriesData.filter(c => c.id !== categoryId);
      showCategoriesManagement();
  }
}


// =============================
// PERFIL DE USUARIO
// =============================

// Datos del usuario (simulados)
let currentUser = {
  id: 1,
  name: "Admin",
  lastName: "Sistema",
  email: "admin@fixpro.com",
  phone: "555-1234",
  avatar: "../assets/img/profile-placeholder.png",
  role: "Administrador",
  lastLogin: new Date().toLocaleString(),
  notifications: true,
  darkMode: false
};

// Función para mostrar el perfil
function showProfile() {
  const mainContent = document.getElementById('mainContent');

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
                      
                      <button class="btn btn-sm btn-outline-primary mb-2" onclick="document.getElementById('avatarUpload').click()">
                          <i class="fas fa-camera me-1"></i> Cambiar foto
                      </button>
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
                      <h5 class="card-title"><i class="fas fa-info-circle me-1"></i>Información de Cuenta</h5>
                      <ul class="list-group list-group-flush small">
                          <li class="list-group-item d-flex justify-content-between">
                              <span>Último acceso:</span>
                              <span class="text-muted">${currentUser.lastLogin}</span>
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
                          
                          <div class="mb-3">
                              <label for="inputBio" class="form-label">Biografía</label>
                              <textarea class="form-control" id="inputBio" rows="3" placeholder="Cuéntanos sobre ti">${currentUser.bio || ''}</textarea>
                          </div>
                          
                          <div class="d-flex justify-content-end">
                              <button type="button" class="btn btn-secondary me-2" onclick="loadAdminDashboard()">
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
      <div class="modal fade" id="passwordModal" tabindex="-1">
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

// =============================
// CONFIGURACIÓN DEL SISTEMA
// =============================

let systemSettings = {
  appName: "FixPro",
  maintenanceMode: false,
  notificationTypes: {
      email: true,
      push: true,
      sms: false
  },
  theme: "light",
  inventoryThreshold: 5,
  autoBackup: true
};

function showSystemSettings() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Configuración del Sistema</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
              <button class="btn btn-sm btn-success me-2" onclick="saveSystemSettings()">
                  <i class="fas fa-save me-1"></i> Guardar
              </button>
              <button class="btn btn-sm btn-outline-secondary" onclick="resetSettings()">
                  <i class="fas fa-undo me-1"></i> Restablecer
              </button>
          </div>
      </div>
      
      <div class="card mb-4">
          <div class="card-body">
              <h5 class="card-title"><i class="fas fa-sliders-h me-2"></i>Ajustes Generales</h5>
              <form id="systemSettingsForm">
                  <div class="row">
                      <div class="col-md-6">
                          <div class="mb-3">
                              <label for="appName" class="form-label">Nombre de la aplicación</label>
                              <input type="text" class="form-control" id="appName" value="${systemSettings.appName}">
                          </div>
                          
                          <div class="mb-3 form-check form-switch">
                              <input class="form-check-input" type="checkbox" id="maintenanceMode" ${systemSettings.maintenanceMode ? 'checked' : ''}>
                              <label class="form-check-label" for="maintenanceMode">Modo mantenimiento</label>
                          </div>
                          
                          <div class="mb-3">
                              <label for="inventoryThreshold" class="form-label">Umbral de inventario bajo</label>
                              <input type="number" class="form-control" id="inventoryThreshold" min="1" value="${systemSettings.inventoryThreshold}">
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="mb-3">
                              <label class="form-label">Tema de la aplicación</label>
                              <select class="form-select" id="theme">
                                  <option value="light" ${systemSettings.theme === 'light' ? 'selected' : ''}>Claro</option>
                                  <option value="dark" ${systemSettings.theme === 'dark' ? 'selected' : ''}>Oscuro</option>
                                  <option value="auto" ${systemSettings.theme === 'auto' ? 'selected' : ''}>Automático</option>
                              </select>
                          </div>
                          
                          <div class="mb-3 form-check form-switch">
                              <input class="form-check-input" type="checkbox" id="autoBackup" ${systemSettings.autoBackup ? 'checked' : ''}>
                              <label class="form-check-label" for="autoBackup">Copia de seguridad automática</label>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
      </div>
      
      <div class="card">
          <div class="card-body">
              <h5 class="card-title"><i class="fas fa-bell me-2"></i>Configuración de Notificaciones</h5>
              <div class="row">
                  <div class="col-md-4">
                      <div class="mb-3 form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="emailNotifications" ${systemSettings.notificationTypes.email ? 'checked' : ''}>
                          <label class="form-check-label" for="emailNotifications">Notificaciones por Email</label>
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="mb-3 form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="pushNotifications" ${systemSettings.notificationTypes.push ? 'checked' : ''}>
                          <label class="form-check-label" for="pushNotifications">Notificaciones Push</label>
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="mb-3 form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="smsNotifications" ${systemSettings.notificationTypes.sms ? 'checked' : ''}>
                          <label class="form-check-label" for="smsNotifications">Notificaciones por SMS</label>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;
}

function saveSystemSettings() {
  systemSettings = {
      appName: document.getElementById('appName').value,
      maintenanceMode: document.getElementById('maintenanceMode').checked,
      notificationTypes: {
          email: document.getElementById('emailNotifications').checked,
          push: document.getElementById('pushNotifications').checked,
          sms: document.getElementById('smsNotifications').checked
      },
      theme: document.getElementById('theme').value,
      inventoryThreshold: parseInt(document.getElementById('inventoryThreshold').value),
      autoBackup: document.getElementById('autoBackup').checked
  };
  
  alert('Configuración guardada correctamente');
  applyTheme(systemSettings.theme);
}

function resetSettings() {
  if (confirm('¿Restablecer configuración a valores por defecto?')) {
      systemSettings = {
          appName: "FixPro",
          maintenanceMode: false,
          notificationTypes: {
              email: true,
              push: true,
              sms: false
          },
          theme: "light",
          inventoryThreshold: 5,
          autoBackup: true
      };
      
      showSystemSettings();
      applyTheme('light');
  }
}

function applyTheme(theme) {
  if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark-theme');
  } else {
      document.body.classList.remove('dark-theme');
  }
}

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