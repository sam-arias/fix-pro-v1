import { sparePartService } from "../../../utils/api/services/fetchInventory.js";

// Variable para mantener el ID del repuesto que se está editando
let currentEditingId = null;

function clearForm() {
    const form = document.getElementById("addSparePartForm");
    form.reset();
}

async function addSparePart() {
    try {
        const brand = document.getElementById("brand").value.trim();
        const model = document.getElementById("model").value.trim();
        const type = document.getElementById("type").value;
        const stock = parseInt(document.getElementById("stock").value);
        const unitPrice = parseFloat(document.getElementById("unitPrice").value);

        // Validaciones básicas
        if (!brand || !model || !type || isNaN(stock) || isNaN(unitPrice)) {
            throw new Error("Todos los campos son obligatorios");
        }
        
        if (stock <= 0) {
            throw new Error("El stock no puede ser 0 o negativo");
        }
        
        if (unitPrice <= 0) {
            throw new Error("El precio unitario debe ser mayor que cero");
        }

        const newSparePart = {
            brand: brand,
            model: model,
            type: type,
            stock: stock,
            price: unitPrice
        };

        const response = await sparePartService.addSparePart(newSparePart);
        
        alert("Repuesto agregado correctamente");
        
        clearForm();

        const modal = bootstrap.Modal.getInstance(document.getElementById('addSparePartModal'));
        modal.hide();
        
        return response;
    } catch (error) {
        console.error("Error al agregar repuesto:", error);
        alert(`Error al agregar repuesto: ${error.message}`);
        throw error;
    }
}

