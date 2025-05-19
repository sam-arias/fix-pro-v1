// import { API_CONFIG } from '../../../../utils/api/config.js';

// // Variables globales
// let currentUserData = null;

// // ------------------------- FUNCIONES DE AUTENTICACIÓN -------------------------
// function isAuthenticated() {
//   return sessionStorage.getItem('isAuthenticated') === 'true';
// }

// function getCurrentUserRole() {
//   return sessionStorage.getItem('userRole') || '';
// }

// function getCurrentUserEmail() {
//   return sessionStorage.getItem('userEmail') || '';
// }

// function getCurrentUserId() {
//   return sessionStorage.getItem('userId') || '';
// }

// function isAdmin() {
//   return getCurrentUserRole() === 'Administrador';
// }

// function isTechnician() {
//   return getCurrentUserRole() === 'Tecnico';
// }

// function isAdviser() {
//   return getCurrentUserRole() === 'Asesor';
// }

// function redirectToLogin() {
//   console.log('Redirigiendo a login...');
//   window.location.href = '/public/index.html';
// }

// // ------------------------- FUNCIONES PRINCIPALES -------------------------
// document.addEventListener('DOMContentLoaded', async function() {
//   console.log('Iniciando carga del perfil...');
  
//   try {
//     if (!isAuthenticated()) {
//       console.warn('Usuario no autenticado');
//       return redirectToLogin();
//     }

//     console.log('Usuario autenticado, cargando datos...');
//     await loadUserData();
//     setupUIByRole();
//     setupEventListeners();
    
//     console.log('Perfil cargado exitosamente');
//   } catch (error) {
//     console.error('Error crítico:', error);
//     showError(`Error al cargar el perfil: ${error.message}`);
//     setTimeout(() => redirectToLogin(), 3000);
//   }
// });
// // ------------------------- CARGAR DATOS DEL USUARIO -------------------------
// async function loadUserData() {
//   try {
//     const userEmail = getCurrentUserEmail();
//     if (!userEmail) {
//       throw new Error('No se encontró email en sessionStorage');
//     }

//     console.log('Obteniendo datos para:', userEmail);
    
//     const apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PEOPLE.GET_BY_EMAIL(userEmail)}`;
//     console.log('Endpoint completo:', apiUrl);

//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: API_CONFIG.HEADERS
//     });

