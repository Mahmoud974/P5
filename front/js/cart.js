"use strict";
let data = [];
const cart__item = document.createElement("article"),
  cart__item__img = document.createElement("div"),
  createImg = document.createElement("img"),
  cart__item__content = document.createElement("div"),
  titleH2 = document.createElement("h2"),
  cart__item__content__settings = document.createElement("div"),
  cart__item__content__settings__quantity = document.createElement("div"),
  cart__item__content__settings__delete = document.createElement("div"),
  cart__item__content__description = document.createElement("div"),
  paragraphColors = document.createElement("p"),
  paragraphPrice = document.createElement("p"),
  paragraphQte = document.createElement("p"),
  deleteItem = document.createElement("p"),
  itemQuantity = document.createElement("input");

const getData = async (myId) => {
  await fetch(`http://localhost:3000/api/products/${myId}`)
    .then((res) => res.json())
    .then((res) => (data = res));
};

let myGet = window.localStorage.getItem("array2");

const addElementsAndClass = () => {
  createImg.setAttribute("alt", "Photographie");

  cart__items.appendChild(cart__item);
  cart__item.classList.add("cart__item");
  cart__item.setAttribute("data-id", "{product-ID}");
  cart__item.setAttribute("data-color", "{product-color}");
  //IMG mettre image
  cart__item.appendChild(cart__item__content);
  cart__item__content.classList.add("cart__item__content");
  cart__item.appendChild(cart__item__img).classList.add("cart__item__img");
  cart__item__img.appendChild(createImg);

  //Card item content
  cart__item
    .appendChild(cart__item__content)
    .classList.add("cart__item__content");
  cart__item__content.append(cart__item__content__description);
  cart__item__content__description.classList.add(
    "cart__item__content__description"
  );
  cart__item__content__description.appendChild(titleH2);
  cart__item__content__description.appendChild(paragraphColors);
  cart__item__content__description.appendChild(paragraphPrice);

  //cart__item__content__settings
  cart__item__content.append(cart__item__content__settings);
  cart__item__content__settings.classList.add("cart__item__content__settings");
  cart__item__content__settings.append(cart__item__content__settings__quantity);
  cart__item__content__settings__quantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  cart__item__content__settings__quantity.appendChild(paragraphQte);

  cart__item__content__settings__quantity.appendChild(itemQuantity);
  itemQuantity.classList.add("itemQuantity");
  let attributInput = {
    name: "itemQuantity",
    min: "1",
    max: "100",
    value: "42",
  };

  for (const key in attributInput) {
    itemQuantity.setAttribute(key, attributInput[key]);
  }

  cart__item__content__settings.appendChild(
    cart__item__content__settings__delete
  );
  cart__item__content__settings__delete.classList.add(
    "cart__item__content__settings__delete"
  );
  cart__item__content__settings__delete.appendChild(deleteItem);
  deleteItem.classList.add("deleteItem");
  deleteItem.innerHTML = "Supprimer";
};
addElementsAndClass();

const valueDynamique = (imgProduct, titleproduct, color, price, qte) => {
  //Valeurs
  paragraphQte.innerHTML = "Qté";
  itemQuantity.value = qte;
  titleH2.innerHTML = titleproduct;
  paragraphPrice.innerHTML = price + "€";
  paragraphColors.innerHTML = color;
  createImg.setAttribute("src", imgProduct);
};

// addElementsAndClass(
//   data.imageUrl,
//   data.name,
//   product[i].colors,
//   data.price * product[i].quantity,
//   product[i].quantity
// );
const createBasket = async () => {
  let product = JSON.parse(window.localStorage.array2);

  for (let i = 0; i < myGet.length; i++) {
    await getData(product[i]._id);

    valueDynamique(
      data.imageUrl,
      data.name,
      product[i].colors,
      data.price * product[i].quantity,
      product[i].quantity
    );

    // cart__items.innerHTML += ` <article class="cart__item" id='test' data-id="${
    //   product[i]._id
    // }" data-color=${product[i].colors}>
    //             <div class="cart__item__img">
    //               <img src=${data.imageUrl} alt="Photographie d'un canapé">
    //             </div>
    //             <div class="cart__item__content">
    //               <div class="cart__item__content__description">
    //                 <h2>${data.name}</h2>
    //                 <p>${product[i].colors}</p>
    //                 <p>${data.price * product[i].quantity} € <em>(${
    //   data.price
    // }€ x ${product[i].quantity})</em></p>
    //               </div>
    //               <div class="cart__item__content__settings">
    //                 <div class="cart__item__content__settings__quantity">
    //                   <p>Qté :  </p>
    //                   <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${
    //                     product[i].quantity
    //                   }>
    //                 </div>
    //                 <div class="cart__item__content__settings__delete">
    //                   <p class="deleteItem" >Supprimer</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </article>`;
  }
};

createBasket();
deleteItem.addEventListener("click", (e) => {
  cart__item.remove(e.target);
});

//PASSER LA COMMANDE
const cart__order__form = document.querySelector("form");
const inputs = document.querySelectorAll(
  ' input[type="text"], input[type="email"]'
);
let firstName, onename, adress, city, mail;
const errorDisplay = (tag, message, valid) => {
  const selectId = document.querySelector(`#${tag}`);
  console.log(selectId);
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
    progressBar.classList = "";

    firstName = null;
    onename = null;
    adress = null;
    city = null;
    mail = null;
    alert("Inscription validée !");
  }
});
