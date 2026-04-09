const fs = require('fs');
const files = ['index.html', 'login.html', 'register.html', 'room.html', 'settings.html', 'messages.html', 'fyp.html', 'userprofile.html', 'viewpost.html'];
const style = `
    <style>
        :root {
            /* Japanese Sakura (Light Theme) */
            --bg-color: #fce4ec;
            --bg-image: url('https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2000&auto=format&fit=crop');
            --card-bg: rgba(255, 255, 255, 0.65);
            --card-blur: blur(16px);
            --primary: #f06292;
            --primary-hover: #d81b60;
            --text-main: #3e2723;
            --text-muted: #795548;
            --border-radius: 20px;
            --border-color: rgba(255, 255, 255, 0.4);
            
            /* Layout config */
            --nav-width: 275px;
            --main-width: 600px;
            --aside-width: 350px;
        }

        body.dark-mode {
            /* Cosmic Void (Dark Theme) */
            --bg-color: #030008;
            --bg-image: url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000&auto=format&fit=crop');
            --card-bg: rgba(10, 5, 20, 0.75);
            --card-blur: blur(20px);
            --primary: #b388ff;
            --primary-hover: #7c4dff;
            --text-main: #ffffff;
            --text-muted: #9e9e9e;
            --border-color: rgba(255, 255, 255, 0.1);
        }

        body { 
            background-color: var(--bg-color); 
            background-image: var(--bg-image);
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: var(--text-main); 
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            transition: background 0.3s, color 0.3s;
            display: flex;
            justify-content: center;
            min-height: 100vh;
        }

        /* 3-Column Twitter-esque CSS Grid Layout */
        .app-container {
            display: grid;
            grid-template-columns: var(--nav-width) var(--main-width) var(--aside-width);
            gap: 30px;
            max-width: 1300px;
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            align-items: start;
        }

        @media (max-width: 1300px) {
            .app-container {
                grid-template-columns: var(--nav-width) var(--main-width);
                justify-content: center;
            }
            .app-container > aside, .app-container > .right-sidebar { display: none; }
        }

        @media (max-width: 900px) {
            .app-container {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            header { position: relative; }
        }

        header, nav, aside.sidebar-left {
            position: sticky;
            top: 20px;
        }

        header, nav, main section, aside, form, .post-content, .convo-item, #chat { 
            background: var(--card-bg); 
            backdrop-filter: var(--card-blur);
            -webkit-backdrop-filter: var(--card-blur);
            border-radius: var(--border-radius); 
            padding: 20px; 
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); 
            border: 1px solid var(--border-color); 
            margin-bottom: 20px;
        }
        
        main section { margin-bottom: 20px; width: 100%; box-sizing: border-box; }

        header h1, nav h1 { font-size: 1.8rem; font-weight: 800; margin-top: 0; margin-bottom: 5px; }

        img { border-radius: 12px; }
        #avatar, #avatar-preview { border-radius: 50%; object-fit: cover; }
        
        button, input[type="submit"] { 
            background-color: var(--primary); 
            color: white; 
            border-radius: 9999px; 
            border: none; 
            padding: 10px 20px; 
            font-weight: bold; 
            cursor: pointer; 
            transition: background-color 0.2s, transform 0.1s; 
        }
        button:hover, input[type="submit"]:hover { background-color: var(--primary-hover); transform: scale(1.02); }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        
        input[type="text"], input[type="password"], input[type="email"], input[type="number"], textarea { 
            border: 1px solid var(--border-color); 
            border-radius: 12px; 
            padding: 12px; 
            width: 100%; 
            box-sizing: border-box; 
            margin-top: 8px; 
            background-color: rgba(255, 255, 255, 0.05); 
            color: var(--text-main); 
        }
        input::placeholder, textarea::placeholder { color: var(--text-muted); }
        input:focus, textarea:focus { outline: 2px solid var(--primary); background-color: rgba(255, 255, 255, 0.1); }

        a { color: var(--text-main); text-decoration: none; transition: color 0.2s; }
        a:hover { color: var(--primary); }

        ul { list-style: none; padding: 0; margin: 0; }
        li a { display: block; padding: 15px 10px; border-radius: 999px; font-weight: bold; transition: background 0.2s; font-size: 1.2rem; }
        li a:hover { background: rgba(0,0,0,0.05); color: var(--primary); }
        body.dark-mode li a:hover { background: rgba(255,255,255,0.05); }

        .post-header { display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 10px; }
        .post-author { font-weight: bold; font-size: 1.1em; color: var(--primary); }
        .post-time { color: var(--text-muted); }

        /* Floating Theme Toggle Container */
        .theme-switch-wrapper {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--card-bg);
            backdrop-filter: var(--card-blur);
            -webkit-backdrop-filter: var(--card-blur);
            border: 1px solid var(--border-color);
            padding: 10px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            z-index: 1000;
        }

        .theme-switch-wrapper label { cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .theme-switch-wrapper input { display: none; }
        .theme-switch-wrapper .icon { font-size: 1.5rem; }
    </style>
`;
const themeJS = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const wrapper = document.createElement('div');
            wrapper.className = 'theme-switch-wrapper';
            wrapper.innerHTML = \`
                <label for="floating-theme-toggle">
                    <input type="checkbox" id="floating-theme-toggle">
                    <span class="icon">🌓</span>
                </label>
            \`;
            document.body.appendChild(wrapper);

            const toggle = document.getElementById('floating-theme-toggle');
            const currentTheme = localStorage.getItem('theme');
            
            if (currentTheme) {
                if (currentTheme === 'dark') {
                    document.body.classList.add('dark-mode');
                    toggle.checked = true;
                }
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-mode');
                toggle.checked = true;
            }

            toggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('theme', 'light');
                }
            });

            window.themeTogglePatch = true;
            
            // Clean up old layout by putting <aside> into the 3rd column correctly
            const app = document.querySelector('.app-container');
            if (app) {
                const aside = app.querySelector('aside');
                const main = app.querySelector('main');
                const header = app.querySelector('header');
                
                // If header has nav, turn header into the left sidebar
                if(header && header.querySelector('nav')) {
                    // It fits perfectly as the left column
                }
                
                // If the aside is inside main, extract it to be a sibling of main so it formats correctly as the 3rd column
                if(aside && main && main.contains(aside)) {
                    app.appendChild(aside);
                }
            }
        });
    </script>
`;

for (let file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<style>[\s\S]*?<\/style>/ig, '');
    content = content.replace(/<\/head>/i, style + '</head>');

    // Ensure scripts aren't running redundantly
    content = content.replace(/const themeToggle = document\.getElementById\('theme-toggle'\);/g, "const themeToggle = document.getElementById('theme-toggle') || { addEventListener: () => {}, checked: false };");

    if (content.includes(themeJS)) {
        content = content.replace(themeJS, '');
    }

    if (!content.includes('<div class="app-container">')) {
        content = content.replace(/<body>/i, '<body>\n<div class="app-container">');
        content = content.replace(/<\/body>/i, '</div>\n' + themeJS + '\n</body>');
    } else {
        content = content.replace(/<\/body>/i, themeJS + '\n</body>');
    }

    fs.writeFileSync(file, content);
}