function renderSpareParts(spareParts) {
    const tbody = document.querySelector('.table-responsive table tbody');
    tbody.innerHTML = '';
    
    const counterElement = document.querySelector('.card-header .text-muted');
    counterElement.textContent = `Mostrando ${spareParts.length} de ${spareParts.length} repuestos`;
    
    spareParts.forEach(sparePart => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sparePart.id}</td>
            <td>${sparePart.brand}</td>
            <td>${sparePart.model}</td>
            <td>${sparePart.type}</td>
            <td>${sparePart.stock}</td>
            <td>$${sparePart.price.toFixed(2)}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-warning edit-btn" data-id="${sparePart.id}" 
                    data-bs-toggle="modal" data-bs-target="#editSparePartModal">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${sparePart.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function loadSpareParts() {
    try {
        const spareParts = await sparePartService.getAllSpareParts();
        renderSpareParts(spareParts);
    } catch (error) {
        console.error("Error al cargar repuestos:", error);
        alert(`Error al cargar repuestos: ${error.message}`);
    }
}

async function prepareEditModal(id) {
    try {
        currentEditingId = id;
        const sparePart = await sparePartService.getSparePartById(id);
        
        // Llenar el formulario
        document.getElementById('editBrand').value = sparePart.brand;
        document.getElementById('editModel').value = sparePart.model;
        document.getElementById('editType').value = sparePart.type;
        document.getElementById('editCurrentStock').value = sparePart.stock;
        document.getElementById('editUnitPrice').value = sparePart.price.toFixed(2);
        
        // Configurar controles de stock
        const reduceInput = document.getElementById('reduceStockInput');
        reduceInput.max = sparePart.stock;
        reduceInput.value = 0;
        document.getElementById('maxStockHelp').textContent = 
            `Máximo: ${sparePart.stock} (stock actual)`;
            
        // Resetear campo de agregar stock
        document.getElementById('addStockInput').value = 0;
    } catch (error) {
        console.error("Error al cargar repuesto para edición:", error);
        alert(`Error al cargar repuesto para edición: ${error.message}`);
    }
}

async function updateSparePart() {
    try {
        // Obtener valores del formulario
        const brand = document.getElementById('editBrand').value.trim();
        const model = document.getElementById('editModel').value.trim();
        const type = document.getElementById('editType').value;
        const currentStock = parseInt(document.getElementById('editCurrentStock').value);
        const addStock = parseInt(document.getElementById('addStockInput').value) || 0;
        const reduceStock = parseInt(document.getElementById('reduceStockInput').value) || 0;
        const unitPrice = parseFloat(document.getElementById('editUnitPrice').value);

        // Validaciones
        if (!brand || !model || !type || isNaN(unitPrice)) {
            throw new Error("Todos los campos son obligatorios");
        }
        
        if (unitPrice <= 0) {
            throw new Error("El precio unitario debe ser mayor que cero");
        }
        
        if (reduceStock > currentStock) {
            throw new Error("No puedes reducir más stock del disponible");
        }

        // Calcular nuevo stock
        const newStock = currentStock + addStock - reduceStock;
        
        if (newStock < 0) {
            throw new Error("El stock no puede ser negativo");
        }

        // Preparar objeto para actualizar
        const updatedSparePart = {
            brand,
            model,
            type,
            stock: newStock,
            price: unitPrice
        };

        // Enviar actualización
        await sparePartService.updateSparePart(currentEditingId, updatedSparePart);
        
        // Mostrar feedback al usuario
        alert("Repuesto actualizado correctamente");
        
        // Cerrar modal y recargar lista
        const modal = bootstrap.Modal.getInstance(document.getElementById('editSparePartModal'));
        modal.hide();
        await loadSpareParts();
        
    } catch (error) {
        console.error("Error al actualizar repuesto:", error);
        alert(`Error al actualizar repuesto: ${error.message}`);
    }
}

function setupStockButtons() {
    // Botones para agregar stock
    document.getElementById('decreaseAddStock').addEventListener('click', () => {
        const input = document.getElementById('addStockInput');
        input.value = Math.max(0, parseInt(input.value) - 1);
    });
    
    document.getElementById('increaseAddStock').addEventListener('click', () => {
        const input = document.getElementById('addStockInput');
        input.value = (parseInt(input.value) || 0) + 1;
    });
    
    // Botones para reducir stock
    document.getElementById('decreaseReduceStock').addEventListener('click', () => {
        const input = document.getElementById('reduceStockInput');
        input.value = Math.max(0, parseInt(input.value) - 1);
    });
    
    document.getElementById('increaseReduceStock').addEventListener('click', () => {
        const input = document.getElementById('reduceStockInput');
        const max = parseInt(input.max) || 0;
        input.value = Math.min(max, (parseInt(input.value) || 0) + 1);
    });
}

function setupTableEvents() {
    const tbody = document.querySelector('.table-responsive table tbody');
    
    // Event delegation para botones de edición
    tbody.addEventListener('click', async (e) => {
        if (e.target.closest('.edit-btn')) {
            const button = e.target.closest('.edit-btn');
            const id = button.getAttribute('data-id');
            await prepareEditModal(id);
        }
        
        if (e.target.closest('.delete-btn')) {
            const button = e.target.closest('.delete-btn');
            const id = button.getAttribute('data-id');
            if (confirm('¿Estás seguro de que deseas eliminar este repuesto?')) {
                await deleteSparePart(id);
            }
        }
    });
}

// Función para eliminar repuesto (TAREA)
async function deleteSparePart(id) {
    try {
        // Aquí implementa la llamada al servicio para eliminar el repuesto
        // await sparePartService.deleteSparePart(id);
        alert(`Repuesto con ID ${id} eliminado correctamente`);
        await loadSpareParts();
    } catch (error) {
        console.error("Error al eliminar repuesto:", error);
        alert(`Error al eliminar repuesto: ${error.message}`);
    }
}

// Filtros
function getPredefinedOptionsFromSelect(selectElement, excludeValues = []) {
  return Array.from(selectElement.options)
    .map(opt => opt.value)
    .filter(value => !excludeValues.includes(value));
}

function getPredefinedBrandList() {
  const brandSelect = document.querySelector('.filter-section .col-md-4:nth-child(1) select');
  return getPredefinedOptionsFromSelect(brandSelect, ['Todas las marcas', 'Otras']);
}

function getPredefinedModelList() {
  const modelSelect = document.querySelector('.filter-section .col-md-4:nth-child(2) select');
  return getPredefinedOptionsFromSelect(modelSelect, ['Todos los modelos', 'Otros']);
}

let currentFilters = {
  brand: null,
  model: null,
  type: null
};

function clearFilters() {
  document.querySelectorAll('.filter-section select').forEach(select => {
    select.value = select.querySelector('option[selected]').value;
  });

  currentFilters = {
    brand: null,
    model: null,
    type: null
  };

  loadSpareParts();
}

function setupFilterEvents() {
  const brandFilter = document.querySelector('.filter-section .col-md-4:nth-child(1) select');
  const modelFilter = document.querySelector('.filter-section .col-md-4:nth-child(2) select');
  const typeFilter = document.querySelector('.filter-section .col-md-4:nth-child(3) select');
  const applyButton = document.querySelector('.filter-section .btn-primary');
  const clearButton = document.querySelector('.filter-section .btn-outline-secondary');

  [brandFilter, modelFilter, typeFilter].forEach((filter, index) => {
    filter.addEventListener('change', (e) => {
      let value = e.target.value;

      // Convertimos los valores especiales en null o "__OTRAS__"
      if (value === 'Todas las marcas' || value === 'Todos los modelos' || value === 'Todos los tipos') {
        value = null;
      } else if (value === 'Otras' || value === 'Otros') {
        value = '__OTRAS__';
      }

      switch (index) {
        case 0: currentFilters.brand = value; break;
        case 1: currentFilters.model = value; break;
        case 2: currentFilters.type = value; break;
      }
    });
  });

  applyButton.addEventListener('click', applyFilters);
  clearButton.addEventListener('click', clearFilters);
}


async function applyFilters() {
  try {
    const { brand, model, type } = currentFilters;
    let filteredSpareParts = [];

    const predefinedBrands = getPredefinedBrandList();
    const predefinedModels = getPredefinedModelList();

    // Caso especial: "Otras"/"Otros"
    if (brand === '__OTRAS__' || model === '__OTRAS__') {
      const allParts = await sparePartService.getAllSpareParts();

      filteredSpareParts = allParts.filter(part => {
        let matches = true;

        if (brand === '__OTRAS__') {
          matches = matches && !predefinedBrands.includes(part.brand);
        } else if (brand) {
          matches = matches && part.brand === brand;
        }

        if (model === '__OTRAS__') {
          matches = matches && !predefinedModels.includes(part.model);
        } else if (model) {
          matches = matches && part.model === model;
        }

        if (type) {
          matches = matches && part.type === type;
        }

        return matches;
      });
    } else {
      // Lógica normal de filtros usando backend
      if (brand && model && type) {
        filteredSpareParts = await sparePartService.getSparePartByBrandTypeAndModel(brand, type, model);
      } else if (brand && type) {
        filteredSpareParts = await sparePartService.getSparePartByBrandType(type);
      } else if (brand) {
        filteredSpareParts = await sparePartService.getSparePartByBrand(brand);
      } else if (model) {
        filteredSpareParts = await sparePartService.getSparePartByModel(model);
      } else if (type) {
        filteredSpareParts = await sparePartService.getSparePartByBrandType(type);
      } else {
        filteredSpareParts = await sparePartService.getAllSpareParts();
      }
    }

    renderSpareParts(filteredSpareParts);
  } catch (error) {
    console.error("Error al aplicar filtros:", error);
    alert(`Error al aplicar filtros: ${error.message}`);
  }
}


document.addEventListener('DOMContentLoaded', () => {
    // Botón de guardar nuevo repuesto
    document.querySelector('#save-spare-part-btn')?.addEventListener('click', async () => {
        await addSparePart();
        await loadSpareParts();
    });
    
    // Botón de guardar cambios en edición
    document.querySelector('#editSparePartModal .btn-primary')?.addEventListener('click', async () => {
        await updateSparePart();
    });
    
    // Configurar botones de stock
    setupStockButtons();
    
    // Configurar eventos de la tabla
    setupTableEvents();
    
    // Configurar eventos de los filtros
    setupFilterEvents();

    // Cargar repuestos iniciales
    loadSpareParts();
});