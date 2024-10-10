window.onload = () => {
    const isDarkMode = true;
    applyTheme(isDarkMode);

    const sio = io('https://mirage-o081.onrender.com/')
    
    const getMetrics = () => {
      sio.emit('get_metrics')
    }
    
    sio.on('connect', () => {
      // console.log("Successfully connected to Mirage testnet server", sio.id);
      getMetrics();
      sio.on('metrics', (metrics) => {
        
        document.querySelectorAll('.num1')[0].setAttribute("data-val", metrics.total);
        document.querySelectorAll('.num1')[1].setAttribute("data-val", metrics.today);
        
        let valueDisplays = document.querySelectorAll(".num1");
        let interval = 4000;
        
        valueDisplays.forEach((valueDisplay) => {
          let startValue = 0;
          let endValue = parseInt(valueDisplay.getAttribute("data-val"));
          let duration = Math.floor(interval / endValue);
          let counter = setInterval(function () {
            if (startValue == endValue) {
              clearInterval(counter);
              return;
            }
            startValue += 1;
            valueDisplay.textContent = startValue;
          }, duration);
        });
      })
    })    
};
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
        const contributorsText = document.querySelector('.contributors-text');
        contributorsText.style.color = 'white';
        toggleIcon.classList.remove('fa-sun'); 
        toggleIcon.classList.add('fa-moon'); 
    }
};

const toggleDarkMode = () => {
    const isDarkMode = !document.body.classList.contains("dark-mode");
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