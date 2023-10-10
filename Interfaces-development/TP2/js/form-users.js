let loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", () => {
    loginBtn.classList.add("loading-cursor")
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
})