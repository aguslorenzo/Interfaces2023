const wrapper = document.querySelector(".wrapper");
const logo = document.querySelector(".logo");
const nav = document.querySelector(".primary-header");

const peters1 = document.querySelector(".peter");
const leftweb = document.querySelector(".tela-izquierda");

const miless1 = document.querySelector(".miles");
const rightweb = document.querySelector(".tela-derecha");

const gwens1 = document.querySelector(".gwen");

const edificioizq = document.querySelector(".edificio-izq");
const edificioder = document.querySelector(".edificio-der");
const edificiocentro = document.querySelector(".edificio-centro");

const heros2 = document.querySelector(".hero");
const duendeverde = document.querySelector(".duende-verde");

wrapper.onscroll = function(){
    let y = wrapper.scrollTop;
    //Sticky header
    console.log(y);
    if(y>0){
        logo.classList.add("scrolled");
        nav.classList.add("stick");
    }
    if(y==0){
        logo.classList.remove("scrolled");
    }

    peters1.style.top = 420 - y * 0.5 + "px";
    peters1.style.left = 30-y*0.01+"%";
    leftweb.style.top = 392 - y * 0.5 + "px";
    leftweb.style.left = (-15-y*0.01)+"%";

    miless1.style.top = 335 - y * 0.25 + "px";
    miless1.style.right = 15-y*0.005+"%";
    rightweb.style.top = 388 - y * 0.25 + "px";
    rightweb.style.right= -11-y*0.005+"%";

    gwens1.style.top = 388 - y * 0.5+"px";
    gwens1.style.left= 10 + y*0.01+"%";

    edificioizq.style.top = 144 + y* 0.25+"px";
    edificioder.style.top = 126 + y* 0.25+"px";
    edificiocentro.style.top = 634 + y*0.5+"px";

    duendeverde.style.top = 132.5 + y* 0.05+"px"
    heros2.style.top = 132.5 - y*1+"px"


    if (y > 2000) {
        const card3d1 = document.querySelector(".card3d-1");
        card3d1.style.top = -600 - y * 0.01 +"px";
        card3d1.style.left = 40 + y * 0.01 +"px";

    
        const card3d2 = document.querySelector(".card3d-2");
        card3d2.style.top = -620 - y * 0.02 +"px";
        card3d2.style.left = 20 + y * 0.01 +"px";
    
        const card3d3 = document.querySelector(".card3d-3");
        card3d3.style.top = -620 - y * 0.03 +"px";
        card3d3.style.left = 50+ y * 0.01 +"px";
    }

    //Sticky scroll
    const friends = document.querySelector(".friends")
    if(y>4000){
        friends.style.top= 4000 - y +"px";
    }

    const cards = document.querySelectorAll(".text");
    const images = document.querySelectorAll(".section5-img");
    cards.forEach((card, index) => {
        const offset = 4300 + index * 300;
        const triggerPoint = offset - 200;

        if (y > triggerPoint) {
            const opacity = 1 - (y - offset) / 400;
            card.style.opacity = opacity > 0 ? opacity : 0;
            card.style.display = "block";
            card.style.position = "relative";
            card.style.top = index * -100 +"px";
            images.item(index).classList.add("active");
            if(index>0){
                images.item(index-1).classList.remove("active");
                if(index===images.length-1&& card.style.opacity<0.8){
                    images.item(index).style.position="relative";
                    images.item(index).style.top="130vh";
                }
            }
        } else {
            if(index!=0){
                card.style.opacity = 0;
                card.style.display = "none";
                images.item(index).classList.remove("active");
            }
        }
        index++;
    });
}