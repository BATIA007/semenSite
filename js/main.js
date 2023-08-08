"use strict";

let bodyElem = document.querySelector('body');

function validateEmail(email) {
  let pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (pattern.test(email.value)) {
    return true;
  } else {
    return false;
  }
}


if (document.querySelector('.blogs__search')) {
  const button = document.querySelector('.blogs__send');
  let inputEmail = document.querySelector('.blogs__email');
  const form = document.getElementById('form');

  form.addEventListener('submit', formSend)

  async function formSend(e) {
    e.preventDefault();
    form.classList.add('form__loading');
    if (validateEmail(inputEmail) && inputEmail.value != '') {
      let formData = new FormData(form);
      formData.append('email', inputEmail.value);

      let response = await fetch('mail.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        form.classList.remove('form__loading');
      } else {
        alert('Form submission failed');
        form.classList.remove('form__loading');
      }

      inputEmail.closest('.blogs__field').classList.remove('input__error');
      inputEmail.value = "";
    } else {
      inputEmail.closest('.blogs__field').classList.add('input__error');
    }
  }
}

