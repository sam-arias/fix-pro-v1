import { personService } from "/public/utils/api/services/fetchPeople.js";

////////////////////////////////////////////////////
////     Funciones Auxiliares Generales        ////
////////////////////////////////////////////////////

function cleanForm() {
  document.getElementById("name").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("role").value = "";
  document.getElementById("newRoleName").value = "";
  document.getElementById("newSpecialtyName").value = "";
  document.getElementById("filter-by-role").value = "";
  document.getElementById("filter-by-specialty").selected = "";

  document.querySelectorAll('.specialties-container input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });
}

function showNotification(message, type) {
  const toastContainer = document.createElement('div');
  toastContainer.innerHTML = `
    <div class="toast align-items-center text-white bg-${type === 'error' ? 'danger' : 'success'} border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  
  document.body.appendChild(toastContainer);
  
  setTimeout(() => {
    toastContainer.remove();
  }, 5000);
}

////////////////////////////////////////////////////
////     Funciones para Obtener Datos          ////
////////////////////////////////////////////////////

async function getAllRoles(selectElementId = 'role') {
  const roleSelect = document.getElementById(selectElementId);
  if (!roleSelect) return;
  
  const loadingOption = document.createElement("option");
  loadingOption.textContent = "Cargando roles...";
  roleSelect.innerHTML = "";
  roleSelect.appendChild(loadingOption);
  roleSelect.disabled = true;

  try {
    const roles = await personService.getAllRoles();
    
    roleSelect.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Todos los roles";
    defaultOption.selected = true;
    roleSelect.appendChild(defaultOption);

    if (roles.length === 0) {
      const noRolesOption = document.createElement("option");
      noRolesOption.textContent = "No hay roles disponibles";
      noRolesOption.disabled = true;
      roleSelect.appendChild(noRolesOption);
    } else {
      roles.forEach(role => {
        const option = document.createElement("option");
        option.value = role.roleName;
        option.textContent = role.roleName;
        roleSelect.appendChild(option);
      });
    }
    
    roleSelect.disabled = false;
    return roles;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    roleSelect.innerHTML = "";
    const errorOption = document.createElement("option");
    errorOption.textContent = "Error al cargar roles";
    errorOption.disabled = true;
    roleSelect.appendChild(errorOption);
    
    showNotification("Error al cargar los roles. Por favor, intente nuevamente.", "error");
    throw error;
  }
}




async function getAllSpecialties(selectElementId = 'specialty') {
  const specialtySelect = document.getElementById(selectElementId);
  console.log("hola")
  if (!specialtySelect) return;
  
  const loadingOption = document.createElement("option");
  loadingOption.textContent = "Cargando especialidades...";
  specialtySelect.innerHTML = "";
  specialtySelect.appendChild(loadingOption);
  specialtySelect.disabled = true;

  try {
    const specialties = await personService.getAllSpecialties();
    
    specialtySelect.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Todas las especialidades";
    defaultOption.selected = true;
    specialtySelect.appendChild(defaultOption);

    if (specialties.length === 0) {
      const noSpecialtiesOption = document.createElement("option");
      noSpecialtiesOption.textContent = "No hay roles disponibles";
      noSpecialtiesOption.disabled = true;
      specialtySelect.appendChild(noSpecialtiesOption);
    } else {
      specialties.forEach(specialty => {
        const option = document.createElement("option");
        option.value = specialty.specialtyName;
        option.textContent = specialty.specialtyName;
        specialtySelect.appendChild(option);
      });
    }
    
    specialtySelect.disabled = false;
    return specialties;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    specialtySelect.innerHTML = "";
    const errorOption = document.createElement("option");
    errorOption.textContent = "Error al cargar roles";
    errorOption.disabled = true;
    specialtySelect.appendChild(errorOption);
    
    showNotification("Error al cargar los roles. Por favor, intente nuevamente.", "error");
    throw error;
  }
}


async function getAllSpecialtiesToSelect(containerSelector = '.specialties-container', isEditMode = false) {
  try {
    const specialties = await personService.getAllSpecialties();
    const specialtiesContainer = document.querySelector(containerSelector);
    if (!specialtiesContainer) return;
    
    specialtiesContainer.innerHTML = '';

    if (specialties.length === 0) {
      specialtiesContainer.innerHTML = '<p class="text-muted">No hay especialidades disponibles</p>';
      return;
    }

    specialties.forEach(specialty => {
      const checkboxDiv = document.createElement('div');
      checkboxDiv.className = 'form-check';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'form-check-input';
      checkbox.id = `${isEditMode ? 'editSpecialty-' : 'specialty-'}${specialty.id}`;
      checkbox.value = specialty.specialtyName;
      
      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.htmlFor = `${isEditMode ? 'editSpecialty-' : 'specialty-'}${specialty.id}`;
      label.textContent = specialty.specialtyName;
      
      checkboxDiv.appendChild(checkbox);
      checkboxDiv.appendChild(label);
      specialtiesContainer.appendChild(checkboxDiv);
    });
    
    return specialties;
  } catch (error) {
    console.error("Error al obtener especialidades:", error);
    const specialtiesContainer = document.querySelector(containerSelector);
    if (specialtiesContainer) {
      specialtiesContainer.innerHTML = '<p class="text-danger">Error al cargar especialidades</p>';
    }
    throw error;
  }
}

////////////////////////////////////////////////////
////   Funciones para Gestión de Empleados     ////
////////////////////////////////////////////////////

async function getStaff() {
  try {
    const staff = await personService.getStaff();
    const bodyTable = document.querySelector("#employeeTableBody");

    if (!bodyTable) {
      console.error("No se encontró el elemento #employeeTableBody");
      return;
    }

    bodyTable.innerHTML = '<tr><td colspan="9" class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div></td></tr>';
    
    if (!staff || !Array.isArray(staff)) {
      throw new Error("Datos de empleados no válidos");
    }

    if (staff.length === 0) {
      bodyTable.innerHTML = '<tr><td colspan="9" class="text-center">No hay empleados registrados</td></tr>';
      return;
    }

    bodyTable.innerHTML = "";

    staff.forEach(employee => {
      const row = document.createElement("tr");
      row.setAttribute('data-employee-id', employee.id || '');
      
      const specialties = employee.specialties?.length 
        ? employee.specialties.map(s => s?.specialtyName || '').filter(Boolean).join(', ') 
        : 'Ninguna';
      
      row.innerHTML = `
        <td>${employee.id || ''}</td>
        <td>${employee.name || ''}</td>
        <td>${employee.lastName || ''}</td>
        <td>${employee.email || ''}</td>
        <td>${employee.phone || 'N/A'}</td>
        <td>${employee.role?.roleName || 'Sin rol'}</td>
        <td>
          <span class="badge ${employee.availability == 'Disponible'? 'bg-success' : 'bg-secondary'}">
            ${employee.availability}
          </span>
        </td>
        <td>${specialties}</td>
        <td class="action-buttons">
          <button class="btn btn-sm btn-warning edit-btn" 
                  data-bs-toggle="modal" 
                  data-bs-target="#editEmployeeModal"
                  data-employee-id="${employee.id || ''}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger delete-btn"
                  data-employee-id="${employee.id || ''}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      bodyTable.appendChild(row);
    });

    const existingListener = bodyTable.getAttribute('data-listener-attached');
    if (!existingListener) {
      bodyTable.addEventListener('click', handleTableActions);
      bodyTable.setAttribute('data-listener-attached', 'true');
    }

  } catch (error) {
    console.error("Error al obtener el personal:", error);
    const bodyTable = document.querySelector("#employeeTableBody");
    if (bodyTable) {
      bodyTable.innerHTML = `
        <tr>
          <td colspan="9" class="text-center text-danger">
            Error al cargar empleados. ${error.message || 'Por favor intente más tarde.'}
            <button class="btn btn-sm btn-primary mt-2" onclick="getStaff()">Reintentar</button>
          </td>
        </tr>
      `;
    }
  }
}

