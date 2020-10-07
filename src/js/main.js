@@include("./modules/menu.js")
@@include("./modules/ibg.js")
@@include("./modules/tabs.js")
@@include("./modules/modal.js")
@@include("./modules/sliders.js")
@@include("./modules/formValidation.js")
@@include("./modules/images.js")
@@include("./modules/form.js")

document.addEventListener("DOMContentLoaded", () => {
    menu(".icon-menu", ".header-menu__body");
    ibg();
    tabs(".team__workers__column", ".review__content", ".team__workers__row", "team__workers__column-active");
    modal(".modal");
    slickSlider();
    formValidation();
    images();
    form("form", ".input");
});