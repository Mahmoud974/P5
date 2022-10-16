"use strict";
//Init the data and total
let data = [];
let total = [];
//Get the storage of 'Produit'
let productStorage = JSON.parse(localStorage.getItem("produit"));
/**
 *
 * @param {String} myId
 */
const getData = async (myId) => {
  await fetch(`http://localhost:3000/api/products/${myId}`)
    .then((res) => res.json())
    .then((res) => (data = res));
};

/**
 * Make the products in the basket
 */
const getProducts = async () => {
  let myGet = window.localStorage.getItem("produit");
  if (myGet === null) {
    cart__items.innerHTML = "<p>Panier vide</p>";
  } else {
    for (let i = 0; i < myGet.length; i++) {
      let getJSON = JSON.parse(myGet)[i];

      await getData(getJSON._id);

      cart__items.innerHTML += ` <article class="cart__item" id='test' data-id="${String(
        getJSON._id
      )}" data-color=${getJSON.colors}>
                <div class="cart__item__img">
                  <img src=${String(
                    data.imageUrl
                  )} alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${String(data.name)}</h2>
                    <p>${getJSON.colors}</p>
                    <p>${Number(data.price * getJSON.quantity)} € <em>(${
        data.price
      }€ x ${getJSON.quantity})</em></p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :  </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" onChange="modifyTheQuantity()"  value=${
                        getJSON.quantity
                      } >
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick='removeProduct()'
                        >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
      //Add the total
      {
        total.push(data.price * getJSON.quantity);
        const sumWithInitial = total.reduce((one, two) => one + two, 0);
        totalPrice.innerHTML = sumWithInitial.toLocaleString();
      }
    }
  }
};
getProducts();
/**
 * Modify the quantity of the page cart.html
 */
const modifyTheQuantity = () => {
  let allInputs = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener("change", () => {
      //Find and Modify the data
      let theQuantity = productStorage[i].quantity,
        valueModify = allInputs[i].valueAsNumber;
      const findQuantity = productStorage.find(
        (product) => product.valueModify !== theQuantity
      );

      findQuantity.quantity = valueModify;
      productStorage[i].quantity = findQuantity.quantity;
      //Call the storage
      localStorage.setItem("produit", JSON.stringify(productStorage));
      window.location.reload();
    });
  }
  return true;
};
/**
 * Delete the product of the page cart.html
 */
const removeProduct = () => {
  let buttonRemove = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < buttonRemove.length; i++) {
    buttonRemove[i].addEventListener("click", () => {
      let idDelete = productStorage[i].idProduit;
      let colorDelete = productStorage[i].couleurProduit;
      productStorage = productStorage.filter(
        (filterProduct) =>
          filterProduct.idProduit !== idDelete ||
          filterProduct.couleurProduit !== colorDelete
      );

      localStorage.setItem("produit", JSON.stringify(productStorage));
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
};

//Check of forms with regex
const cart__order__form = document.querySelector("form");
const inputs = document.querySelectorAll(
  ' input[type="text"], input[type="email"]'
);
//Init of variables
let firstName, lastname, adress, city, mail;
//Alert of mistakes
const errorDisplay = (tag, message, valid) => {
  const selectId = document.querySelector(`#${tag}`);

  if (!valid) {
    selectId.textContent = message;
  } else {
    selectId.textContent = message;
  }
};
/**
 *
 * @param {String} value
 */
const checkFirstName = (value) => {
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
/**
 *
 * @param {String} value
 */
const checkLastName = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "lastNameErrorMsg",
      "Le nom doit faire entre 3 et 20 caractères"
    );
    lastname = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "lastNameErrorMsg",
      "Le prenom ne doit pas contenir de caractères spéciaux"
    );
    lastname = null;
  } else {
    errorDisplay("lastNameErrorMsg", "", "");
    lastname = value;
  }
};
/**
 *
 * @param {String} value
 */
const checkAdress = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "addressErrorMsg",
      "L'adresse doit faire entre 3 et 20 caractères"
    );
    adress = null;
  } else if (
    !value.match(/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/)
  ) {
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
/**
 *
 * @param {String} value
 */
const checkCity = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("cityErrorMsg", "Le nom doit faire entre 3 et 20 caractères");
    city = null;
  } else if (!value.match(/^[a-zA-Z0-9|\s]{2,15}$/)) {
    //Alert of mistakes
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
/**
 *
 * @param {String} value
 */
const checkMail = (value) => {
  if (!value.match(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/)) {
    errorDisplay("emailErrorMsg", "Le mail n'est pas valide");
    mail = null;
  } else {
    errorDisplay("emailErrorMsg", "", true);
    mail = value;
  }
};
/**
 * Full the inputs correctly
 */
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        checkFirstName(e.target.value);
        break;
      case "lastName":
        checkLastName(e.target.value);
        break;
      case "address":
        checkAdress(e.target.value);
        break;
      case "city":
        checkCity(e.target.value);
        break;
      case "email":
        checkMail(e.target.value);
        break;

      default:
        null;
    }
  });
});

/**
 * Send the form to confirmation.html
 */
cart__order__form.addEventListener("submit", (e) => {
  e.preventDefault();

  //Build localStorage of array
  let idProducts = [];
  for (let i = 0; i < productStorage.length; i++) {
    idProducts.push(productStorage[i].idProduit);
  }

  const dataForm = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: idProducts,
  };

  const initPost = {
    method: "POST",
    body: JSON.stringify(dataForm),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  e.preventDefault();
  fetch("http://localhost:3000/api/products/order", initPost)
    .then((data) => {
      console.log(data.orderId);
      localStorage.clear();
      localStorage.setItem("orderId", data.orderId);

      window.location.href = `/front/html/confirmation.html?orderId=${data.orderId}`;
    })
    .then(() => console.log("data envoyé"));
});
//Send form to the page confirmation.html
