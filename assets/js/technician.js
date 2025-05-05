// Lógica específica para técnicos

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('technician-dashboard')) {
      initTechnicianDashboard();
  }
});

function initTechnicianDashboard() {
  // Inicializar el dashboard del técnico
  loadAssignedOrders();
  loadSpecialties();
  
  // Event listeners
  document.getElementById('complete-order-btn')?.addEventListener('click', completeOrder);
  document.getElementById('update-specialties-btn')?.addEventListener('click', updateSpecialties);
}

function loadAssignedOrders() {
  // Cargar órdenes asignadas al técnico
  fetch('/api/orders/assigned')
      .then(response => response.json())
      .then(data => {
          const tableBody = document.querySelector('#assigned-orders-table tbody');
          tableBody.innerHTML = '';
          
          data.orders.forEach(order => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${order.id}</td>
                  <td>${order.device}</td>
                  <td>${order.problem}</td>
                  <td>${new Date(order.assignedDate).toLocaleDateString()}</td>
                  <td><span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
                  <td>
                      <button class="btn btn-sm btn-primary me-1 view-order-btn" data-id="${order.id}">Detalles</button>
                      ${order.status === 'Pendiente' ? `<button class="btn btn-sm btn-success complete-order-btn" data-id="${order.id}">Completar</button>` : ''}
                  </td>
              `;
              tableBody.appendChild(row);
          });
          
          // Agregar event listeners a los botones
          document.querySelectorAll('.view-order-btn').forEach(btn => {
              btn.addEventListener('click', viewOrderDetails);
          });
          
          document.querySelectorAll('.complete-order-btn').forEach(btn => {
              btn.addEventListener('click', completeOrder);
          });
      });
}

function getStatusBadgeClass(status) {
  const statusClasses = {
      'Pendiente': 'bg-info',
      'En progreso': 'bg-warning',
      'Completada': 'bg-success',
      'Cancelada': 'bg-danger'
  };
  return statusClasses[status] || 'bg-secondary';
}

function viewOrderDetails(e) {
  const orderId = e.target.getAttribute('data-id');
  // Mostrar detalles de la orden
  window.location.href = `/order-details.html?id=${orderId}`;
}

function completeOrder(e) {
  const orderId = e?.target?.getAttribute('data-id') || prompt('Ingrese el ID de la orden a completar');
  
  if (orderId) {
      fetch(`/api/orders/${orderId}/complete`, {
          method: 'PUT'
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Orden marcada como completada');
              loadAssignedOrders();
          }
      });
  }
}

function loadSpecialties() {
  // Cargar especialidades del técnico
  fetch('/api/technician/specialties')
      .then(response => response.json())
      .then(data => {
          const specialtiesList = document.getElementById('specialties-list');
          if (specialtiesList) {
              specialtiesList.innerHTML = '';
              
              data.specialties.forEach(specialty => {
                  const item = document.createElement('li');
                  item.className = 'list-group-item d-flex justify-content-between align-items-center';
                  item.innerHTML = `
                      ${specialty.name}
                      <span class="badge ${getLevelBadgeClass(specialty.level)}">${specialty.level}</span>
                  `;
                  specialtiesList.appendChild(item);
              });
          }
      });
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

function updateSpecialties() {
  // Lógica para actualizar especialidades
  const newSpecialty = prompt('Ingrese su nueva especialidad:');
  if (newSpecialty) {
      fetch('/api/technician/specialties', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ specialty: newSpecialty })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              loadSpecialties();
          }
      });
  }
}