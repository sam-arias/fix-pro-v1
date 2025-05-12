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
 * Muestra el dashboard principal del gerente con un diseño más premium.
 */
function showDashboard() {
  const content = document.getElementById('main-content');
  if (!content) return;

  content.innerHTML = `
    <div class="row mb-4">
      ${createStatCard('Ventas', `$${managerData.stats.sales.toLocaleString()}`, 'Este mes', 'bg-gradient-primary', 'fas fa-dollar-sign')}
      ${createStatCard('Órdenes', managerData.stats.orders, 'Totales', 'bg-gradient-success', 'fas fa-clipboard-list')}
      ${createStatCard('Completadas', managerData.stats.completed, 'Órdenes', 'bg-gradient-warning', 'fas fa-check-circle')}
      ${createStatCard('Pendientes', managerData.stats.pending, 'Órdenes', 'bg-gradient-info', 'fas fa-clock')}
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-gradient-light text-dark">
            <h5 class="mb-0"><i class="fas fa-history me-2"></i>Órdenes recientes</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
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
                        <span class="badge rounded-pill ${
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
        <div class="card shadow-sm border-0">
          <div class="card-header bg-gradient-light text-dark">
            <h5 class="mb-0"><i class="fas fa-chart-pie me-2"></i>Ventas por categoría</h5>
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
 * Crea una tarjeta de estadísticas con un diseño premium.
 * @param {string} title - Título de la tarjeta.
 * @param {string|number} value - Valor principal.
 * @param {string} subtitle - Subtítulo.
 * @param {string} bgClass - Clase de fondo.
 * @param {string} iconClass - Clase del ícono.
 * @returns {string} HTML de la tarjeta.
 */
function createStatCard(title, value, subtitle, bgClass, iconClass) {
  return `
    <div class="col-md-3">
      <div class="card ${bgClass} text-white shadow-sm border-0">
        <div class="card-body d-flex align-items-center">
          <div class="me-3">
            <i class="${iconClass} fa-2x"></i>
          </div>
          <div>
            <h5 class="card-title mb-1">${title}</h5>
            <h2 class="card-stat mb-0">${value}</h2>
            <p class="small mb-0">${subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  `;
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

/**
 * Muestra el perfil del gerente con un diseño más premium.
 */
function showProfile() {
  const mainContent = document.getElementById('main-content');
  
  mainContent.innerHTML = `
    <div class="row">
      <!-- Avatar Section -->
      <div class="col-md-4">
        <div class="card shadow-sm border-0">
          <div class="card-body text-center">
            <img src="${currentUser.avatar}" 
                 alt="Avatar" 
                 class="rounded-circle mb-3 border border-3 border-light shadow-sm" 
                 width="150" 
                 height="150"
                 id="profileAvatarImg">
            <h4 class="fw-bold">${currentUser.name} ${currentUser.lastName}</h4>
            <p class="text-muted mb-1">${currentUser.role}</p>
            <p class="text-muted">${currentUser.email}</p>
            <button class="btn btn-outline-primary btn-sm mt-2" onclick="document.getElementById('avatarUpload').click()">
              <i class="fas fa-camera me-1"></i> Cambiar foto
            </button>
            <input type="file" id="avatarUpload" style="display: none;" accept="image/*" onchange="updateAvatar(event)">
          </div>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="col-md-8">
        <div class="card shadow-sm border-0">
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
                <button type="button" class="btn btn-secondary me-2" onclick="showDashboard()">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="updateProfile()">Guardar Cambios</button>
              </div>
            </form>
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

// Función para actualizar el perfil
function updateProfile() {
  currentUser = {
    ...currentUser,
    name: document.getElementById('inputFirstName').value,
    lastName: document.getElementById('inputLastName').value,
    email: document.getElementById('inputEmail').value,
    phone: document.getElementById('inputPhone').value,
  };

  alert('Perfil actualizado correctamente');
  showProfile(); // Recargar la vista
}