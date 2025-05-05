// Elementos del DOM
const loginForm = document.getElementById('loginForm');

// Función para hashear contraseñas con SHA-256
function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

// Base de datos de usuarios (en un sistema real esto estaría en el servidor)
const USUARIOS = [
    {
        username: 'admin',
        password: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // 'admin123'
        role: 'administrador',
        nombre: 'Administrador Principal',
        email: 'admin@fixpro.com'
    },
    {
        username: 'gerente1',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // 'password'
        role: 'gerente',
        nombre: 'Gerente Regional',
        email: 'gerente@fixpro.com'
    },
    {
        username: 'tecnico1',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // 'password'
        role: 'tecnico',
        nombre: 'Técnico de Campo',
        email: 'tecnico@fixpro.com'
    },
    {
        username: 'tecnico2',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // 'password'
        role: 'tecnico',
        nombre: 'Técnico Auxiliar',
        email: 'tecnico2@fixpro.com'
    }
];

// Validar credenciales
function validateCredentials(username, password) {
    const hashedPassword = hashPassword(password);
    const usuario = USUARIOS.find(u => u.username === username);
    
    if (!usuario) {
        return { success: false, message: 'Usuario no encontrado' };
    }
    
    if (hashedPassword !== usuario.password) {
        return { success: false, message: 'Contraseña incorrecta' };
    }
    
    return { 
        success: true, 
        user: {
            username: usuario.username,
            nombre: usuario.nombre,
            email: usuario.email,
            role: usuario.role
        }
    };
}

// Configurar evento de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showError('Usuario y contraseña son requeridos');
        return;
    }
    
    const result = validateCredentials(username, password);
    if (result.success) {
        // Guardar información del usuario en sessionStorage
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(result.user));
        
        // Redirigir según el rol (opcional)
        redirectByRole(result.user.role);
    } else {
        showError(result.message);
    }
});

// Redirección basada en roles (opcional)
function redirectByRole(role) {
    switch(role) {
        case 'administrador':
            window.location.href = 'admin-dashboard.html';
            break;
        case 'gerente':
            window.location.href = 'manager-dashboard.html';
            break;
        case 'tecnico':
            window.location.href = 'technician-dashboard.html';
            break;
        default:
            window.location.href = 'index.html';
    }
}

// Funciones auxiliares
function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#3085d6'
    });
}

function checkAuth() {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        redirectByRole(user.role);
    }
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

// API pública para gestión de permisos
window.auth = {
    getCurrentUser: () => {
        const userData = sessionStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    },
    
    logout: () => {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('currentUser');
            localStorage.removeItem('userToken');
            window.location.href = 'login.html';
        }
    },
    
    hasRole: (requiredRole) => {
        const user = this.getCurrentUser();
        if (!user) return false;
        
        // Jerarquía de roles (de mayor a menor privilegio)
        const roleHierarchy = {
            'administrador': 3,
            'gerente': 2,
            'tecnico': 1
        };
        
        return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
    },
    
    requireRole: (requiredRole, redirectUrl = 'unauthorized.html') => {
        if (!this.hasRole(requiredRole)) {
            showError('No tienes permisos para acceder a esta sección');
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    },
    
    // Verifica si el usuario tiene exactamente este rol
    isExactly: (role) => {
        const user = this.getCurrentUser();
        return user ? user.role === role : false;
    },
    
    // Verifica si el usuario tiene alguno de los roles proporcionados
    hasAnyRole: (...roles) => {
        const user = this.getCurrentUser();
        return user ? roles.includes(user.role) : false;
    }
};