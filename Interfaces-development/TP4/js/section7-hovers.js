"use strict";


document.addEventListener("DOMContentLoaded", function () {
    let gwen = document.querySelector(".gwens7");
    let peter = document.querySelector(".peters7");
    let miles = document.querySelector(".miless7");
    let gwenImage = new Image();
    gwenImage.src = './images/section7-gwen.png';

    let peterImage = new Image();
    peterImage.src = './images/section7-peter.png';

    let milesImage = new Image();
    milesImage.src = './images/section7-miles.png';

    let section7 = document.querySelector(".section7");

    gwen.onmouseover = function () {
            section7.style.backgroundImage = 'url('+gwenImage.src+')';
            section7.style.minHeight = "840px";
            peter.style.filter = "blur(3px)";
            peter.style.transform = "scale(0.9)";
            miles.style.filter = "blur(3px)";
            miles.style.transform = "scale(0.9)";
            gwen.style.transform = "scale(1.1)";
    }

    gwen.onmouseleave = function () {
        section7.style.backgroundImage = 'url("images/fondo-blanco-s7.png")';
        section7.style.minHeight = "720px";
        peter.style.filter = "blur(0px)";
        peter.style.transform = "scale(1)";
        miles.style.filter = "blur(0px)";
        miles.style.transform = "scale(1)";
        gwen.style.transform = "scale(1)";
    }

    peter.onmouseover = function () {
        section7.style.backgroundImage = 'url('+peterImage.src+')';
        section7.style.minHeight = "840px";
        gwen.style.filter = "blur(3px)";
        gwen.style.transform = "scale(0.9)";
        miles.style.filter = "blur(3px)";
        miles.style.transform = "scale(0.9)";
        peter.style.transform = "scale(1.1)";

    }

    peter.onmouseleave = function () {
        section7.style.backgroundImage = 'url("images/fondo-blanco-s7.png")';
        section7.style.minHeight = "720px";
        gwen.style.filter = "blur(0px)";
        gwen.style.transform = "scale(1)";
        miles.style.filter = "blur(0px)";
        miles.style.transform = "scale(1)";
        peter.style.transform = "scale(1)";
    }

    miles.onmouseover = function () {
        section7.style.backgroundImage = 'url('+milesImage.src+')';
        section7.style.minHeight = "840px";
        peter.style.filter = "blur(3px)";
        peter.style.transform = "scale(0.9)";
        gwen.style.filter = "blur(3px)";
        gwen.style.transform = "scale(0.9)";
        miles.style.transform = "scale(1.1)";

    }

    miles.onmouseleave = function () {
        section7.style.backgroundImage = 'url("images/fondo-blanco-s7.png")';
        section7.style.minHeight = "720px";
        peter.style.filter = "blur(0px)";
        peter.style.transform = "scale(1)";
        gwen.style.filter = "blur(0px)";
        gwen.style.transform = "scale(1)";
        miles.style.transform = "scale(1)";
    }
})
