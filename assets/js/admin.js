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

function loadAdminDashboard() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card stats-card bg-success text-white" onclick="showInterventionOrders()">
          <div class="card-body">
            <h5 class="card-title">Órdenes totales</h5>
            <h2 class="card-text">✔️ ${adminData.orders || 0}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card stats-card bg-warning text-dark" onclick="showPartsManagement()">
          <div class="card-body">
            <h5 class="card-title">Repuestos bajos</h5>
            <h2 class="card-text">⚠️ ${adminData.lowStock || 0}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card stats-card bg-danger text-white" onclick="showInterventionOrders('atrasadas')">
          <div class="card-body">
            <h5 class="card-title">Órdenes atrasadas</h5>
            <h2 class="card-text">❌ ${adminData.lateOrders || 0}</h2>
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
            ${adminData.parts && adminData.parts.length > 0
              ? adminData.parts
                  .filter(part => part.stock <= part.minStock)
                  .map(part => `<div class="alert alert-warning"><strong>Repuesto bajo:</strong> ${part.description}</div>`)
                  .join('')
              : '<div class="alert alert-info">No hay alertas de repuestos bajos.</div>'}
            ${ordersData && ordersData.length > 0
              ? ordersData
                  .filter(order => new Date(order.estimatedDate) < new Date() && order.status !== 'Completada')
                  .map(order => `<div class="alert alert-danger"><strong>Orden atrasada:</strong> #${order.id}</div>`)
                  .join('')
              : '<div class="alert alert-info">No hay órdenes atrasadas.</div>'}
            ${adminData.technicians && adminData.technicians.length > 0
              ? adminData.technicians
                  .filter(tech => new Date(tech.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                  .map(tech => `<div class="alert alert-info"><strong>Nuevo técnico:</strong> ${tech.name}</div>`)
                  .join('')
              : '<div class="alert alert-info">No hay nuevos técnicos registrados recientemente.</div>'}
          </div>
        </div>
      </div>
    </div>
  `;
  
  initAdminCharts();
}

function initAdminCharts() {
  const ctx = document.getElementById('ordersChart').getContext('2d');
  const monthlyOrders = Array(12).fill(0);

  // Simulación de datos dinámicos
  ordersData.forEach(order => {
    const month = new Date(order.date).getMonth();
    monthlyOrders[month]++;
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
        label: 'Órdenes por mes',
        data: monthlyOrders,
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
// MÓDULO DE INVENTARIO Y REPUESTOS
// =============================

let inventoryData = [];
let currentPage = 1;
const itemsPerPage = 10;

/**
 * Muestra la vista de inventario y repuestos
 */
function showInventory() {
  const content = document.getElementById('mainContent');
  if (!content) return;

  content.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Gestión de Repuestos</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <button type="button" class="btn btn-sm btn-primary" onclick="showAddPartForm()">
          <i class="fas fa-plus me-1"></i> Nuevo Producto
        </button>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <div class="input-group">
          <input type="text" id="inventorySearch" class="form-control" placeholder="Buscar producto..." 
                onkeyup="filterInventory()">
          <button class="btn btn-outline-secondary" type="button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div class="col-md-4">
        <select class="form-select" id="inventoryTypeFilter" onchange="filterInventory()">
          <option value="">Todos los Tipos</option>
          <option value="Pantalla">Pantalla</option>
          <option value="Batería">Batería</option>
          <option value="Puerto de carga">Puerto de carga</option>
          <option value="Micrófono">Micrófono</option>
          <option value="Parlante">Parlante</option>
          <option value="Cámara">Cámara</option>
          <option value="Lógica de carga">Lógica de carga</option>
          <option value="FPC">FPC</option>
        </select>
      </div>
      <div class="col-md-4">
        <select class="form-select" id="inventoryStatusFilter" onchange="filterInventory()">
          <option value="">Todos los Estados</option>
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
            <th>Tipo</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="inventoryTableBody">
          <!-- Los datos se cargarán dinámicamente -->
        </tbody>
      </table>
    </div>

    <nav>
      <ul class="pagination justify-content-center" id="pagination">
        <!-- Botones de paginación -->
      </ul>
    </nav>
  `;

  filterInventory(); // Cargar los datos del inventario con filtros aplicados
}

/**
 * Filtra y carga los datos del inventario en la tabla
 */
function filterInventory() {
  const searchQuery = document.getElementById('inventorySearch').value.toLowerCase();
  const typeFilter = document.getElementById('inventoryTypeFilter').value;
  const statusFilter = document.getElementById('inventoryStatusFilter').value;

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery) || item.code.toLowerCase().includes(searchQuery);
    const matchesType = !typeFilter || item.type === typeFilter;
    const matchesStatus = !statusFilter || getStockStatus(item.stock) === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  loadInventoryTable(filteredData);
}

