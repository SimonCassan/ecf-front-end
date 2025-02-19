const btnBurger = document.querySelector('#burger-icon');
const lineTop = document.querySelector('.menu-top');
const lineMiddle = document.querySelector('.menu-middle');
const lineBot = document.querySelector('.menu-bottom');

const burgerMenu = document.querySelector('.burger-list');

function closeMenu() {
    lineTop.classList.toggle('rotate45', false);
    lineMiddle.classList.toggle('opacity0', false);
    lineBot.classList.toggle('-rotate45', false);
    burgerMenu.classList.toggle('burger-active', false);
}

btnBurger.addEventListener('click', (event) => {
    event.stopPropagation();
    lineTop.classList.toggle('rotate45');
    lineMiddle.classList.toggle('opacity0');
    lineBot.classList.toggle('-rotate45');
    burgerMenu.classList.toggle('burger-active');
})

window.addEventListener('click', (event) => {
    if (!burgerMenu.contains(event.target))
        closeMenu();
})



const lastnameField = document.querySelector('#lastname');
const firstnameField = document.querySelector('#firstname');
const emailField = document.querySelector('#email');
const subjectField = document.querySelector('#object');
const msgField = document.querySelector('#msg');
const checkBoxField = document.querySelector('#agreed');
const btnForm = document.querySelector('.btn-submit');
const form = document.querySelector('form');
const cardSuccess = document.querySelector('.card');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isFnameValid = checkValue(firstnameField);
    const isLnameValid = checkValue(lastnameField);
    const isEmailValid = checkValueEmail(emailField);
    const isSubjectValid = checkValue(subjectField);
    const isMsgValid = checkValue(msgField);
    const isCheckboxValid = checkValueCheckbox(checkBoxField);
    if (isFnameValid && isLnameValid && isEmailValid && isSubjectValid && isMsgValid && isCheckboxValid) {
        cardSuccess.classList.add('card-active');
        setTimeout(() => {
            cardSuccess.classList.remove('card-active');
        }, 3500);
    }
})

function checkValue(dataField) {
    if (dataField.value.trim() === "") {
        dataField.parentElement.classList.add('error-active');
        return false;
    }
    else
        return true;
}
function checkValueCheckbox(dataField) {
    if (dataField.checked)
        return true;
    else {
        dataField.parentElement.classList.add('error-active');
        return false;
    }
}
function checkValueEmail(dataField) {
    if (checkValue(dataField)) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(dataField.value.trim())) {
            dataField.parentElement.classList.add('error-active');
            dataField.nextElementSibling.textContent = "Saisir un email valide : nom@exemple.fr.";
            return false;
        }
        else
            return true;
    }
    else
        return false;
}

firstnameField.addEventListener('input', () => {
    firstnameField.parentElement.classList.remove('error-active');
})
lastnameField.addEventListener('input', () => {
    lastnameField.parentElement.classList.remove('error-active');
})
subjectField.addEventListener('input', () => {
    subjectField.parentElement.classList.remove('error-active');
})
emailField.addEventListener('input', () => {
    emailField.parentElement.classList.remove('error-active');
    emailField.parentElement.querySelector('.error-text').textContent = "Champ obligatoire";
})
msgField.addEventListener('input', () => {
    msgField.parentElement.classList.remove('error-active');
})
checkBoxField.addEventListener('change', () => {
    checkBoxField.parentElement.classList.remove('error-active');
})