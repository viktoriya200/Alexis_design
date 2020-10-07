function form(formSelector, inputSelector) {
    //Forms
    @@include("./../services/services.js");
    const forms = document.querySelectorAll(formSelector),
        numbersInput = document.querySelector("input[name='budget']"),
        message = {
            loading: "Loading process...",
            success: "Thanks, we'll connect with you soon!",
            failure: "Sorry, we have some problem...",
            subscribe: "Thank you for subscribe!"
        };

    forms.forEach(item => {
        bindPostDate(item);
    });

    function clearInputs (inputs) {
        inputs.forEach(input => {
            if (!(input == null)) {
                input.classList.remove('focus');
                input.value = input.dataset.value;
                input.parentElement.classList.remove("focus");
                input.blur();
            }else{
                return;
            }
        });
    }

    numbersInput.addEventListener('input', () => numbersInput.value = numbersInput.value.replace(/\D/, ''));

    function bindPostDate(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            showThanksModal(message.loading);

            const formDate = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formDate.entries()));

            if (form.hasAttribute("data-subs")) {
                postDate(" http://localhost:3000/subscribe", json)
                    .then(date => {
                        console.log(date);
                        showThanksModal(message.subscribe);
                    })
                    .catch(() => {
                        showThanksModal(message.failure);
                    })
                    .finally(() => {
                        const inputs = form.querySelectorAll(inputSelector);
                        clearInputs(inputs);
                    });
            } else {
                postDate("http://localhost:3000/requests", json)
                    .then(date => {
                        console.log(date);
                        showThanksModal(message.success);
                    })
                    .catch(() => {
                        showThanksModal(message.failure);
                    })
                    .finally(() => {
                        const children = form.querySelectorAll("div");
                        const inputs2 = [];
                        children.forEach(child => {
                            inputs2.push(child.querySelector(inputSelector));
                        });
                        console.log(inputs2);
                        // form.reset();
                        clearInputs(inputs2);
                    });
            }
        });
    }

    function showThanksModal(modalMessage) {
        showModal(".modal", modalMessage);

        setTimeout(() => {
            closeModal(".modal");
        }, 3000);
    }
};