//     console.log('Respuesta del servidor:', {
//       status: response.status,
//       ok: response.ok
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(errorData.message || `Error ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Datos recibidos:', data);

//     // Manejo de la respuesta basado en tu API
//     currentUserData = data.value || data;
    
//     if (!currentUserData || !currentUserData.email) {
//       throw new Error('Datos de usuario incompletos');
//     }

//     // Actualizar sessionStorage con datos adicionales
//     if (currentUserData.id && !getCurrentUserId()) {
//       sessionStorage.setItem('userId', currentUserData.id);
//       console.log('ID de usuario almacenado:', currentUserData.id);
//     }
    
//     return currentUserData;
//   } catch (error) {
//     console.error('Error en loadUserData:', error);
//     throw new Error(`No se pudieron cargar los datos: ${error.message}`);
//   }
// }

// // ------------------------- INTERFAZ DE USUARIO -------------------------
// function setupUIByRole() {
//   if (!currentUserData) {
//     console.error('No hay datos de usuario para mostrar');
//     return;
//   }

//   loadSidebar();
//   loadProfileContent();
// }

// function loadSidebar() {
//   const sidebar = document.getElementById('dynamicSidebar');
//   if (!sidebar) {
//     console.error('Elemento sidebar no encontrado');
//     return;
//   }

//   const userRole = getCurrentUserRole();
//   console.log('Cargando sidebar para rol:', userRole);
  
//   let sidebarHTML = `
//     <div class="position-sticky pt-3">
//       <div class="text-center mb-4">
//         <i class="bi bi-tools text-white fs-1 mb-2"></i>
//         <h4 class="text-white fs-4">FixPro Management</h4>
//         <p class="text-white fs-6">Panel de ${userRole}</p>
//       </div>
//       <ul class="nav flex-column">`;

//   // Menú para administradores
//   if (isAdmin()) {
//     sidebarHTML += `
//       <li class="nav-item fs-5">
//         <a class="nav-link" href="/public/pages/dashboard/admin-dashboard.html">
//           <i class="bi bi-house-door me-2"></i>Inicio
//         </a>
//       </li>
//       <li class="nav-item fs-5">
//         <a class="nav-link" href="/public/pages/inventory/inventory.html">
//           <i class="bi bi-box-seam me-2"></i>Inventario
//         </a>
//       </li>
//       <li class="nav-item fs-5">
//         <a class="nav-link" href="/public/pages/people/people.html">
//           <i class="bi bi-people me-2"></i>Gestión del Personal
//         </a>
//       </li>`;
//   }

//   // Menú para técnicos
//   if (isTechnician()) {
//     sidebarHTML += `
//       <li class="nav-item fs-5">
//         <a class="nav-link" href="/public/pages/dashboard/technician-dashboard.html">
//           <i class="bi bi-house-door me-2"></i>Inicio
//         </a>
//       </li>
//       <li class="nav-item fs-5">
//         <a class="nav-link" href="/public/pages/orders/assigned-orders.html">
//           <i class="bi bi-file-earmark-text me-2"></i>Órdenes
//         </a>
//       </li>`;
//   }

//   // Menú para asesores
//   if (isAdviser()) {
//     sidebarHTML += `
//       <li class="nav-item fs-5">
//         <a class="nav-link" href="/public/pages/dashboard/adviser-dashboard.html">
//           <i class="bi bi-house-door me-2"></i>Inicio
//         </a>
//       </li>
//       <li class="nav-item fs-5">
//         <a class="nav-link" href="/public/pages/orders/orders.html">
//           <i class="bi bi-file-earmark-text me-2"></i>Órdenes
//         </a>
//       </li>`;
//   }

//   // Menú común
//   sidebarHTML += `
//       <li class="nav-item fs-5">
//         <a class="nav-link active" href="/public/pages/profile/profile.html">
//           <i class="bi bi-person-circle me-2"></i>Mi Perfil
//         </a>
//       </li>
//       <li class="nav-item fs-5">
//         <a class="nav-link" href="#" id="logoutBtn">
//           <i class="fas fa-sign-out-alt me-2"></i>Cerrar sesión
//         </a>
//       </li>
//     </ul>
//   </div>`;

//   sidebar.innerHTML = sidebarHTML;
// }

// function loadProfileContent() {
//   const profileContent = document.getElementById('profileContent');
//   const profileTitle = document.getElementById('profileTitle');
  
//   if (!profileContent || !profileTitle || !currentUserData) {
//     console.error('Elementos del perfil no encontrados');
//     return;
//   }

//   profileTitle.textContent = `Mi Perfil - ${currentUserData.firstName || ''} ${currentUserData.lastName || ''}`;

//   profileContent.innerHTML = `
//     <div class="col-lg-8 mx-auto">
//       <div class="card mb-4">
//         <div class="card-header">
//           <h5>Datos Personales</h5>
//         </div>
//         <div class="card-body">
//           <form id="profileForm">
//             <div class="row mb-3">
//               <div class="col-md-6">
//                 <label for="firstName" class="form-label">Nombres</label>
//                 <input type="text" class="form-control" id="firstName" required>
//               </div>
//               <div class="col-md-6">
//                 <label for="lastName" class="form-label">Apellidos</label>
//                 <input type="text" class="form-control" id="lastName" required>
//               </div>
//             </div>
//             <div class="mb-3">
//               <label for="email" class="form-label">Correo electrónico</label>
//               <input type="email" class="form-control" id="email" required>
//             </div>
//             <div class="mb-3">
//               <label for="phone" class="form-label">Teléfono</label>
//               <input type="tel" class="form-control" id="phone">
//             </div>
//             <div class="mb-3">
//               <label for="address" class="form-label">Dirección</label>
//               <input type="text" class="form-control" id="address">
//             </div>
//             <div class="row mb-3">
//               <div class="col-md-6">
//                 <label for="role" class="form-label">Rol</label>
//                 <input type="text" class="form-control" id="role" disabled>
//               </div>
//               <div class="col-md-6">
//                 <label for="specialties" class="form-label">Especialidades</label>
//                 <input type="text" class="form-control" id="specialties" disabled>
//               </div>
//             </div>
//             <button type="submit" class="btn btn-primary">
//               <i class="bi bi-save me-1"></i> Guardar Cambios
//             </button>
//           </form>
//         </div>
//       </div>
//       <div class="card mb-4">
//         <div class="card-header">
//           <h5>Cambiar Contraseña</h5>
//         </div>
//         <div class="card-body">
//           <form id="securityForm">
//             <div class="mb-3">
//               <label for="currentPassword" class="form-label">Contraseña Actual</label>
//               <input type="password" class="form-control" id="currentPassword" required>
//             </div>
//             <div class="mb-3">
//               <label for="newPassword" class="form-label">Nueva Contraseña</label>
//               <input type="password" class="form-control" id="newPassword" required>
//               <small class="text-muted">Mínimo 8 caracteres</small>
//             </div>
//             <div class="mb-3">
//               <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
//               <input type="password" class="form-control" id="confirmPassword" required>
//             </div>
//             <button type="submit" class="btn btn-primary">
//               <i class="bi bi-key me-1"></i> Cambiar Contraseña
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   `;

//   updateProfileForm();
// }

// function updateProfileForm() {
//   if (!currentUserData) {
//     console.error('No hay datos para actualizar el formulario');
//     return;
//   }

//   console.log('Actualizando formulario con:', currentUserData);

//   const setValue = (id, value) => {
//     const element = document.getElementById(id);
//     if (element) element.value = value || '';
//   };

//   setValue('firstName', currentUserData.firstName);
//   setValue('lastName', currentUserData.lastName);
//   setValue('email', currentUserData.email);
//   setValue('phone', currentUserData.phone);
//   setValue('address', currentUserData.address);
  
//   // Manejo del rol
//   const roleDisplay = getCurrentUserRole();
//   setValue('role', roleDisplay);

//   // Manejo de especialidades
//   let specialtiesText = '';
//   if (currentUserData.specialties) {
//     if (Array.isArray(currentUserData.specialties)) {
//       specialtiesText = currentUserData.specialties
//         .map(s => s.specialtyName || s.name || s)
//         .filter(s => s)
//         .join(', ');
//     } else {
//       specialtiesText = currentUserData.specialties;
//     }
//   }
//   setValue('specialties', specialtiesText);
// }

// // ------------------------- MANEJO DE EVENTOS -------------------------
// function setupEventListeners() {
//   // Logout
//   document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
  
//   // Guardar perfil
//   document.getElementById('profileForm')?.addEventListener('submit', handleProfileSubmit);
  
//   // Cambiar contraseña
//   document.getElementById('securityForm')?.addEventListener('submit', handlePasswordChange);
// }

// async function handleProfileSubmit(e) {
//   e.preventDefault();
//   console.log('Enviando formulario de perfil...');
  
//   try {
//     const userId = getCurrentUserId();
//     if (!userId) {
//       throw new Error('ID de usuario no disponible');
//     }

//     const formData = {
//       firstName: document.getElementById('firstName').value,
//       lastName: document.getElementById('lastName').value,
//       email: document.getElementById('email').value,
//       phone: document.getElementById('phone').value,
//       address: document.getElementById('address').value
//     };

//     console.log('Datos a enviar:', formData);

//     const response = await fetch(
//       `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PEOPLE.UPDATE(userId)}`, 
//       {
//         method: 'PUT',
//         headers: API_CONFIG.HEADERS,
//         body: JSON.stringify(formData)
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Error al actualizar perfil');
//     }

//     showSuccess('Perfil actualizado correctamente');
//     await loadUserData();
//   } catch (error) {
//     console.error('Error al actualizar perfil:', error);
//     showError(error.message || 'Error al actualizar el perfil');
//   }
// }

// async function handlePasswordChange(e) {
//   e.preventDefault();
//   console.log('Cambiando contraseña...');
  
//   try {
//     const userId = getCurrentUserId();
//     if (!userId) {
//       throw new Error('ID de usuario no disponible');
//     }

//     const currentPassword = document.getElementById('currentPassword').value;
//     const newPassword = document.getElementById('newPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     if (newPassword !== confirmPassword) {
//       throw new Error('Las contraseñas no coinciden');
//     }

//     const response = await fetch(
//       `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD(userId)}`,
//       {
//         method: 'PUT',
//         headers: API_CONFIG.HEADERS,
//         body: JSON.stringify({
//           oldPassword: currentPassword,
//           newPassword: newPassword
//         })
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Error al cambiar contraseña');
//     }

//     showSuccess('Contraseña cambiada correctamente');
//     e.target.reset();
//   } catch (error) {
//     console.error('Error al cambiar contraseña:', error);
//     showError(error.message || 'Error al cambiar la contraseña');
//   }
// }

// function handleLogout(e) {
//   e.preventDefault();
//   console.log('Cerrando sesión...');
  
//   // Limpiar toda la sesión
//   sessionStorage.removeItem('isAuthenticated');
//   sessionStorage.removeItem('userRole');
//   sessionStorage.removeItem('userEmail');
//   sessionStorage.removeItem('userId');
  
//   redirectToLogin();
// }

// // ------------------------- FUNCIONES DE UTILIDAD -------------------------
// function showAlert(message, type = 'success') {
//   const alertDiv = document.createElement('div');
//   alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
//   alertDiv.setAttribute('role', 'alert');
//   alertDiv.innerHTML = `
//     ${message}
//     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//   `;
  
//   const container = document.querySelector('main') || document.body;
//   container.prepend(alertDiv);
  
//   setTimeout(() => {
//     alertDiv.classList.remove('show');
//     setTimeout(() => alertDiv.remove(), 150);
//   }, 5000);
// }

// function showSuccess(message) {
//   showAlert(message, 'success');
// }

// function showError(message) {
//   showAlert(message, 'danger');
// }