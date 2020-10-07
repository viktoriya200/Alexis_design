function images() {
    const imgPopup = document.createElement("div"),
        portfolioSection = document.querySelector(".portfolio__content"), //.portfolio__items
        bigImage = document.createElement("img");

    imgPopup.classList.add("popup");
    portfolioSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = "center";
    imgPopup.style.alignContent = "center";

    imgPopup.appendChild(bigImage);

    portfolioSection.addEventListener("click",(event)=>{
        event.preventDefault();

        let target = event.target;
        console.log(target);

        if(target && target.closest(".portfolio__column__content")){

            if(target.classList.contains("preview")){
                var path = target.parentNode.getAttribute("href");
                console.log("path:",path);
                bigImage.setAttribute("src",path);
                console.log("bigImage1:",bigImage);
                console.log("imgPopup1:",imgPopup);
            }else if(target.classList.contains("preview-svg")){
                // var path2;
                if(target.closest(".info")){
                    var path2 = target.closest(".info").previousElementSibling.getAttribute("href");
                }
                console.log("path2:",path2);
                bigImage.setAttribute("src",path2);
                console.log("bigImage2:",bigImage);
                console.log("imgPopup2:",imgPopup);
            }else if(target.classList.contains("info__item")){
                // var path3;
                if((target.closest(".info"))){
                    var path3 = target.closest(".info").previousElementSibling.getAttribute("href");
                }
                console.log("path3:",path3);
                bigImage.setAttribute("src",path3);
                console.log("bigImage3:",bigImage);
                console.log("imgPopup3:",imgPopup);
            }

            imgPopup.style.display = "flex";
            bodyLock();
        }

        if(target.closest(".popup") && target.matches("img")){
            imgPopup.style.display = "none";
            bodyUnLock();
        }
    });
}