async function handleTableActions(event) {
  const editBtn = event.target.closest('.edit-btn');
  const deleteBtn = event.target.closest('.delete-btn');
  
  // if (editBtn) {
  //   const employeeId = editBtn.getAttribute('data-employee-id');
  //   await loadEmployeeDataToEdit(employeeId);
  //   const editModal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
  //   editModal.show();
  // }
  
  if (deleteBtn) {
    const employeeId = deleteBtn.getAttribute('data-employee-id');
    showDeleteConfirmation(employeeId);
    
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }
}

function showDeleteConfirmation(employeeId) {
  if (confirm('¿Está seguro que desea eliminar este empleado?')) {
    deleteEmployee(employeeId);
  }
}

async function loadEmployeeDataToEdit(employeeId) {
  try {
    // Cargar roles y especialidades primero
    await getAllRoles('editRole');
    await getAllSpecialtiesToSelect('#editEmployeeModal .specialties-container', true);
    
    const employee = await personService.getPersonById(employeeId);
    if (!employee) throw new Error("Empleado no encontrado");

    document.getElementById('editEmployeeId').value = employee.id;
    document.getElementById('editName').value = employee.name || '';
    document.getElementById('editLastName').value = employee.lastName || '';
    document.getElementById('editEmail').value = employee.email || '';
    document.getElementById('editAddress').value = employee.address || '';
    document.getElementById('editPhone').value = employee.phone || '';
    
    const roleSelect = document.getElementById('editRole');
    if (roleSelect) {
      roleSelect.value = employee.role?.roleName;
      
    }

    // Marcar especialidades seleccionadas
    if (employee.specialties && employee.specialties.length > 0) {
      employee.specialties.forEach(specialty => {
        const checkbox = document.querySelector(`#editEmployeeModal input[id="editSpecialty-${specialty.id}"]`);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
    }
    
  } catch (error) {
    console.error("Error al cargar datos del empleado:", error);
    showNotification(`Error al cargar empleado: ${error.message}`, "error");
    throw error;
  }
}

async function deleteEmployee(employeeId) {
  try {
    const response = await personService.deletePerson(employeeId);
    
    if (!response || response.error) {
      throw new Error(response?.message || 'Error al eliminar empleado');
    }
    
    showNotification('Empleado eliminado con éxito', 'success');
    await getStaff();
    
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    showNotification(`Error al eliminar: ${error.message}`, 'error');
  }
}

async function registerEmployee() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("addEmployeeModal"));
  try {
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const roleName = document.getElementById("role").value;

    if (!roleName) throw new Error("Por favor seleccione un rol");
    const roleData = await personService.getRoleByName(roleName);

    if (!name || !lastName || !email || !password) {
      throw new Error("Por favor complete todos los campos requeridos");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Por favor ingrese un email válido");
    }

    const selectedSpecialties = Array.from(
      document.querySelectorAll('.specialties-container input[type="checkbox"]:checked')
    ).map(checkbox => ({
      id: checkbox.id.replace('specialty-', ''),
      specialtyName: checkbox.value
    }));

    const newPerson = {
      name: name || null,
      lastName: lastName || null,
      email: email || null,
      password: password || null,
      address: address || null,
      phone: phone || null,
      availability: "Disponible",
      role: {
        id: roleData.id,
        roleName: roleData.roleName
      },
      specialties: selectedSpecialties
    };

    const response = await personService.registerPerson(newPerson);

    if (!response || response.error) {
      throw new Error(response?.message || "Error al registrar empleado");
    }
    
    showNotification("Empleado registrado con éxito", "success");
    setTimeout(() => window.location.reload(), 1500);
  } catch (error) {
    console.error("Error al registrar empleado:", error);
    showNotification("Error al registrar empleado: " + error.message, "error");
  } finally {
    modal.hide();
    cleanForm();
  }
}



