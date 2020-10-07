"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function menu(menuIconSelector, menuBodySelector) {
  // Menu
  var iconMenu = document.querySelector(menuIconSelector);
  var menuBody = document.querySelector(menuBodySelector);

  if (iconMenu) {
    iconMenu.addEventListener("click", function () {
      iconMenu.classList.toggle("active");
      document.body.classList.toggle("lock");
      menuBody.classList.toggle("active");
    });
  }
}

function ibg() {
  var ibg = document.querySelectorAll(".ibg");

  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

function tabs(tabSelector, tabContentSelector, tabParantSelector, activeClass) {
  // Tabs
  var tabs = document.querySelectorAll(tabSelector),
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

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', e => {
    var target = e.target;

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

function closeModal(modalSelector) {
  var modal = document.querySelector(modalSelector),
      modalTitle = document.querySelector(".modal__title");
  modal.classList.add("hide");
  modal.classList.remove("show", "fade");
  bodyUnLock();
  modalTitle.textContent = "";
}

function showModal(modalSelector, modalMessage) {
  var modal = document.querySelector(modalSelector),
      modalTitle = document.querySelector(".modal__title");
  modal.classList.remove("hide");
  modal.classList.add("show", "fade");
  bodyLock();
  modalTitle.textContent = modalMessage;
}

function modal(modalSelector) {
  var modal = document.querySelector(modalSelector);
  modal.addEventListener("click", event => {
    if (event.target === modal || event.target.getAttribute("data-close" === "")) {
      closeModal(modalSelector);
    }
  });
  document.addEventListener("keydown", event => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });
}

function bodyLock() {
  var lockPadding = document.querySelector(".lock-padding");
  var lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  lockPadding.style.paddingRight = lockPaddingValue;
  document.body.style.paddingRight = lockPaddingValue;
  document.body.classList.add('lock');
}

function bodyUnLock() {
  var lockPadding = document.querySelector(".lock-padding");
  lockPadding.style.paddingRight = "0px";
  document.body.style.paddingRight = "0px";
  document.body.classList.remove('lock');
}

function slickSlider() {
  //SLIDERS
  if ($('.slider__body').length > 0) {
    $('.slider__body').slick({
      //autoplay: true,
      //infinite: false,
      dots: true,
      arrows: false,
      accessibility: false,
      slidesToShow: 1,
      autoplaySpeed: 3000,
      //asNavFor:'',
      //appendDots:
      //appendArrows:$('.mainslider-arrows .container'),
      nextArrow: '<button type="button" class="slick-next"></button>',
      prevArrow: '<button type="button" class="slick-prev"></button>',
      responsive: [{
        breakpoint: 768,
        settings: {}
      }]
    });
  }
}

function formValidation() {
  function forms() {
    //FIELDS
    $('input,textarea').focus(function () {
      if ($(this).val() == $(this).attr('data-value')) {
        $(this).addClass('focus');
        $(this).parent().addClass('focus');

        if ($(this).attr('data-type') == 'pass') {
          $(this).attr('type', 'password');
        }

        ;
        $(this).val('');
      }

      ;
      removeError($(this));
    });
    $('input[data-value], textarea[data-value]').each(function () {
      if (this.value == '' || this.value == $(this).attr('data-value')) {
        if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
          $(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
        } else {
          this.value = $(this).attr('data-value');
        }
      }

      if (this.value != $(this).attr('data-value') && this.value != '') {
        $(this).addClass('focus');
        $(this).parent().addClass('focus');

        if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
          $(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
        }
      }

      $(this).click(function () {
        if (this.value == $(this).attr('data-value')) {
          if ($(this).attr('data-type') == 'pass') {
            $(this).attr('type', 'password');
          }

          ;
          this.value = '';
        }

        ;
      });
      $(this).blur(function () {
        if (this.value == '') {
          if (!$(this).hasClass('l')) {
            this.value = $(this).attr('data-value');
          }

          $(this).removeClass('focus');
          $(this).parent().removeClass('focus');

          if ($(this).attr('data-type') == 'pass') {
            $(this).attr('type', 'text');
          }

          ;
        }

        ;

        if ($(this).hasClass('vn')) {
          formValidate($(this));
        }
      });
    });
    $('.form-input__viewpass').click(function (event) {
      if ($(this).hasClass('active')) {
        $(this).parent().find('input').attr('type', 'password');
      } else {
        $(this).parent().find('input').attr('type', 'text');
      }

      $(this).toggleClass('active');
    });
  }

  forms();

  function digi(str) {
    var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    return r;
  } //VALIDATE FORMS


  $('form button[type=submit]').click(function () {
    var er = 0;
    var form = $(this).parents('form');
    var ms = form.data('ms');
    $.each(form.find('.req'), function (index, val) {
      er += formValidate($(this));
    });

    if (er == 0) {
      removeFormError(form);

      if (ms != null && ms != '') {
        showMessageByClass(ms);
        return false;
      }
    } else {
      return false;
    }
  });

  function formValidate(input) {
    var er = 0;
    var form = input.parents('form');

    if (input.attr('name') == 'email' || input.hasClass('email')) {
      if (input.val() != input.attr('data-value')) {
        var em = input.val().replace(" ", "");
        input.val(em);
      }

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val()) || input.val() == input.attr('data-value')) {
        er++;
        addError(input);
      } else {
        removeError(input);
      }
    } else {
      if (input.val() == '' || input.val() == input.attr('data-value')) {
        er++;
        addError(input);
      } else {
        removeError(input);
      }
    }

    if (input.attr('type') == 'checkbox') {
      if (input.prop('checked') == true) {
        input.removeClass('err').parent().removeClass('err');
      } else {
        er++;
        input.addClass('err').parent().addClass('err');
      }
    }

    if (input.hasClass('name')) {
      if (!/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val())) {
        er++;
        addError(input);
      }
    }

    if (input.hasClass('pass-2')) {
      if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
        addError(input);
      } else {
        removeError(input);
      }
    }

    return er;
  }

  function clearForm(form) {
    $.each(form.find('.input'), function (index, val) {
      $(this).removeClass('focus').val($(this).data('value'));
      $(this).parent().removeClass('focus');

      if ($(this).hasClass('phone')) {
        maskclear($(this));
      }
    });
  }

  function addError(input) {
    input.addClass('err');
    input.parent().addClass('err');
    input.parent().find('.form__error').remove();

    if (input.hasClass('email')) {
      var error = '';

      if (input.val() == '' || input.val() == input.attr('data-value')) {
        error = input.data('error');
      } else {
        error = input.data('error');
      }

      if (error != null) {
        input.parent().append('<div class="form__error">' + error + '</div>');
      }
    } else {
      if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
        input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
      }
    }

    if (input.parents('.select-block').length > 0) {
      input.parents('.select-block').parent().addClass('err');
      input.parents('.select-block').find('.select').addClass('err');
    }
  }

  function addErrorByName(form, input__name, error_text) {
    var input = form.find('[name="' + input__name + '"]');
    input.attr('data-error', error_text);
    addError(input);
  }

  function addFormError(form, error_text) {
    form.find('.form__generalerror').show().html(error_text);
  }

  function removeFormError(form) {
    form.find('.form__generalerror').hide().html('');
  }

  function removeError(input) {
    input.removeClass('err');
    input.parent().removeClass('err');
    input.parent().find('.form__error').remove();

    if (input.parents('.select-block').length > 0) {
      input.parents('.select-block').parent().removeClass('err');
      input.parents('.select-block').find('.select').removeClass('err').removeClass('active'); //input.parents('.select-block').find('.select-options').hide();
    }
  }

  function removeFormErrors(form) {
    form.find('.err').removeClass('err');
    form.find('.form__error').remove();
  }

  function maskclear(n) {
    if (n.val() == "") {
      n.inputmask('remove');

      if (!n.hasClass('l')) {
        n.val(n.attr('data-value'));
      }

      n.removeClass('focus');
      n.parent().removeClass('focus');
    }
  }
}

