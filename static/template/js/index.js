function setFormMessage(formElement, type, message) { // fonction pour les messages d'erreurs et de succès pour les deux formulaires (login et create account)
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => { // creer un reference sur les liens
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => { // si on clique sur create account, alors on affiche le formulaire de login et on cache create account
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => { // Cacher login et afficher create account, si on clique sur le lien login
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => { // Afficher le msg d'erreur si le bouton est cliqué
        e.preventDefault();

        setFormMessage(loginForm, "error", "Remplissez les deux champs !!");
    });


    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => { // when the user take focus on the actual element
            if (e.target.id === "nom" && e.target.value === "") {
                setInputError(inputElement, "Nom obligatoire !");
            }
        });

        /*inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        }); */

        inputElement.addEventListener("blur", e => { 
            if (e.target.id === "prenom" && e.target.value === "") {
                setInputError(inputElement, "Prenom obligatoire !");
            }
        });

        inputElement.addEventListener("blur", e => { 
            if (e.target.id === "cne" && e.target.value === "") {
                setInputError(inputElement, "CNE obligatoire !");
            }
        });
        inputElement.addEventListener("blur", e => { 
            if (e.target.id === "dn" && e.target.value === "") {
                setInputError(inputElement, "Date of Birth obligatoire !");
            }
        });

        inputElement.addEventListener("blur", e => { 
            if (e.target.id === "email" && e.target.value === "") {
                setInputError(inputElement, "Email obligatoire !");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });


    }); 
});


