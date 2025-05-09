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
// PERFIL DE USUARIO (GERENTE)
// =============================

// Datos del gerente (simulados)
let currentUser = {
  id: 2,
  name: "Juan",
  lastName: "Pérez",
  email: "gerente@fixpro.com",
  phone: "555-5678",
  avatar: "assets/img/profile-placeholder.png",
  role: "Gerente",
  lastLogin: new Date().toLocaleString(),
  notifications: true,
  darkMode: false,
  department: "Operaciones",
  hireDate: "15/03/2020"
};

// Función para mostrar el perfil del gerente
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
                    <h5 class="card-title"><i class="fas fa-info-circle me-1"></i>Información del Gerente</h5>
                    <ul class="list-group list-group-flush small">
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Departamento:</span>
                            <span class="text-muted">${currentUser.department}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Fecha de ingreso:</span>
                            <span class="text-muted">${currentUser.hireDate}</span>
                        </li>
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