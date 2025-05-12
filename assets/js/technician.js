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

// ======================
// FUNCIONES DEL DASHBOARD
// ======================

function loadTechnicianDashboard() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
      <div class="row mb-6">
        <div class="col-md-6">
          <div class="card stats-card primary">
            <div class="card-body">
              <h5 class="card-title">Órdenes asignadas</h5>
              <h2 class="card-text">${technicianData.stats.assigned}</h2>
              <p class="small text-muted">+1 desde ayer</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card stats-card success">
            <div class="card-body">
              <h5 class="card-title">Completadas</h5>
              <h2 class="card-text">${technicianData.stats.completed}</h2>
              <p class="small text-muted">Esta semana</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><i class="fas fa-tasks me-2"></i>Mis órdenes asignadas</h5>
              <div class="table-responsive">
                <table class="table table-hover" id="assignedOrdersTable">
                  <thead>
                    <tr>
                      <th>Orden #</th>
                      <th>Cliente</th>
                      <th>Dispositivo</th>
                      <th>Problema</th>
                      <th>Fecha asignación</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${technicianData.assignedOrders.map(order => `
                      <tr>
                        <td>${order.id}</td>
                        <td>${order.client}</td>
                        <td>${order.device}</td>
                        <td>${order.problem}</td>
                        <td>${formatDate(order.assignedDate)}</td>
                        <td><span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
                        <td>
                          <button class="btn btn-sm btn-primary me-1" onclick="viewOrderDetails(${order.id})">
                            <i class="fas fa-eye"></i>
                          </button>
                          ${order.status !== 'Completada' ? `
                          <button class="btn btn-sm btn-success" onclick="completeOrder(${order.id})">
                            <i class="fas fa-check"></i>
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
        </div>
      </div>
    `;
}

// =============================
// GESTIÓN DE ESPECIALIDADES
// =============================

function showSpecialties() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Mis Especialidades</h1>
        <button class="btn btn-primary" onclick="showAddSpecialtyForm()">
          <i class="fas fa-plus me-2"></i>Agregar especialidad
        </button>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Especialidad</th>
                  <th>Nivel</th>
                  <th>Certificación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${technicianData.specialties.map((specialty, index) => `
                  <tr>
                    <td>${specialty}</td>
                    <td>
                      <select class="form-select form-select-sm specialty-level" 
                              data-index="${index}" 
                              onchange="updateSpecialtyLevel(${index}, this.value)">
                        <option value="Básico">Básico</option>
                        <option value="Intermedio" selected>Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                    </td>
                    <td>
                      <span class="badge bg-success">
                        <i class="fas fa-certificate me-1"></i>Certificado
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-danger" onclick="removeSpecialty(${index})">
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

function showAddSpecialtyForm() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Agregar Especialidad</h1>
      </div>
      
      <div class="card">
        <div class="card-body">
          <form id="addSpecialtyForm" onsubmit="addSpecialty(event)">
            <div class="mb-3">
              <label for="specialtyName" class="form-label">Nombre de la especialidad</label>
              <input type="text" class="form-control" id="specialtyName" required>
            </div>
            
            <div class="mb-3">
              <label for="specialtyLevel" class="form-label">Nivel de competencia</label>
              <select class="form-select" id="specialtyLevel" required>
                <option value="Básico">Básico</option>
                <option value="Intermedio" selected>Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
            
            <div class="mb-3">
              <label for="certificationFile" class="form-label">Certificación (opcional)</label>
              <input class="form-control" type="file" id="certificationFile">
            </div>
            
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="button" class="btn btn-secondary me-md-2" onclick="showSpecialties()">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `;
}

function addSpecialty(event) {
    event.preventDefault();
    const specialtyName = document.getElementById('specialtyName').value;
    
    if (technicianData.specialties.includes(specialtyName)) {
      alert('Ya tienes esta especialidad registrada');
      return;
    }
    
    technicianData.specialties.push(specialtyName);
    showSpecialties();
}

function updateSpecialtyLevel(index, level) {
    // Aquí iría la lógica para actualizar el nivel en la base de datos
    console.log(`Actualizando especialidad ${technicianData.specialties[index]} a nivel ${level}`);
}

function removeSpecialty(index) {
    if (confirm(`¿Eliminar la especialidad ${technicianData.specialties[index]}?`)) {
      technicianData.specialties.splice(index, 1);
      showSpecialties();
    }
}

// =============================
// GESTIÓN DE ÓRDENES
// =============================

function showAssignedOrders() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Órdenes Asignadas</h1>
        <div class="btn-group">
          <button class="btn btn-outline-secondary" onclick="filterOrders('all')">Todas</button>
          <button class="btn btn-outline-primary" onclick="filterOrders('pending')">Pendientes</button>
          <button class="btn btn-outline-warning" onclick="filterOrders('in-progress')">En progreso</button>
          <button class="btn btn-outline-success" onclick="filterOrders('completed')">Completadas</button>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Orden #</th>
                  <th>Cliente</th>
                  <th>Dispositivo</th>
                  <th>Problema</th>
                  <th>Fecha asignación</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="ordersTableBody">
                ${technicianData.assignedOrders.map(order => `
                  <tr>
                    <td>${order.id}</td>
                    <td>${order.client}</td>
                    <td>${order.device}</td>
                    <td>${order.problem}</td>
                    <td>${formatDate(order.assignedDate)}</td>

                    <td><span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
                    <td>
                      <button class="btn btn-sm btn-primary me-1" onclick="viewOrderDetails(${order.id})">
                        <i class="fas fa-eye"></i>
                      </button>
                      ${order.status !== 'Completada' ? `
                      <button class="btn btn-sm btn-success me-1" onclick="updateOrderStatus(${order.id}, 'En progreso')">
                        <i class="fas fa-play"></i>
                      </button>
                      <button class="btn btn-sm btn-success" onclick="completeOrder(${order.id})">
                        <i class="fas fa-check"></i>
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

function filterOrders(status) {
    const tbody = document.getElementById('ordersTableBody');
    let filteredOrders = technicianData.assignedOrders;
    
    switch(status) {
      case 'pending':
        filteredOrders = technicianData.assignedOrders.filter(o => o.status === 'Pendiente');
        break;
      case 'in-progress':
        filteredOrders = technicianData.assignedOrders.filter(o => o.status === 'En progreso');
        break;
      case 'completed':
        filteredOrders = technicianData.assignedOrders.filter(o => o.status === 'Completada');
        break;
    }
    
    tbody.innerHTML = filteredOrders.map(order => `
      <tr>
        <td>${order.id}</td>
        <td>${order.client}</td>
        <td>${order.device}</td>
        <td>${order.problem}</td>
        <td>${formatDate(order.assignedDate)}</td>
        <td><span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
        <td>
          <button class="btn btn-sm btn-primary me-1" onclick="viewOrderDetails(${order.id})">
            <i class="fas fa-eye"></i>
          </button>
          ${order.status !== 'Completada' ? `
          <button class="btn btn-sm btn-success me-1" onclick="updateOrderStatus(${order.id}, 'En progreso')">
            <i class="fas fa-play"></i>
          </button>
          <button class="btn btn-sm btn-success" onclick="completeOrder(${order.id})">
            <i class="fas fa-check"></i>
          </button>
          ` : ''}
        </td>
      </tr>
    `).join('');
}

function viewOrderDetails(orderId) {
    const order = technicianData.assignedOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Detalles de Orden #${order.id}</h1>
        <button class="btn btn-outline-secondary" onclick="showAssignedOrders()">
          <i class="fas fa-arrow-left me-1"></i> Volver
        </button>
      </div>
      
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <h5><i class="fas fa-user me-2"></i>Información del Cliente</h5>
              <p><strong>Nombre:</strong> ${order.client}</p>
              <p><strong>Teléfono:</strong> 555-1234</p>
              <p><strong>Email:</strong> cliente@example.com</p>
            </div>
            <div class="col-md-6">
              <h5><i class="fas fa-laptop me-2"></i>Información del Dispositivo</h5>
              <p><strong>Dispositivo:</strong> ${order.device}</p>
              <p><strong>Problema:</strong> ${order.problem}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title"><i class="fas fa-tasks me-2"></i>Progreso de la Reparación</h5>
          
          <div class="mb-3">
            <label class="form-label">Estado actual</label>
            <select class="form-select" id="orderStatus" onchange="updateOrderStatus(${order.id}, this.value)">
              <option value="Pendiente" ${order.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
              <option value="En progreso" ${order.status === 'En progreso' ? 'selected' : ''}>En progreso</option>
              <option value="Completada" ${order.status === 'Completada' ? 'selected' : ''}>Completada</option>
            </select>
          </div>
          
          <div class="mb-3">
            <label for="orderNotes" class="form-label">Notas de la reparación</label>
            <textarea class="form-control" id="orderNotes" rows="3" placeholder="Agregar notas sobre el proceso de reparación..."></textarea>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Partes utilizadas</label>
            <div class="list-group mb-2">
              <div class="list-group-item d-flex justify-content-between align-items-center">
                Pantalla iPhone 12
                <span class="badge bg-primary">1</span>
              </div>
              <div class="list-group-item d-flex justify-content-between align-items-center">
                Adhesivo para pantalla
                <span class="badge bg-primary">1</span>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-primary" onclick="addPartToOrder(${order.id})">
              <i class="fas fa-plus me-1"></i> Agregar parte
            </button>
          </div>
          
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary" onclick="saveOrderDetails(${order.id})">
              <i class="fas fa-save me-1"></i> Guardar cambios
            </button>
          </div>
        </div>
      </div>
    `;
}

function updateOrderStatus(orderId, newStatus) {
    const order = technicianData.assignedOrders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      
      if (newStatus === 'Completada') {
        completeOrder(orderId);
        return;
      }
      
      showSuccess(`Estado de la orden #${orderId} actualizado a "${newStatus}"`);
      
      // Actualizar la vista actual
      if (document.getElementById('orderStatus')) {
        document.getElementById('orderStatus').value = newStatus;
      }
    }
}

function completeOrder(orderId) {
    if (!confirm('¿Marcar esta orden como completada?')) return;
    
    const order = technicianData.assignedOrders.find(o => o.id === orderId);
    if (order) {
      order.status = 'Completada';
      order.completionDate = new Date().toISOString().split('T')[0];
      technicianData.stats.completed++;
      
      showSuccess(`Orden #${orderId} marcada como completada`);
      showAssignedOrders();
    }
}

function saveOrderDetails(orderId) {
    const notes = document.getElementById('orderNotes').value;
    // Aquí iría la lógica para guardar las notas en la base de datos
    showSuccess('Cambios guardados correctamente');
}

function addPartToOrder(orderId) {
    // Implementar lógica para agregar partes a la orden
    alert(`Agregar parte a la orden #${orderId}`);
}

// =============================
// NOTIFICACIONES
// =============================

let notifications = [];

function showNotifications() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Notificaciones</h1>
        <button class="btn btn-outline-danger" onclick="clearAllNotifications()">
          <i class="fas fa-trash me-1"></i> Limpiar todo
        </button>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="list-group">
            ${notifications.map(notification => `
              <a href="#" class="list-group-item list-group-item-action ${!notification.read ? 'active' : ''}" 
                 onclick="viewNotification(${notification.id})">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">${notification.title}</h5>
                  <small>${formatTimeAgo(notification.date)}</small>
                </div>
                <p class="mb-1">${notification.message}</p>
                <small class="text-muted">${formatNotificationType(notification.type)}</small>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
}

function viewNotification(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (!notification) return;
    
    // Marcar como leída
    notification.read = true;
    
    // Mostrar detalles según el tipo de notificación
    switch(notification.type) {
      case 'assignment':
        // Redirigir a la orden asignada
        const orderId = parseInt(notification.message.match(/#(\d+)/)[1]);
        viewOrderDetails(orderId);
        break;
      default:
        alert(notification.message);
        showNotifications(); // Recargar notificaciones
    }
}

function clearAllNotifications() {
    if (confirm('¿Eliminar todas las notificaciones?')) {
      notifications = notifications.filter(n => !n.read);
      showNotifications();
    }
}

// =============================
// PERFIL DE USUARIO - TÉCNICO
// =============================

// Datos del técnico (simulados)
let currentUser = {
  id: null,
  name: "",
  lastName: "",
  email: "",
  phone: "",
  avatar: "assets/img/profile-placeholder.png",
  role: "",
  specialty: "",
  experience: "",
  lastLogin: "",
  notifications: false,
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
                                  <input type="tel" class="form-control" id="inputPhone" value="${currentUser.phone}" required>
                              </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label for="techDirección" class="form-label">Dirección</label>
                                <input type="Dirección" class="form-control" id="techDirección" value="${currentUser?.Addres || ''}" required>
                              </div>
                            </div>
                          </div>
                          
                          <div class="row mb-3">
                              <div class="col-md-6">
                                  <label for="inputSpecialty" class="form-label">Especialidad</label>
                                  <select class="form-select" id="inputSpecialty">
                                      <option ${currentUser.specialty === 'Reparación de pantallas OLED/LCD' ? 'selected' : ''}>Reparación de pantallas OLED/LCD</option>
                                      <option ${currentUser.specialty === 'Reballing y soldadura BGA en placas base' ? 'selected' : ''}>Reballing y soldadura BGA en placas base</option>
                                      <option ${currentUser.specialty === 'Reemplazo y calibración de baterías Li-Ion' ? 'selected' : ''}>Reemplazo y calibración de baterías Li-Ion</option>
                                      <option ${currentUser.specialty === 'Micro soldadura de componentes SMD' ? 'selected' : ''}>Micro soldadura de componentes SMD</option>
                                      <option ${currentUser.specialty === 'Reparación de puertos USB-C y Lightning' ? 'selected' : ''}>Reparación de puertos USB-C y Lightning</option>
                                      <option ${currentUser.specialty === 'Desbloqueo y reinstalación de firmware (iOS/Android)' ? 'selected' : ''}>Desbloqueo y reinstalación de firmware (iOS/Android)</option>
                                      <option ${currentUser.specialty === 'Diagnóstico y reparación de problemas de señal (WiFi, Bluetooth, red móvil)' ? 'selected' : ''}>Diagnóstico y reparación de problemas de señal (WiFi, Bluetooth, red móvil)</option>
                                      <option ${currentUser.specialty === 'Reparación de cámaras frontales/traseras y sensores' ? 'selected' : ''}>Reparación de cámaras frontales/traseras y sensores</option>
                                  </select>
                              </div>
                          </div>

                          <div class="d-flex justify-content-end">
                              <button type="button" class="btn btn-secondary me-2" onclick="loadTechDashboard()">
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

// Función para renderizar estrellas de valoración
function renderStars(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star text-warning"></i>';
  }
  
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt text-warning"></i>';
  }
  
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star text-warning"></i>';
  }
  
  return stars;
}

// Función para renderizar certificaciones
function renderCertifications() {
  const certs = currentUser.certifications || [];
  
  return certs.map(cert => `
    <div class="d-flex align-items-center mb-2">
      <input type="text" class="form-control form-control-sm" value="${cert}">
      <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeCertification(this)">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');
}

// Función para añadir certificación
function addCertification() {
  const container = document.getElementById('certificationsContainer');
  const newCert = document.createElement('div');
  newCert.className = 'd-flex align-items-center mb-2';
  newCert.innerHTML = `
    <input type="text" class="form-control form-control-sm" placeholder="Nueva certificación">
    <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeCertification(this)">
      <i class="fas fa-times"></i>
    </button>
  `;
  container.appendChild(newCert);
}

// Función para eliminar certificación
function removeCertification(button) {
  button.parentElement.remove();
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
  // Obtener certificaciones actualizadas
  const certInputs = document.querySelectorAll('#certificationsContainer input');
  const updatedCerts = Array.from(certInputs).map(input => input.value);
  
  currentUser = {
      ...currentUser,
      name: document.getElementById('inputFirstName').value,
      lastName: document.getElementById('inputLastName').value,
      email: document.getElementById('inputEmail').value,
      phone: document.getElementById('inputPhone').value,
      specialty: document.getElementById('inputSpecialty').value,
      experience: document.getElementById('inputExperience').value + ' años',
      bio: document.getElementById('inputBio').value,
      certifications: updatedCerts,
      tools: document.querySelector('.card:nth-child(2) textarea').value
  };
  
  alert('Perfil técnico actualizado correctamente');
  showProfile(); // Recargar la vista
}

// Función para toggle de notificaciones
function toggleNotifications() {
  currentUser.notifications = document.getElementById('notificationToggle').checked;
  // Aquí podrías guardar este cambio en el servidor
}

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