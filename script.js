function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      document.body.style.backgroundColor = "#333";
      document.body.style.color = "#f0f0f0";
    } else {
      document.body.style.backgroundColor = "#f0f0f0";
      document.body.style.color = "#333";
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