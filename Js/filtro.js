// filtro.js
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de filtro
    const filterButtons = document.querySelectorAll('.btn-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Función para filtrar los trabajos
    function filterPortfolio(category) {
        portfolioItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Añadir eventos a los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase 'active' de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase 'active' al botón clickeado
            this.classList.add('active');
            
            // Obtener la categoría del filtro
            const filterCategory = this.getAttribute('data-filter');
            
            // Aplicar el filtro
            filterPortfolio(filterCategory);
        });
    });
    
    // Activar el filtro "Todos" por defecto
    const defaultFilter = document.querySelector('.btn-filter[data-filter="all"]');
    if (defaultFilter) {
        defaultFilter.classList.add('active');
    }
});