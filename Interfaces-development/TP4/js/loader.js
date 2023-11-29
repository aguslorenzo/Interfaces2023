document.addEventListener("DOMContentLoaded", function () {
    let progress = 0;
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.getElementById("progress");
  
    function simulateLoading() {
      setTimeout(function () {
        progress += 5; //segundos de progreso
        if (progress > 100) {
          document.querySelector(".loading-container").style.display = "none";
          
        } else {
          progressBar.style.width = progress + "%";
          progressText.textContent = progress + "%";
          simulateLoading(); 
        }
      }, 200); // tiempo total del loader
    }
  
    simulateLoading();
  });