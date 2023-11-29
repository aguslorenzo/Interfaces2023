"use strict"
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            // Selecciona las cartas dentro del elemento intersectado
            entry.target.querySelectorAll(".card").forEach((card, index) => {
                
                const animationDuration = 3 + index; // Puedes ajustar esto según tus preferencias

                // Aplica la duración a la animación
                card.style.animationDuration = `${animationDuration}s`;

                // Añade la clase de animación                
                card.classList.add("fadeInBottom");
            });
        }
    })
})
observer.observe(document.querySelector(".characters-cards"))