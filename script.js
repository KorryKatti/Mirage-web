const toggleIcon = document.querySelector(".toggle-theme"); 



function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem('darkMode', 'true');
  } else {
    localStorage.setItem('darkMode', 'false');
  }
}

window.onload = () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
};


  function openModal() {
    document.getElementById("myModal").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }

  window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
      closeModal();
    }
  };