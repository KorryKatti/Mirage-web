// Mirage — shared theme toggle, injected in every page
(function () {
    // Apply theme from localStorage immediately to prevent flash
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        document.body && document.body.classList.add('dark');
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    // Apply to body (may not be set by the above if body not ready)
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }

    // Create floating toggle button
    const btn = document.createElement('button');
    btn.className = 'theme-btn';
    btn.title = 'Toggle theme';
    btn.innerHTML = document.body.classList.contains('dark') ? '☀️' : '🌙';
    btn.addEventListener('click', function () {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        btn.innerHTML = isDark ? '☀️' : '🌙';
    });
    document.body.appendChild(btn);

    // Dynamic Favicon logic
    const user = localStorage.getItem('user');
    if (user) {
        fetch('settings.json').then(r => r.json()).then(settings => {
            const server = settings.server_url || 'http://127.0.0.1:5000';
            fetch(`${server}/api/user/${user}`).then(r => r.json()).then(data => {
                if (data.avatar_url) {
                    let link = document.querySelector("link[rel~='icon']");
                    if (!link) {
                        link = document.createElement('link');
                        link.rel = 'icon';
                        document.head.appendChild(link);
                    }
                    link.href = data.avatar_url;
                }
            }).catch(() => { });
        }).catch(() => { });
    }
});
