document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('matrix-canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions to match container
            function resizeCanvas() {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Characters for the digital rain effect
            const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZαβγΔ∑∞φ';
            const fontSize = 14;
            const columns = Math.floor(canvas.width / fontSize);
            
            // Array to track the y position of each column
            const drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -100;
            }
            
            // Drawing function
            function draw() {
                // Semi-transparent black to create fade effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Set text color and font
                ctx.fillStyle = '#3db370';  // Steins;Gate green
                ctx.font = `${fontSize}px monospace`;
                
                // Draw characters
                for (let i = 0; i < drops.length; i++) {
                    // Random character
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    
                    // Position and draw text
                    const x = i * fontSize;
                    const y = drops[i] * fontSize;
                    
                    // Make the first character in each column slightly brighter
                    if (Math.random() > 0.98) {
                        ctx.fillStyle = '#5cdb95';
                    } else {
                        ctx.fillStyle = '#ff004c';
                    }
                    
                    ctx.fillText(char, x, y);
                    
                    // Reset position when reaching bottom or randomly
                    if (y > canvas.height && Math.random() > 0.99) {
                        drops[i] = 0;
                    }
                    
                    // Move the drop down
                    drops[i]++;
                }
                
                // Periodically update the divergence number
                if (Math.random() > 0.995) {
                    const divergenceEl = document.getElementById('divergence');
                    const baseValue = 1.048596;
                    const fluctuation = (Math.random() * 0.0001).toFixed(6);
                    const newValue = (baseValue + parseFloat(fluctuation) * (Math.random() > 0.5 ? 1 : -1)).toFixed(6);
                    divergenceEl.textContent = newValue;
                }
            }
            
            // Animation loop
            setInterval(draw, 50);
        });