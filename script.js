const toggleIcon = document.querySelector(".toggle-theme");

const applyTheme = (isDarkMode) => {
    const footer = document.querySelector(".footer");

    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        document.body.style.backgroundColor = "#1b1f38"; 
        document.body.style.color = "white"; 
        footer.style.color = "white";
        toggleIcon.classList.remove('fa-moon'); 
        toggleIcon.classList.add('fa-sun'); 
    } else {
        document.body.classList.remove("dark-mode");
        document.body.style.backgroundColor = "white"; 
        document.body.style.color = "#1b1f38"; 
        footer.style.color = "#1b1f38";
        toggleIcon.classList.remove('fa-sun'); 
        toggleIcon.classList.add('fa-moon'); 
    }
};

const toggleDarkMode = () => {
    const isDarkMode = !document.body.classList.contains("dark-mode");
    applyTheme(isDarkMode);
};

window.onload = () => {
    const isDarkMode = false;
    applyTheme(isDarkMode);
};

const openModal = () => {
    document.getElementById("myModal").style.display = "flex";
};

const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
};

window.onclick = (event) => {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
};
