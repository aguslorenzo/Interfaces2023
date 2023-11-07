//Animacion boton login
let btn = document.querySelector(".submitbtn"),
    spinIcon = document.querySelector(".spinner"),
    btnText = document.querySelector(".btn-text");
    
btn.addEventListener("click", () => {
    btn.classList.add("checked");
    spinIcon.classList.add("spin")
    btnText.textContent = "Comprobando";
    
setTimeout(() => {
    btn.classList.remove("checked")
    btnText.textContent = "¡Regristro exitoso!";
    
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
    
}, 4000) //1s =1000ms
    
});