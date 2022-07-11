/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById('header')
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 70) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 100,
      sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)


/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== SCROLL REVEAL ANIMATION ===============*/
// const sr = ScrollReveal ({
//   origin: 'top',
//   distance: '60px',
//   duration: 2500,
//   delay: 400,
//   reset: true
// })

// sr.reveal(`.home__title, .popular__container, .subscribe__container, .footer__container`)
// sr.reveal(`.home__description, .footer__info`, {delay: 500})
// sr.reveal(`.home__search`, {delay: 600})
// sr.reveal(`.home__value`, {delay: 700})
// sr.reveal(`.home__images`, {delay: 800, origin: 'bottom'})
// sr.reveal(`.logos__img`, {interval: 100})
// sr.reveal(`.value__images, .contact__content`, {origin: 'left'})
// sr.reveal(`.value__content, .contact__images`, {origin: 'right'})


/*=============== Telephone mask ===============*/
// window.addEventListener("DOMContentLoaded", function() {
//   [].forEach.call( document.querySelectorAll('.form__tel-input'), function(input) {
//   var keyCode;
//   function mask(event) {
//       event.keyCode && (keyCode = event.keyCode);
//       var pos = this.selectionStart;
//       if (pos < 3) event.preventDefault();
//       var matrix = "+7 (___) ___ ____",
//           i = 0,
//           def = matrix.replace(/\D/g, ""),
//           val = this.value.replace(/\D/g, ""),
//           new_value = matrix.replace(/[_\d]/g, function(a) {
//               return i < val.length ? val.charAt(i++) || def.charAt(i) : a
//           });
//       i = new_value.indexOf("_");
//       if (i != -1) {
//           i < 5 && (i = 3);
//           new_value = new_value.slice(0, i)
//       }
//       var reg = matrix.substr(0, this.value.length).replace(/_+/g,
//           function(a) {
//               return "\\d{1," + a.length + "}"
//           }).replace(/[+()]/g, "\\$&");
//       reg = new RegExp("^" + reg + "$");
//       if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
//       if (event.type == "blur" && this.value.length < 5)  this.value = ""
//   }

//   input.addEventListener("input", mask, false);
//   input.addEventListener("focus", mask, false);
//   input.addEventListener("blur", mask, false);
//   input.addEventListener("keydown", mask, false)

// });

// });



/*=============== Telephone mask ===============*/
const form = document.querySelector('.contact__form');
const telSelector = form.querySelector('.form__tel-input');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telSelector);

/*=============== Just Validate ===============*/
const validation = new JustValidate('.contact__form',
{
  errorLabelStyle: {
    color: '#ffc800',
    textDecoration: 'underlined',
  },
});

validation
  .addField('.form__name-input', [
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите имя!'
    }
  ])
  .addField('.form__email-input', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Email обязателен',
    },
    {
      rule: 'email',
      value: true,
      errorMessage: 'Введите корректный Email',
    },
  ])
  .addField('.form__tel-input', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Телефон обязателен',
    },
    {
      rule: 'function',
      validator: function() {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный телефон',
    },
  ]).onSuccess((event) => {
    console.log('Validation passes and form submitted', event);

    console.log(event)
    
    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success();
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();
  });

  function success() {
    swal({
      title: "Сообщение успешно отправлено",
      icon: "success",
    });
  }