async function updateEmployee() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("editEmployeeModal"));
  try {

    
    const name = document.getElementById("editName").value.trim();
    const lastName = document.getElementById("editLastName").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const person = await personService.getPersonByEmail(email);
    const personId = person.id;
    const password = document.getElementById("editPassword").value;
    const address = document.getElementById("editAddress").value.trim();
    const phone = document.getElementById("editPhone").value.trim();
    const roleName = document.getElementById("editRole").value;

    if (!roleName) throw new Error("Por favor seleccione un rol");
    const roleData = await personService.getRoleByName(roleName);

    if (!name || !lastName || !email || !password) {
      throw new Error("Por favor complete todos los campos requeridos");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Por favor ingrese un email válido");
    }

    const selectedSpecialties = Array.from(
      document.querySelectorAll('#editEmployeeModal .specialties-container input[type="checkbox"]:checked')
    ).map(checkbox => ({
      id: checkbox.id.replace('editSpecialty-', ''),
      specialtyName: checkbox.value
    }));

    const updatedPerson = {
      name: name || null,
      lastName: lastName || null,
      email: email || null,
      password: password || null,
      address: address || null,
      phone: phone || null,
      availability: "Disponible",
      role: {
        id: roleData.id,
        roleName: roleData.roleName
      },
      specialties: selectedSpecialties
    };

    const response = await personService.updatePerson(personId, updatedPerson);

    if (!response || response.error) {
      throw new Error(response?.message || "Error al registrar empleado");
    }
    
    showNotification("Empleado registrado con éxito", "success");
    setTimeout(() => window.location.reload(), 1000);
  } catch (error) {
    console.error("Error al registrar empleado:", error);
    showNotification("Error al registrar empleado: " + error.message, "error");
  } finally {
    modal.hide();
    cleanForm();
  }
}