/**
 * Carga los datos del inventario en la tabla con paginación
 */
function loadInventoryTable(data) {
  const tbody = document.getElementById('inventoryTableBody');
  const pagination = document.getElementById('pagination');
  if (!tbody || !pagination) return;

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  tbody.innerHTML = data.slice(startIndex, endIndex).map(item => `
    <tr>
      <td>${item.code}</td>
      <td>${item.type}</td>
      <td>${item.description}</td>
      <td>${item.brand || 'N/A'}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${item.stock}</td>
      <td>${getStockStatus(item.stock)}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editPart('${item.code}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deletePart('${item.code}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');

  pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
    <li class="page-item ${i + 1 === currentPage ? 'active' : ''}">
      <button class="page-link" onclick="changePage(${i + 1})">${i + 1}</button>
    </li>
  `).join('');
}

/**
 * Cambia la página actual y recarga la tabla
 */
function changePage(page) {
  currentPage = page;
  filterInventory();
}

/**
 * Obtiene el estado del stock basado en la cantidad
 */
function getStockStatus(stock) {
  if (stock === 0) return 'Agotado';
  if (stock < 5) return 'Bajo stock';
  return 'Disponible';
}

/**
 * Muestra el formulario para agregar o editar un repuesto
 */
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
              <label for="partType" class="form-label">Tipo</label>
              <select class="form-select" id="partType" required>
                <option value="">Seleccione...</option>
                <option value="Pantalla" ${partData?.type === 'Pantalla' ? 'selected' : ''}>Pantalla</option>
                <option value="Batería" ${partData?.type === 'Batería' ? 'selected' : ''}>Batería</option>
                <option value="Puerto de carga" ${partData?.type === 'Puerto de carga' ? 'selected' : ''}>Puerto de carga</option>
                <option value="Micrófono" ${partData?.type === 'Micrófono' ? 'selected' : ''}>Micrófono</option>
                <option value="Parlante" ${partData?.type === 'Parlante' ? 'selected' : ''}>Parlante</option>
                <option value="Cámara" ${partData?.type === 'Cámara' ? 'selected' : ''}>Cámara</option>
                <option value="FPC" ${partData?.type === 'FPC' ? 'selected' : ''}>FPC</option>
                <option value="Lógica de carga" ${partData?.type === 'Lógica de carga' ? 'selected' : ''}>Lógica de carga</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="partBrand" class="form-label">Marca</label>
              <input type="text" class="form-control" id="partBrand" value="${partData?.brand || ''}">
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="partDescription" class="form-label">Modelo</label>
              <input type="text" class="form-control" id="partDescription" value="${partData?.description || ''}" required>
            </div>
            <div class="mb-3">
              <label for="partPrice" class="form-label">Precio unitario</label>
              <input type="number" class="form-control" id="partPrice" min="0" step="0.01" value="${partData?.price || 0}" required>
            </div>
            <div class="mb-3">
              <label for="partStock" class="form-label">Stock</label>
              <input type="number" class="form-control" id="partStock" min="0" value="${partData?.stock || 0}" required>
            </div>
          </div>
        </div>
        
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" class="btn btn-secondary me-md-2" onclick="showInventory()">Cancelar</button>
          <button type="submit" class="btn btn-primary">${isEdit ? 'Actualizar' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  `;
}

/**
 * Maneja el envío del formulario de repuestos
 */
function handlePartForm(event, partCode = null) {
  event.preventDefault();

  const partData = {
    code: document.getElementById('partCode').value,
    description: document.getElementById('partDescription').value,
    type: document.getElementById('partType').value,
    brand: document.getElementById('partBrand').value,
    stock: parseInt(document.getElementById('partStock').value),
    price: parseFloat(document.getElementById('partPrice').value)
  };

  if (partCode) {
    // Editar repuesto existente
    const index = inventoryData.findIndex(p => p.code === partCode);
    if (index !== -1) {
      inventoryData[index] = partData;
    }
  } else {
    // Agregar nuevo repuesto
    inventoryData.push(partData);
  }

  showInventory();
}

/**
 * Edita un repuesto existente
 */
function editPart(code) {
  const part = inventoryData.find(p => p.code === code);
  if (part) {
    showAddPartForm(part);
  }
}

/**
 * Elimina un repuesto existente
 */
function deletePart(code) {
  if (confirm('¿Está seguro de eliminar este repuesto?')) {
    inventoryData = inventoryData.filter(p => p.code !== code);
    showInventory();
  }
}


// =============================
// GESTIÓN DE Personal
// =============================

let personalCurrentPage = 1;
const personalItemsPerPage = 10;

function showPersonalManagement() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Gestión de Personal</h1>
      <button class="btn btn-success" onclick="showAddPersonalForm()">
        <i class="fas fa-plus me-2"></i>Agregar Personal
      </button>
    </div>

    <div class="row mb-3">
      <div class="col-md-6">
        <input 
          type="text" 
          class="form-control mb-2" 
          id="personalSearch" 
          placeholder="Buscar por nombre..." 
          onkeyup="filterPersonal()"
        >
      </div>
      <div class="col-md-6">
        <select 
          class="form-select" 
          id="roleFilter" 
          onchange="filterPersonal()"
        >
          <option value="">Todos los Roles</option>
          <option value="Técnico">Técnico</option>
          <option value="Asesor">Asesor</option>
          <option value="Administrador">Administrador</option>
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover admin-table">
        <thead class="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="personalTableBody">
          <!-- Datos cargados dinámicamente -->
        </tbody>
      </table>
    </div>

    <nav>
      <ul class="pagination justify-content-center" id="personalPagination">
        <!-- Botones de paginación -->
      </ul>
    </nav>
  `;

  filterPersonal(); // Cargar datos iniciales
}