function images() {
  var imgPopup = document.createElement("div"),
      portfolioSection = document.querySelector(".portfolio__content"),
      //.portfolio__items
  bigImage = document.createElement("img");
  imgPopup.classList.add("popup");
  portfolioSection.appendChild(imgPopup);
  imgPopup.style.justifyContent = "center";
  imgPopup.style.alignContent = "center";
  imgPopup.appendChild(bigImage);
  portfolioSection.addEventListener("click", event => {
    event.preventDefault();
    var target = event.target;
    console.log(target);

    if (target && target.closest(".portfolio__column__content")) {
      if (target.classList.contains("preview")) {
        var path = target.parentNode.getAttribute("href");
        console.log("path:", path);
        bigImage.setAttribute("src", path);
        console.log("bigImage1:", bigImage);
        console.log("imgPopup1:", imgPopup);
      } else if (target.classList.contains("preview-svg")) {
        // var path2;
        if (target.closest(".info")) {
          var path2 = target.closest(".info").previousElementSibling.getAttribute("href");
        }

        console.log("path2:", path2);
        bigImage.setAttribute("src", path2);
        console.log("bigImage2:", bigImage);
        console.log("imgPopup2:", imgPopup);
      } else if (target.classList.contains("info__item")) {
        // var path3;
        if (target.closest(".info")) {
          var path3 = target.closest(".info").previousElementSibling.getAttribute("href");
        }

        console.log("path3:", path3);
        bigImage.setAttribute("src", path3);
        console.log("bigImage3:", bigImage);
        console.log("imgPopup3:", imgPopup);
      }

      imgPopup.style.display = "flex";
      bodyLock();
    }

    if (target.closest(".popup") && target.matches("img")) {
      imgPopup.style.display = "none";
      bodyUnLock();
    }
  });
}

function form(formSelector, inputSelector) {
  //Forms
  var postDate = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (url, date) {
      var res = yield fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: date
      });
      return yield res.json();
    });

    return function postDate(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  ;
  var forms = document.querySelectorAll(formSelector),
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

  function clearInputs(inputs) {
    inputs.forEach(input => {
      if (!(input == null)) {
        input.classList.remove('focus');
        input.value = input.dataset.value;
        input.parentElement.classList.remove("focus");
        input.blur();
      } else {
        return;
      }
    });
  }

  numbersInput.addEventListener('input', () => numbersInput.value = numbersInput.value.replace(/\D/, ''));

  function bindPostDate(form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      showThanksModal(message.loading);
      var formDate = new FormData(form);
      var json = JSON.stringify(Object.fromEntries(formDate.entries()));

      if (form.hasAttribute("data-subs")) {
        postDate(" http://localhost:3000/subscribe", json).then(date => {
          console.log(date);
          showThanksModal(message.subscribe);
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          var inputs = form.querySelectorAll(inputSelector);
          clearInputs(inputs);
        });
      } else {
        postDate("http://localhost:3000/requests", json).then(date => {
          console.log(date);
          showThanksModal(message.success);
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          var children = form.querySelectorAll("div");
          var inputs2 = [];
          children.forEach(child => {
            inputs2.push(child.querySelector(inputSelector));
          });
          console.log(inputs2); // form.reset();

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
}

;
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