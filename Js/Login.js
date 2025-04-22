// Guardar la sesión al iniciar sesión
function login() {
    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contraseña').value;
    
    if (usuario === 'admin' && contraseña === '1234') { 
        sessionStorage.setItem('usuario', usuario);
        window.location.href = 'Index.html'; 
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Verificar si el usuario está autenticado antes de acceder a ciertas páginas
function verificarSesion() {
    let usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        alert('Debes iniciar sesión para acceder a esta página');
        window.location.href = 'Login.html';
    }
}

// Llamar a la verificación de sesión en páginas protegidas
if (window.location.pathname.includes('Repuestos.html') || window.location.pathname.includes('Registro.html')) {
    verificarSesion();
}
