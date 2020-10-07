function tabs(tabSelector, tabContentSelector, tabParantSelector, activeClass) {
    // Tabs
    const tabs = document.querySelectorAll(tabSelector),
        tabContent = document.querySelectorAll(tabContentSelector),
        tabsParent = document.querySelector(tabParantSelector);

    function hideTabContent() {
        tabContent.forEach(content => {
            content.classList.add("hide");
            content.classList.remove("show", "fade");
        });
        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains(tabSelector.replace(/\./, "")) || target.parentNode.classList.contains("team__workers__item") || target.parentNode.classList.contains("team__workers__item__image")) {
            tabs.forEach((item, i) => {
                if (target.closest(tabSelector) == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}