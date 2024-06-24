const body = document.querySelector('body')
const burgerOpen = document.querySelector('.burger__field') 
const burgerClose = document.querySelector('.burger__field_close') 
const navLinks = document.querySelectorAll('.sidebar__nav-link')

// burger menu
const popup = document.querySelector('.intro__popup') 

const openPopup = () => {
    popup.classList.add('open')
    body.classList.add('body_lock')
}

const closePopup = () => {
    popup.classList.remove('open')
    body.classList.remove('body_lock')
}

burgerOpen.addEventListener('click', openPopup)
burgerClose.addEventListener('click', closePopup)

navLinks.forEach(link => {
  link.addEventListener('click', () => {
   const sectionID = link.getAttribute('href').substring(1)
    if(sectionID) {
        document.getElementById(sectionID).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    closePopup()
  })  
})

// form input validation

let isNameValid = false
let isEmailValid = false
let isTextValid = false

const nameValidator = /^[А-ЯЁA-Z][а-яёa-zА-ЯЁA-Z]+$/
const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nameField = document.getElementById('fieldset-name')
const emailField = document.getElementById('fieldset-email')
const textField = document.getElementById('fieldset-text')
const nameInput = document.getElementById('input-name')
const emailInput = document.getElementById('input-email')
const textInput = document.getElementById('input-text')
const policyInput = document.getElementById('input-policy')
const formBtn = document.getElementById('form-btn')

const showError = (id, message) => {
  document.getElementById(id).innerText = message
}

const removeError = (id) => {
  document.getElementById(id).innerText = ''
}

const isElementVisible = (element) => {
  return element && element.offsetWidth > 0 && element.offsetHeight > 0;
}

const validateForm = () => {
  const isPolicyVisible = isElementVisible(policyInput)
  formBtn.disabled = !(isNameValid && isEmailValid && isTextValid && (!isPolicyVisible || policyInput.checked));
}

const checkValidName = (e) => {
  const value = e.target.value
  if(!nameValidator.test(value) || value.trim() === '') {
    showError('name-error', 'Имя должно содержать только буквы. Первая буква заглавная')
    nameField.classList.add('form-fieldset_warning')
    isNameValid = false
  }else {
    nameField.classList.remove('form-fieldset_warning')
    removeError('name-error')
    isNameValid = true
  }
  validateForm()
}

const checkValidEmail = (e) => {
  const value = e.target.value
  if(!emailValidator.test(value) || value.trim() === '') {
    showError('email-error', 'Неверно введен email')
    emailField.classList.add('form-fieldset_warning')
    isEmailValid = false
  }else {
    emailField.classList.remove('form-fieldset_warning')
    removeError('email-error')
    isEmailValid = true
  }
  validateForm()
}

const checkValidText = (e) => {
  const value = e.target.value
  if(value.trim() === '') {
    showError('text-error', 'Сообщение обязательно для отправки формы')
    textField.classList.add('form-fieldset_warning')
    isTextValid = false
  }else {
    textField.classList.remove('form-fieldset_warning')
    removeError('text-error')
    isTextValid = true
  }
  validateForm()
}

const submitForm = () => {
 const data = {
  name: nameInput.value,
  email: emailInput.value,
  message: textInput.value,
 }
  postMessage(data)
    nameInput.value = ''
    emailInput.value = ''
    textInput.value = ''
    isNameValid = false
    isEmailValid = false
    isTextValid = false
    if(isElementVisible(policyInput)) {
      policyInput.checked = false
    }
    formBtn.disabled = true
}

nameInput.addEventListener('input', checkValidName)
emailInput.addEventListener('input', checkValidEmail)
textInput.addEventListener('input', checkValidText)
policyInput.addEventListener('change', validateForm);
formBtn.addEventListener('click', submitForm)

// API request
async function postMessage(data) {
  try {
    const request = await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    const resp = await request.json()
    console.log(resp)
    alert('Сообщение успешно отправлено!')
  } catch (error) {
    console.error('Server error: ', error)
    alert('Что-то пошло не так :(')
  }
}
