function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector),
        modalTitle = document.querySelector(".modal__title");

    modal.classList.add("hide");
    modal.classList.remove("show", "fade");
    bodyUnLock();

    modalTitle.textContent = "";
}

function showModal(modalSelector, modalMessage) {
    const modal = document.querySelector(modalSelector),
        modalTitle = document.querySelector(".modal__title");

    modal.classList.remove("hide");
    modal.classList.add("show", "fade");
    bodyLock();

    modalTitle.textContent = modalMessage;
}

function modal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.getAttribute("data-close" === "")) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });
}

function bodyLock(){
    const lockPadding = document.querySelector(".lock-padding");
    let lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

    lockPadding.style.paddingRight = lockPaddingValue;
    document.body.style.paddingRight = lockPaddingValue;
	document.body.classList.add('lock');
}

function bodyUnLock(){
    const lockPadding = document.querySelector(".lock-padding");

    lockPadding.style.paddingRight = "0px";
    document.body.style.paddingRight = "0px";
	document.body.classList.remove('lock');
}