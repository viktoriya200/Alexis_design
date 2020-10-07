function menu(menuIconSelector, menuBodySelector) {
    // Menu
    let iconMenu = document.querySelector(menuIconSelector);
    let menuBody = document.querySelector(menuBodySelector);
    if (iconMenu) {
        iconMenu.addEventListener("click", function () {
            iconMenu.classList.toggle("active");
            document.body.classList.toggle("lock");
            menuBody.classList.toggle("active");
        });
    }
}