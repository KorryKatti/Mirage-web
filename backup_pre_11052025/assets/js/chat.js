        // Check for user authentication
        window.onload = function () {
            // Assuming the username is stored in localStorage
            const keys = Object.keys(localStorage);

            // Check if at least one valid username-email pair exists
            const authenticated = keys.some((key) => {
                return key.endsWith("-email");
            });

            if (!authenticated) {
                // Redirect to auth.html if no valid user details are found
                alert("You need to authenticate first.");
                window.location.href = "auth.html";
            }
        };