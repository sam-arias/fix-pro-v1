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
  
  // Más funciones específicas del gerente...