////////////////////////////////////////////////////
////   Funciones para Gestión de Roles y Especialidades  ////
////////////////////////////////////////////////////

async function createNewRole() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("addRoleModal"));
  try {
    const newRoleName = document.getElementById("newRoleName").value;
    if (!newRoleName) {
      throw new Error("Por favor complete todos los campos requeridos");
    }

    const newRole = { roleName: newRoleName };
    const response = await personService.addRole(newRole);
    
    if (!response) throw new Error("Error al registrar rol");
    
    showNotification("Rol registrado con éxito", "success");
    window.location.reload();
  } catch (error) {
    console.error("Error al registrar rol:", error);
    showNotification("Error al registrar rol: " + error.message, "error");
  } finally {
    modal.hide();
    cleanForm();
  }
}

async function createNewSpecialty() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("addSpecialtyModal"));
  try {
    const newSpecialtyName = document.getElementById("newSpecialtyName").value;
    if (!newSpecialtyName) {
      throw new Error("Por favor complete todos los campos requeridos");
    }

    const newSpecialty = { specialtyName: newSpecialtyName };
    const response = await personService.addSpecialty(newSpecialty);
    
    if (!response) throw new Error("Error al registrar especialidad");
    
    showNotification("Especialidad registrada con éxito", "success");
    window.location.reload();
  } catch (error) {
    console.error("Error al registrar especialidad:", error);
    showNotification("Error al registrar especialidad: " + error.message, "error");
  } finally {
    modal.hide();
    cleanForm();
  }
}


  ///////////////////////////////////////////////////////
 ///  Filtros y Búsquedas en la Tabla de Empleados  ////
///////////////////////////////////////////////////////

async function filterTableByEmail() {
  try {
    const email = document.getElementById("search-email").value;

    const employee = await personService.getPersonByEmail(email);
    console.log(employee);

    if (!employee) {
      throw new Error("No se encontró el empleado");
    }

    const row = document.createElement("tr");
    row.setAttribute('data-employee-id', employee.id || '');

    const specialties = employee.specialties?.length 
        ? employee.specialties.map(s => s?.specialtyName || '').filter(Boolean).join(', ') 
        : 'Ninguna';


    const bodyTable = document.querySelector("#employeeTableBody");
    bodyTable.innerHTML = "";

    row.innerHTML = `
        <td>${employee.id || ''}</td>
        <td>${employee.name || ''}</td>
        <td>${employee.lastName || ''}</td>
        <td>${employee.email || ''}</td>
        <td>${employee.phone || 'N/A'}</td>
        <td>${employee.role?.roleName || 'Sin rol'}</td>
        <td>
          <span class="badge ${employee.available ? 'bg-success' : 'bg-secondary'}">
            ${employee.available ? 'Disponible' : 'No disponible'}
          </span>
        </td>
        <td>${specialties}</td>
        <td class="action-buttons">
          <button class="btn btn-sm btn-warning edit-btn" 
                  data-bs-toggle="modal" 
                  data-bs-target="#editEmployeeModal"
                  data-employee-id="${employee.id || ''}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger delete-btn"
                  data-employee-id="${employee.id || ''}">
            <i class="bi bi-trash"></i>
          </button>
        </td>`;

    bodyTable.appendChild(row);

  }catch (error) {
    console.error("Error al filtrar la tabla: ", error);
    showNotification("Error al filtrar la tabla: " + error.message, "error");
  }
}


