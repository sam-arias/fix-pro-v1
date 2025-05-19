import { API_CONFIG } from '../../../utils/api/config.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginText = document.getElementById('loginText');
    const spinner = document.getElementById('spinner');
    const errorMessage = document.getElementById('errorMessage');

    // Mostrar/ocultar contraseña
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.innerHTML = type === 'password' 
                ? '<i class="bi bi-eye"></i>' 
                : '<i class="bi bi-eye-slash"></i>';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Mostrar spinner y deshabilitar botón
            if (loginText && spinner) {
                loginText.classList.add('hidden');
                spinner.classList.remove('hidden');
            }
            loginForm.querySelector('button[type="submit"]').disabled = true;
            if (errorMessage) errorMessage.textContent = '';
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await login(email, password);


                if (response.success) {
                    // Guardar datos de sesión en sessionStorage
                    sessionStorage.setItem('isAuthenticated', 'true');
                    sessionStorage.setItem('userRole', response.role);
                    sessionStorage.setItem('userEmail', email);
                    
                    const roleRoutes = {
                        'Administrador': '/public/pages/dashboard/admin-dashboard.html',
                        'Tecnico': '/public/pages/dashboard/technician-dashboard.html',
                        'Asesor': '/public/pages/dashboard/adviser-dashboard.html',
                    };
                    
                    const redirectUrl = roleRoutes[response.role] || '/public/index.html';
                    window.location.href = redirectUrl;
                }else {
                    showError(errorMessage, response.message || 'Credenciales incorrectas');
                }
            } catch (error) {
                console.error('Error en el login:', error);
                showError(errorMessage, getErrorMessage(error));
            } finally {
                if (loginText && spinner) {
                    loginText.classList.remove('hidden');
                    spinner.classList.add('hidden');
                }
                loginForm.querySelector('button[type="submit"]').disabled = false;
            }
        });
    }
    checkExistingSession();
});

async function login(email, password) {
    const credentials = { email, password };

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        throw new Error(errorData.message || `Error ${response.status}`);
    }

    return await response.json();
}

function checkExistingSession() {
    const authToken = sessionStorage.getItem('authToken');
    const userRole = sessionStorage.getItem('userRole');
    
    if (authToken && userRole) {
        redirectByRole(userRole);
    }
}

function showError(element, message) {
    if (!element) return;
    
    element.textContent = message;
    element.style.animation = 'none';
    void element.offsetWidth; // Trigger reflow
    element.style.animation = 'shake 0.5s';
    
    // Auto-ocultar mensaje después de 5 segundos
    setTimeout(() => {
        element.textContent = '';
    }, 5000);
}

function getErrorMessage(error) {
    if (error.message.includes('Failed to fetch')) {
        return 'No se pudo conectar con el servidor';
    }
    
    if (error.message.includes('401')) {
        return 'Credenciales incorrectas';
    }
    
    return error.message || 'Error al intentar iniciar sesión';
}