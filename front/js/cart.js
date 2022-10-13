"use strict";
let data = [];
let total = [];
const getData = async (myId) => {
  await fetch(`http://localhost:3000/api/products/${myId}`)
    .then((res) => res.json())
    .then((res) => (data = res));
};

const myFunction = () => {
  const cart__item = document.querySelector(".cart__item");
  if (window.confirm("Confirmer 'ok' pour supprimer")) {
    alert("yyyear");
  }
};

let myGet = window.localStorage.getItem("array2");

let arrayLocalStorage = JSON.parse(window.localStorage.array2 || "[]");

console.log(arrayLocalStorage);

const totalArticle = () => {};

const createBasket = async () => {
  let product = JSON.parse(window.localStorage.array2);

  for (let i = 0; i < myGet.length; i++) {
    await getData(product[i]._id);

    cart__items.innerHTML += ` <article class="cart__item" id='test' data-id="${
      product[i]._id
    }" data-color=${product[i].colors}>
                <div class="cart__item__img">
                  <img src=${data.imageUrl} alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${product[i].colors}</p>
                    <p>${data.price * product[i].quantity} € <em>(${
      data.price
    }€ x ${product[i].quantity})</em></p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :  </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"  value=${
                        product[i].quantity
                      } >
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" 
                        >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
    //Total des produits
    {
      total.push(data.price * product[i].quantity);
      const sumWithInitial = total.reduce((one, two) => one + two, 0);
      totalPrice.innerHTML = sumWithInitial.toLocaleString();
    }

    {
      const article = document.querySelector("article");
      const articleSelect = document
        .querySelector(".deleteItem")
        .closest(".cart__item");
      articleSelect.addEventListener("click", () => {
        if (window.confirm("Confirmer pour supprimer?")) {
          articleSelect.remove();
        }
      });
    }
  }
};
createBasket();

//PASSER LA COMMANDE
const cart__order__form = document.querySelector("form");
const inputs = document.querySelectorAll(
  ' input[type="text"], input[type="email"]'
);
let firstName, onename, adress, city, mail;

const errorDisplay = (tag, message, valid) => {
  const selectId = document.querySelector(`#${tag}`);

  if (!valid) {
    selectId.textContent = message;
  } else {
    selectId.textContent = message;
  }
};
const firstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "firstNameErrorMsg",
      "Le prenom doit faire entre 3 et 20 caractères"
    );
    firstName = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "firstNameErrorMsg",
      "Le prenom ne doit pas contenir de caractères spéciaux"
    );
    firstName = null;
  } else {
    errorDisplay("firstNameErrorMsg", "", "");
    firstName = value;
  }
};
const oneNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "lastNameErrorMsg",
      "Le nom doit faire entre 3 et 20 caractères"
    );
    onename = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "lastNameErrorMsg",
      "Le prenom ne doit pas contenir de caractères spéciaux"
    );
    onename = null;
  } else {
    errorDisplay("lastNameErrorMsg", "", "");
    onename = value;
  }
};

const adressChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "addressErrorMsg",
      "L'adresse doit faire entre 3 et 20 caractères"
    );
    adress = null;
  } else if (!value.match(/^[a-zA-Z0-9|\s]{2,15}$/)) {
    errorDisplay(
      "addressErrorMsg",
      "L'adresse ne doit pas contenir de caractères spéciaux"
    );
    adress = null;
  } else {
    errorDisplay("addressErrorMsg", "", "");
    adress = value;
  }
};

const cityChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("cityErrorMsg", "Le nom doit faire entre 3 et 20 caractères");
    city = null;
  } else if (!value.match(/^[a-zA-Z0-9|\s]{2,15}$/)) {
    errorDisplay(
      "cityErrorMsg",
      "La ville ne doit pas contenir de caractères spéciaux"
    );
    city = null;
  } else {
    errorDisplay("cityErrorMsg", "", "");
    city = value;
  }
};

const mailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("emailErrorMsg", "Le mail n'est pas valide");
    mail = null;
  } else {
    errorDisplay("emailErrorMsg", "", true);
    mail = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        oneNameChecker(e.target.value);
        break;
      case "address":
        adressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        mailChecker(e.target.value);
        break;

      default:
        null;
    }
  });
});
cart__order__form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (firstName && onename && mail && adress && city) {
    const data = {
      firstName,
      onename,
      adress,
      city,
      mail,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));

    firstName = null;
    onename = null;
    adress = null;
    city = null;
    mail = null;
    alert("Commande passée !");
  }
});

const sendPost = async () => {
  const initPost = {
    method: "POST",

    body: data,
    credentials: "same-origin",
  };
  await fetch("http://localhost:3000/api/products/order", initPost).then(() =>
    console.log("data envoyé")
  );
};

order.addEventListener("click", sendPost);
