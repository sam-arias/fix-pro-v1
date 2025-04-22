document.addEventListener('DOMContentLoaded', function() {
    // Script para manejar el navbar scrolled
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Script para mostrar/ocultar resultados de búsqueda
    document.getElementById('consultar-repuesto').addEventListener('submit', function(e) {
        e.preventDefault();
        const results = document.querySelector('.consult-results');
        results.classList.remove('d-none');
    });

    // Función para manejar el botón de editar
    function setupEditButtons() {
        const editButtons = document.querySelectorAll('.edit-btn');
        
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Obtener los datos de la fila
                const row = this.closest('tr');
                const codigo = row.cells[0].textContent;
                const nombre = row.cells[1].textContent;
                const cantidad = row.cells[3].textContent.match(/\d+/)[0]; // Extraer solo el número
                
                // Activar la pestaña de actualización
                const updateTab = document.querySelector('#update-tab');
                const bsTab = new bootstrap.Tab(updateTab);
                bsTab.show();
                
                // Rellenar el formulario de actualización con los datos
                document.getElementById('codigo_actualizar').value = codigo;
                document.getElementById('cantidad_actualizar').value = cantidad;
                
                // Opcional: Mostrar el nombre del repuesto como ayuda visual
                const updateTitle = document.querySelector('#update h3');
                updateTitle.innerHTML = `<i class="fas fa-sync-alt me-2"></i>Actualizar: ${nombre}`;
                
                // Desplazarse suavemente al formulario
                document.querySelector('.inventory-management').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // Inicializar los botones de editar
    setupEditButtons();

    // Si añades filas dinámicamente, deberías volver a llamar a setupEditButtons()
    // después de agregarlas al DOM
});