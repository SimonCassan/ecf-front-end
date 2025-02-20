const btnBurger = document.querySelector('#burger-icon');
const lineTop = document.querySelector('.menu-top');
const lineMiddle = document.querySelector('.menu-middle');
const lineBot = document.querySelector('.menu-bottom');

const burgerMenu = document.querySelector('.burger-list');
const links = burgerMenu.querySelectorAll('a');

// on remet la ligne top/bottom à la position horizontale, fait réapparaitre la ligne du milieu (opacity à 1), et on masque le menu
function closeMenu() {
    lineTop.classList.toggle('rotate45', false);
    lineMiddle.classList.toggle('opacity0', false);
    lineBot.classList.toggle('-rotate45', false);
    burgerMenu.classList.toggle('burger-active', false);
    btnBurger.setAttribute('aria-label', 'Bouton pour ouvrir le menu de navigation');
}

// quand on clique sur le menu, on active/enlève les classes nécessaires
btnBurger.addEventListener('click', (event) => {
    // pour que le clic sur le bouton ne soit pas transmis au clic sur la window - qui elle ferme tout systématiquement
    event.stopPropagation();
    lineTop.classList.toggle('rotate45');
    lineMiddle.classList.toggle('opacity0');
    lineBot.classList.toggle('-rotate45');
    burgerMenu.classList.toggle('burger-active');
    if (burgerMenu.classList.contains('burger-active'))
        btnBurger.setAttribute('aria-label', 'Bouton pour fermer le menu de navigation');
    else
        btnBurger.setAttribute('aria-label', 'Bouton pour ouvrir le menu de navigation');
})

window.addEventListener('click', (event) => {
    if (!burgerMenu.contains(event.target))
        closeMenu();
})

// quand on clic sur un des liens du menu, on ferme le menu
links.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    })
});

const lastnameField = document.querySelector('#lastname');
const firstnameField = document.querySelector('#firstname');
const emailField = document.querySelector('#email');
const subjectField = document.querySelector('#object');
const msgField = document.querySelector('#msg');
const checkBoxField = document.querySelector('#agreed');
const btnForm = document.querySelector('.btn-submit');
const form = document.querySelector('form');
const cardSuccess = document.querySelector('.card');

// A la soumission du formulaire
form.addEventListener('submit', (event) => {
    // empécher la soumission normale du formulaire
    event.preventDefault();
    // vérifie que tous les champs sont valides
    const isFnameValid = checkValue(firstnameField, 2, 50, true);
    const isLnameValid = checkValue(lastnameField, 2, 50, true);
    const isEmailValid = checkValueEmail(emailField);
    const isSubjectValid = checkValue(subjectField, 3);
    const isMsgValid = checkValue(msgField, 3);
    const isCheckboxValid = checkValueCheckbox(checkBoxField);
    // si tous les champs sont valides, on affiche un message et on remet à zéro le formulaire
    if (isFnameValid && isLnameValid && isEmailValid && isSubjectValid && isMsgValid && isCheckboxValid) {
        cardSuccess.classList.add('card-active');
        setTimeout(() => {
            cardSuccess.classList.remove('card-active');
        }, 3500);
        form.reset();
    }
})

// permet de vérifier la validité d'un champ
function checkValue(dataField, min = 1, max = 250, isLetters = false) {
    const dataValue = dataField.value.trim();
    if (dataValue === "" || dataValue.length < min || dataValue > max) {
        dataField.parentElement.classList.add('error-active');
        return false;
    }
    else if (isLetters) {
        const regexLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
        if (!regexLetters.test(dataValue)) {
            dataField.parentElement.classList.add('error-active');
            dataField.nextElementSibling.textContent = "Caractères non autorisés";
            return false;
        }
        else
            return true;
    }
    else
        return true;
}

// permet de vérifier si la Checkbox a bien été cochée
function checkValueCheckbox(dataField) {
    if (dataField.checked)
        return true;
    else {
        dataField.parentElement.classList.add('error-active');
        return false;
    }
}

// vérifier que le champ email existe et est valide
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

// retire les messages d'erreurs quand on commence à taper quelque chose
firstnameField.addEventListener('input', () => {
    firstnameField.parentElement.classList.remove('error-active');
    firstnameField.parentElement.querySelector('.error-text').textContent = "Champ obligatoire, entre 2 et 50 caractères.";
})
lastnameField.addEventListener('input', () => {
    lastnameField.parentElement.classList.remove('error-active');
    lastnameField.parentElement.querySelector('.error-text').textContent = "Champ obligatoire, entre 2 et 50 caractères.";
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


// changement du couleur du menu burger quand on passe sur le footer
const footer = document.querySelector('footer');
// décalage du menu par rapport au haut de la fenêtre visible
const menuOffset = 83.2;
window.addEventListener('scroll', () => {
    const footerOffset = footer.offsetTop;
    // Position actuelle du scroll
    const scrollY = window.scrollY;
    const footerVisibleTop = footerOffset - scrollY;
    if (footerVisibleTop <= menuOffset) {
        burgerMenu.style.backgroundColor = '#202e5a';
        document.documentElement.style.setProperty('--underline-color', '#c82d43');
    }
    else {
        burgerMenu.style.backgroundColor = '#c82d43';
        document.documentElement.style.setProperty('--underline-color', '#202e5a');
    }
});

// masque le laader quand l'iframe est chargé.
const iframe = document.querySelector("iframe");
iframe.addEventListener("load", function () {
    const loader = this.previousElementSibling;
    if (loader) {
        loader.style.display = "none";
    }
});