        // Matrix digital rain effect
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const matrixContainer = document.getElementById('matrix-canvas');
            
            matrixContainer.appendChild(canvas);
            
            canvas.width = matrixContainer.offsetWidth;
            canvas.height = matrixContainer.offsetHeight;
            
            // Characters to display
            const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
            const columns = Math.floor(canvas.width / 20);
            const drops = [];
            
            // Initialize drops
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -20);
            }
            
            function draw() {
                // Semi-transparent black background to create fading effect
                ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Green text
                ctx.fillStyle = '#5cdb95';
                ctx.font = '15px monospace';
                
                // For each column
                for (let i = 0; i < drops.length; i++) {
                    // Random character
                    const text = characters.charAt(Math.floor(Math.random() * characters.length));
                    
                    // Draw character
                    ctx.fillText(text, i * 20, drops[i] * 20);
                    
                    // Sending character back to top randomly after it has crossed the screen
                    if (drops[i] * 20 > canvas.height && Math.random() > 0.98) {
                        drops[i] = 0;
                    }
                    
                    // Increment y coordinate
                    drops[i]++;
                }
            }
            
            // Adjust canvas size on window resize
            window.addEventListener('resize', function() {
                canvas.width = matrixContainer.offsetWidth;
                canvas.height = matrixContainer.offsetHeight;
                
                // Reset drops
                const newColumns = Math.floor(canvas.width / 20);
                for (let i = 0; i < newColumns; i++) {
                    if (!drops[i]) drops[i] = Math.floor(Math.random() * -20);
                }
            });
            
            // Animation loop
            setInterval(draw, 50);
            
            // Randomly change the divergence meter value
            const divergenceEl = document.getElementById('divergence');
            const convergenceEl = document.getElementById('convergence');
            
            function updateDivergence() {
                // Random fluctuation
                const baseValue = 0.00;
                const fluctuation = (Math.random() * 0.0001).toFixed(6);
                const newValue = (baseValue + parseFloat(fluctuation) * (Math.random() > 0.5 ? 1 : -1)).toFixed(6);
                divergenceEl.textContent = newValue;
                
                // Also update convergence
                const convBase = 0.571024;
                const convFluct = (Math.random() * 0.001).toFixed(6);
                const newConv = (convBase + parseFloat(convFluct) * (Math.random() > 0.5 ? 1 : -1)).toFixed(6);
                convergenceEl.textContent = newConv;
            }
            
            // Update values periodically
            setInterval(updateDivergence, 1500);
            
            // Add occasional glitch effect
            function glitchEffect() {
                if (Math.random() > 0.7) {
                    document.querySelector('.main-content').style.filter = `hue-rotate(${Math.random() * 30}deg) blur(1px)`;
                    setTimeout(() => {
                        document.querySelector('.main-content').style.filter = 'none';
                    }, 100);
                }
            }
            
            // Trigger glitch occasionally
            setInterval(glitchEffect, 3000);
        });