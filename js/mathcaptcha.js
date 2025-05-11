let num1, num2;

        function generateCaptcha() {
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            document.getElementById('captcha-question').textContent = `What is ${num1} + ${num2}?`;
        }

        function validateCaptcha() {
            const userAnswer = parseInt(document.getElementById('captcha-answer').value, 10);
            if (userAnswer !== num1 + num2) {
                alert('Incorrect captcha answer. Please try again.');
                return false;
            }
            return true;
        }

        // Generate captcha on page load
        window.onload = generateCaptcha;