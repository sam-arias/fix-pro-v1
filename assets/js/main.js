function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = '/public/index.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupLogout();
});