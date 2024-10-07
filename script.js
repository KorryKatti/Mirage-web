const toggleIcon = document.querySelector(".toggle-theme"); 

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        document.body.style.backgroundColor = "#1b1f38"; 
        document.body.style.color = "white"; 
        toggleIcon.classList.remove('fa-moon'); 
        toggleIcon.classList.add('fa-sun'); 
    } else {
        document.body.style.backgroundColor = "white"; 
        document.body.style.color = "#1b1f38"; 
        toggleIcon.classList.remove('fa-sun'); 
        toggleIcon.classList.add('fa-moon'); 
    }
}

  function openModal() {
    document.getElementById("myModal").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }

  // Close the modal when clicking outside of the content
  window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
      closeModal();
    }
  };