async function filterTableByRole() {
  try {
    const roleSelect = document.getElementById('filter-by-role');
    const roleName = roleSelect.value;

    if(roleName == ""){
      await getStaff();
      return;
    }

    const role = await personService.getRoleByName(roleName);

    const bodyTable = document.querySelector("#employeeTableBody");
    bodyTable.innerHTML = '<tr><td colspan="9" class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div></td></tr>';

    const staff = await personService.getPersonByRole(role.id);

    if (!staff || !Array.isArray(staff)) {
      throw new Error("Datos de empleados no válidos");
    }

    bodyTable.innerHTML = "";

    if (staff.length === 0) {
      bodyTable.innerHTML = '<tr><td colspan="9" class="text-center">No hay empleados con este rol</td></tr>';
      return;
    }

    staff.forEach(employee => {
      const row = document.createElement("tr");
      row.setAttribute('data-employee-id', employee.id || '');
      
      const specialties = employee.specialties?.length 
        ? employee.specialties.map(s => s?.specialtyName || '').filter(Boolean).join(', ') 
        : 'Ninguna';
      
      row.innerHTML = `
        <td>${employee.id || ''}</td>
        <td>${employee.name || ''}</td>
        <td>${employee.lastName || ''}</td>
        <td>${employee.email || ''}</td>
        <td>${employee.phone || 'N/A'}</td>
        <td>${employee.role?.roleName || 'Sin rol'}</td>
        <td>
          <span class="badge ${employee.available ? 'bg-success' : 'bg-secondary'}">
            ${employee.available ? 'Disponible' : 'No disponible'}
          </span>
        </td>
        <td>${specialties}</td>
        <td class="action-buttons">
          <button class="btn btn-sm btn-warning edit-btn" 
                  data-bs-toggle="modal" 
                  data-bs-target="#editEmployeeModal"
                  data-employee-id="${employee.id || ''}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger delete-btn"
                  data-employee-id="${employee.id || ''}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      bodyTable.appendChild(row);
    });

    const existingListener = bodyTable.getAttribute('data-listener-attached');
    if (!existingListener) {
      bodyTable.addEventListener('click', handleTableActions);
      bodyTable.setAttribute('data-listener-attached', 'true');
    }

  } catch(error) {
    console.error("Error al filtrar la tabla: ", error);
    const bodyTable = document.querySelector("#employeeTableBody");
    if (bodyTable) {
      bodyTable.innerHTML = `
        <tr>
          <td colspan="9" class="text-center text-danger">
            Error al filtrar empleados. ${error.message || 'Por favor intente más tarde.'}
            <button class="btn btn-sm btn-primary mt-2" onclick="getStaff()">Reintentar</button>
          </td>
        </tr>
      `;
    }
    showNotification("Error al filtrar la tabla: " + error.message, "error");
  }
}

async function filterTableByRoleAndSpecialty() {
  try{
    const roleName = document.getElementById('filter-by-role').value;
    const specialtyName = document.getElementById('filter-by-specialty').value;
    
    
    if(specialtyName == "" && roleName == "") {
      await getStaff();
      console.log("Hola");
      return;
    }else if (specialtyName == "" && roleName != "") {
      await filterTableByRole();
      console.log("Hola2")
      return;
    }
    const role = await personService.getRoleByName(roleName);
    const specialty = await personService.getSpecialtyByName(specialtyName);
    const bodyTable = document.getElementById('employeeTableBody');
  
    const staff = await personService.getPersonByRoleAndSpecialty(role.id, specialty.id);
  
    if (!staff || !Array.isArray(staff)) {
        throw new Error("Datos de empleados no válidos");
      }
  
      bodyTable.innerHTML = "";
  
      if (staff.length === 0) {
        bodyTable.innerHTML = '<tr><td colspan="9" class="text-center">No hay empleados con este rol</td></tr>';
        return;
      }
  
      staff.forEach(employee => {
        const row = document.createElement("tr");
        row.setAttribute('data-employee-id', employee.id || '');
        
        const specialties = employee.specialties?.length 
          ? employee.specialties.map(s => s?.specialtyName || '').filter(Boolean).join(', ') 
          : 'Ninguna';
        
        row.innerHTML = `
          <td>${employee.id || ''}</td>
          <td>${employee.name || ''}</td>
          <td>${employee.lastName || ''}</td>
          <td>${employee.email || ''}</td>
          <td>${employee.phone || 'N/A'}</td>
          <td>${employee.role?.roleName || 'Sin rol'}</td>
          <td>
            <span class="badge ${employee.available ? 'bg-success' : 'bg-secondary'}">
              ${employee.available ? 'Disponible' : 'No disponible'}
            </span>
          </td>
          <td>${specialties}</td>
          <td class="action-buttons">
            <button class="btn btn-sm btn-warning edit-btn" 
                    data-bs-toggle="modal" 
                    data-bs-target="#editEmployeeModal"
                    data-employee-id="${employee.id || ''}">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-danger delete-btn"
                    data-employee-id="${employee.id || ''}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
        bodyTable.appendChild(row);
      });
    
  
      const existingListener = bodyTable.getAttribute('data-listener-attached');
      if (!existingListener) {
        bodyTable.addEventListener('click', handleTableActions);
        bodyTable.setAttribute('data-listener-attached', 'true');
      }
  }catch(error) {
    console.error("Error al filtrar la tabla: ", error);
    const bodyTable = document.querySelector("#employeeTableBody");
    if (bodyTable) {
      bodyTable.innerHTML = `
        <tr>
          <td colspan="9" class="text-center text-danger">
            Error al filtrar empleados. ${error.message || 'Por favor intente más tarde.'}
            <button class="btn btn-sm btn-primary mt-2" onclick="getStaff()">Reintentar</button>
          </td>
        </tr>
      `;
    }
    showNotification("Error al filtrar la tabla: " + error.message, "error");
  }

}

 document.addEventListener("DOMContentLoaded", () => {
   getStaff();
   getAllRoles('filter-by-role');
   getAllSpecialties('filter-by-specialty');

   document.getElementById('addEmployeeModal').addEventListener('show.bs.modal', function() {
     getAllRoles(); 
     getAllSpecialtiesToSelect();
   });

   document.querySelector('#save-employee-btn').addEventListener('click', registerEmployee);
   document.querySelector('#create-new-role-btn').addEventListener('click', createNewRole);
   document.querySelector('#create-new-specialty-btn').addEventListener('click', createNewSpecialty);
   document.querySelector('#search-email-btn').addEventListener('click', filterTableByEmail);

   document.querySelector('#filter-by-role').addEventListener('change', filterTableByRole);
   document.querySelector('#filter-by-specialty').addEventListener('change', filterTableByRoleAndSpecialty);
  

   document.getElementById('employeeTableBody').addEventListener('click', function(event) {
   const editBtn = event.target.closest('.edit-btn');
   if (editBtn) {
     const employeeId = editBtn.getAttribute('data-employee-id');
     loadEmployeeDataToEdit(employeeId);
    }
  });
  
  document.querySelector('#save-edit-btn').addEventListener('click', updateEmployee);
  
   document.getElementById("clean-filters").addEventListener('click', function() {
   })
});