function filterPersonal() {
  const searchQuery = document.getElementById('personalSearch').value.toLowerCase();
  const roleFilter = document.getElementById('roleFilter').value;

  const filteredData = adminData.technicians.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery);
    const matchesRole = !roleFilter || person.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  loadPersonalTable(filteredData);
}

function loadPersonalTable(data) {
  const tbody = document.getElementById('personalTableBody');
  const pagination = document.getElementById('personalPagination');
  if (!tbody || !pagination) return;

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / personalItemsPerPage);
  const startIndex = (personalCurrentPage - 1) * personalItemsPerPage;
  const endIndex = Math.min(startIndex + personalItemsPerPage, totalItems);

  tbody.innerHTML = data.slice(startIndex, endIndex).map(person => `
    <tr>
      <td>${person.name}</td>
      <td>${person.email}</td>
      <td>${person.phone || 'N/A'}</td>
      <td>${person.address || 'N/A'}</td>
      <td>${person.role}</td>
      <td>
        <span class="badge ${person.status === 'Disponible' ? 'bg-success' : 'bg-secondary'}">
          ${person.status}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-primary me-1" onclick="viewPersonal(${person.id})">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-sm btn-warning me-1" onclick="editPersonal(${person.id})">
          <i class="fas fa-edit"></i>
        </button>
      </td>
    </tr>
  `).join('');

  pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
    <li class="page-item ${i + 1 === personalCurrentPage ? 'active' : ''}">
      <button class="page-link" onclick="changePersonalPage(${i + 1})">${i + 1}</button>
    </li>
  `).join('');
}

function changePersonalPage(page) {
  personalCurrentPage = page;
  filterPersonal();
}

function showAddPersonalForm(personData = null) {
  const mainContent = document.getElementById('mainContent');
  const isEdit = personData !== null;
  
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">${isEdit ? 'Editar' : 'Agregar'} Personal</h1>
    </div>
    
    <div class="admin-form">
      <form id="personalForm" onsubmit="handlePersonalForm(event, ${isEdit ? personData.id : 'null'})">
        <h5 class="mb-3"><i class="fas fa-user-tie me-2"></i>Datos personales</h5>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="personName" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="personName" value="${personData?.name?.split(' ')[0] || ''}" required>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="personLastName" class="form-label">Apellidos</label>
              <input type="text" class="form-control" id="personLastName" value="${personData?.name?.split(' ').slice(1).join(' ') || ''}" required>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="personEmail" class="form-label">Email</label>
              <input type="email" class="form-control" id="personEmail" value="${personData?.email || ''}" required>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="personPhone" class="form-label">Teléfono</label>
              <input type="tel" class="form-control" id="personPhone" value="${personData?.phone || ''}">
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="personAddress" class="form-label">Dirección</label>
          <input type="text" class="form-control" id="personAddress" value="${personData?.address || ''}">
        </div>

        <h5 class="mb-3 mt-4"><i class="fas fa-key me-2"></i>Datos de acceso</h5>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="personUsername" class="form-label">Usuario</label>
              <input type="text" class="form-control" id="personUsername" value="${personData?.username || ''}" ${isEdit ? 'readonly' : 'required'}>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="personPassword" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="personPassword" ${isEdit ? 'placeholder="Dejar en blanco para no cambiar"' : 'required'}>
            </div>
          </div>
        </div>
        
        <h5 class="mb-3 mt-4"><i class="fas fa-user-tag me-2"></i>Rol</h5>
        <div class="mb-3">
          <select class="form-select" id="personRole" required>
            <option value="Técnico" ${personData?.role === 'Técnico' ? 'selected' : ''}>Técnico</option>
            <option value="Asesor" ${personData?.role === 'Asesor' ? 'selected' : ''}>Asesor</option>
            <option value="Administrador" ${personData?.role === 'Administrador' ? 'selected' : ''}>Administrador</option>
          </select>
        </div>
        
        <div class="mb-3 mt-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="personActive" ${!personData || personData.status === 'Disponible' ? 'checked' : ''}>
            <label class="form-check-label" for="personActive">Personal activo</label>
          </div>
        </div>
        
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button type="button" class="btn btn-secondary me-md-2" onclick="showPersonalManagement()">Cancelar</button>
          <button type="submit" class="btn btn-primary">${isEdit ? 'Actualizar' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  `;
}

