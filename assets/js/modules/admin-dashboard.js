import { sparePartService } from "../../../utils/api/services/fetchInventory.js";

// Función principal que se ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', async function() {
    try {
        await loadLowStockParts();
    } catch (error) {
        console.error('Error:', error);
        showErrorInTable('Error al cargar los repuestos por agotarse');
    }
});

// Función para cargar los repuestos con bajo stock
async function loadLowStockParts() {
    try {
        // Obtener todos los repuestos
        const spareParts = await sparePartService.getAllSpareParts();
        
        // Filtrar y ordenar repuestos con stock bajo (menos de 5 unidades)
        const lowStockParts = spareParts
            .filter(part => part.stock <= 5)  // Cambia este número según lo que consideres "bajo stock"
            .sort((a, b) => a.stock - b.stock);
        
        // Actualizar la tabla
        updateLowStockTable(lowStockParts);
    } catch (error) {
        console.error('Error al cargar repuestos con bajo stock:', error);
        throw error;
    }
}

// Función para actualizar la tabla con los repuestos de bajo stock
function updateLowStockTable(parts) {
    const tableBody = document.getElementById('lowStockTableBody');
    tableBody.innerHTML = ''; // Limpiar la tabla
    
    if (parts.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">No hay repuestos por agotarse</td>
            </tr>
        `;
        return;
    }
    
    // Agregar cada repuesto a la tabla
    parts.forEach(part => {
        const row = document.createElement('tr');
        
        // Resaltar filas según el nivel de stock
        if (part.stock === 0) {
            row.classList.add('table-danger'); // Rojo para stock agotado
        } else if (part.stock <= 2) {
            row.classList.add('table-warning'); // Amarillo para stock muy bajo
        }
        
        row.innerHTML = `
            <td>${part.type || 'N/A'}</td>
            <td>${part.brand || 'N/A'}</td>
            <td>${part.model || 'N/A'}</td>
            <td>${part.stock}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Función para mostrar errores en la tabla
function showErrorInTable(message) {
    const tableBody = document.getElementById('lowStockTableBody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center text-danger">${message}</td>
        </tr>
    `;
}