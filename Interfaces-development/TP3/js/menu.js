/* window.onload = function() {
    let loader = document.querySelector(".loader-bg");
    let percentageElement = document.querySelector(".loader-percentage");
    loader.style.display = "block";

    let percentage = 0;

    function updatePercentage() {
      percentage += 1;
      percentageElement.textContent = "Cargando..."+percentage + "%";

      if (percentage < 100) {
          setTimeout(updatePercentage, 50);
      } else {
          loader.style.display = "none";
      }
  }

  updatePercentage();
  };
 */
let menu = document.querySelector(".menu");
let nav = document.querySelector(".sidebar");
let menuBg = document.getElementById("menu-bg");

let profileMenu = document.querySelector(".profile-menu")
let profileNav = document.querySelector(".profile-sidebar")

menu.addEventListener("click", function(){
    nav.classList.toggle("active");
    menuBg.style.display = "block";
})

profileMenu.addEventListener("click", function(){
    profileNav.classList.toggle("active");
    menuBg.style.display = "block";
})


menuBg.addEventListener("click", function () {
    nav.classList.remove("active");
    profileNav.classList.remove("active");
    menuBg.style.display = "none";
    menu.checked = false;
  });