function handlePersonalForm(event, personId = null) {
  event.preventDefault();
  
  const personData = {
    id: personId || Math.max(...adminData.technicians.map(p => p.id), 0) + 1,
    name: `${document.getElementById('personName').value} ${document.getElementById('personLastName').value}`,
    email: document.getElementById('personEmail').value,
    phone: document.getElementById('personPhone').value,
    address: document.getElementById('personAddress').value,
    username: document.getElementById('personUsername').value,
    role: document.getElementById('personRole').value,
    status: document.getElementById('personActive').checked ? 'Disponible' : 'Inactivo'
  };
  
  const password = document.getElementById('personPassword').value;
  if (password) {
    personData.password = password; // En una app real, esto debería encriptarse
  }
  
  if (personId) {
    // Editar personal existente
    const index = adminData.technicians.findIndex(p => p.id === personId);
    if (index !== -1) {
      adminData.technicians[index] = personData;
    }
  } else {
    // Agregar nuevo personal
    adminData.technicians.push(personData);
  }
  
  showPersonalManagement();
}

function editPersonal(id) {
  const person = adminData.technicians.find(p => p.id === id);
  if (person) {
    showAddPersonalForm(person);
  }
}

function viewPersonal(id) {
  const person = adminData.technicians.find(p => p.id === id);
  if (!person) return;

  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = `
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Detalles de Personal</h1>
      <button class="btn btn-secondary" onclick="showPersonalManagement()">
        <i class="fas fa-arrow-left me-2"></i>Volver
      </button>
    </div>
    
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"><i class="fas fa-user me-2"></i>${person.name}</h5>
        <p><strong>Email:</strong> ${person.email}</p>
        <p><strong>Teléfono:</strong> ${person.phone || 'N/A'}</p>
        <p><strong>Dirección:</strong> ${person.address || 'N/A'}</p>
        <p><strong>Rol:</strong> ${person.role}</p>
        <p><strong>Estado:</strong> 
          <span class="badge ${person.status === 'Disponible' ? 'bg-success' : 'bg-secondary'}">
            ${person.status}
          </span>
        </p>
      </div>
    </div>
  `;
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
      <div class="col-lg-6 col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-chart-pie me-2"></i>Órdenes por estado</h5>
            <canvas id="statusChart" width="400" height="250"></canvas>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-chart-bar me-2"></i>Órdenes mensuales</h5>
            <canvas id="monthlyChart" width="400" height="250"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-lg-6 col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-tools me-2"></i>Tipos de problemas reportados</h5>
            <canvas id="problemTypeChart" width="400" height="250"></canvas>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xl-4">
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
  // Datos dinámicos para las gráficas
  const orderStatuses = ordersData.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const monthlyOrders = Array(12).fill(0);
  ordersData.forEach(order => {
    const month = new Date(order.date.split('/').reverse().join('-')).getMonth();
    monthlyOrders[month]++;
  });

  const problemTypes = ordersData.reduce((acc, order) => {
    acc[order.problem] = (acc[order.problem] || 0) + 1;
    return acc;
  }, {});

  const technicianProductivity = adminData.technicians.map(tech => {
    return ordersData.filter(order => order.technician === tech.name && order.status === 'Completada').length;
  });

  // Gráfico de estado de órdenes
  new Chart(document.getElementById('statusChart'), {
    type: 'pie',
    data: {
      labels: Object.keys(orderStatuses),
      datasets: [{
        data: Object.values(orderStatuses),
        backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545']
      }]
    }
  });
  
  // Gráfico de órdenes mensuales
  new Chart(document.getElementById('monthlyChart'), {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
        label: 'Órdenes',
        data: monthlyOrders,
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      }]
    }
  });
  
  // Gráfico de tipos de problemas reportados
  new Chart(document.getElementById('problemTypeChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(problemTypes),
      datasets: [{
        data: Object.values(problemTypes),
        backgroundColor: ['#007bff', '#6c757d', '#28a745', '#ffc107', '#dc3545']
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
        data: technicianProductivity,
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

let ordersData = [];

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
                <label for="estimatedDate" class="form-label">Fecha y hora estimada</label>
                <input type="datetime-local" class="form-control" id="estimatedDate" value="${isEdit ? order.estimatedDate || '' : ''}">
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
  document.getElementById('estimatedDate').min = new Date().toISOString().slice(0, 16);
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
      estimatedDate: document.getElementById('estimatedDate').value,
      status: 'Pendiente',
      date: new Date().toLocaleString('es-ES')
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
                  <div class="col-md-6">
                      <p><strong>Técnico Asignado:</strong> ${order.technician || 'Sin asignar'}</p>
                  </div>
                  <div class="col-md-6">
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
  roles: [],
  permissions: {},
  rolePermissions: {}
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
// PERFIL DE USUARIO
// =============================

// Datos del usuario (simulados, se deben cargar dinámicamente)
let currentUser = {};

/**
 * Carga los datos del usuario desde el servidor o almacenamiento local
 */
function loadUserProfile() {
  // Simulación de carga de datos desde el servidor o localStorage
  currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
    id: null,
    name: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "./assets/img/profile-placeholder.png", // Ruta de la imagen por defecto
    role: "",
    lastLogin: "",
    notifications: false,
    darkMode: false
  };
}

/**
 * Guarda los datos del usuario en el servidor o almacenamiento local
 */
function saveUserProfile() {
  // Simulación de guardado en localStorage (en una app real, enviar al servidor)
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

/**
 * Muestra el perfil del usuario
 */
function showProfile() {
  loadUserProfile(); // Asegurarse de cargar los datos actualizados

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

/**
 * Actualiza el avatar del usuario
 */
function updateAvatar(event) {
  const file = event.target.files[0];
  if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('profileAvatarImg').src = e.target.result;
          currentUser.avatar = e.target.result;
          saveUserProfile(); // Guardar cambios
      };
      reader.readAsDataURL(file);
  } else {
      alert('Por favor selecciona un archivo de imagen válido');
  }
}

/**
 * Muestra el modal para cambiar la contraseña
 */
function showPasswordModal() {
  const passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
  passwordModal.show();
}

/**
 * Cambia la contraseña del usuario
 */
function changePassword() {
  const currentPass = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirmPass = document.getElementById('confirmPassword').value;
  
  if (newPass !== confirmPass) {
      alert('Las contraseñas no coinciden');
      return;
  }
  
  if (newPass.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
  }
  
  alert('Contraseña cambiada exitosamente');
  const passwordModal = bootstrap.Modal.getInstance(document.getElementById('passwordModal'));
  passwordModal.hide();
}

/**
 * Actualiza el perfil del usuario
 */
function updateProfile() {
  currentUser = {
      ...currentUser,
      name: document.getElementById('inputFirstName').value,
      lastName: document.getElementById('inputLastName').value,
      email: document.getElementById('inputEmail').value,
      phone: document.getElementById('inputPhone').value,
      bio: document.getElementById('inputBio').value
  };
  
  saveUserProfile(); // Guardar cambios
  alert('Perfil actualizado correctamente');
  showProfile(); // Recargar la vista
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