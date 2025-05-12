document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor complete todos los campos'
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/people/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
            });

            const data = await response.json();

            if (!response.ok) {
                // Usar el mensaje del servidor o uno por defecto
                const errorMsg = data.message || 'Error en la autenticación';
                throw new Error(errorMsg);
            }

            //const data = await response.json();

            if (data.success) {
                // Determinar a qué dashboard redirigir según el rol
                let dashboardUrl;
                switch (data.role.toLowerCase()) {
                    case 'administrador':
                        dashboardUrl = 'admin-dashboard.html';
                        break;
                    case 'tecnico':
                        dashboardUrl = 'technician-dashboard.html';
                        break;
                    case 'gerente':
                        dashboardUrl = 'manager-dashboard.html';
                        break;
                    default:
                        dashboardUrl = 'dashboard.html'; // Página por defecto
                }

                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    text: `Inicio de sesión exitoso como ${data.role}`
                }).then(() => {
                    window.location.href = dashboardUrl;
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Usuario o contraseña incorrectos'
                });
            }
        } catch (error) {
            console.error('Error en el login:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al conectar con el servidor'
            });
        }
    });
});