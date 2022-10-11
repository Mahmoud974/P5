// "use strict";

let data = [];
const getData = async (myId) => {
  await fetch(`http://localhost:3000/api/products/${myId}`)
    .then((res) => res.json())
    .then((res) => (data = res))
    .then(() => console.log(data));
};

let myGet = window.localStorage.getItem("array2");
//TODO:
// const createArticle = document.createElement("article"),
//   createDiv = document.createElement("div"),
//   createImg = document.createElement("img"),
//   createDivSecond = document.createElement("div"),
//   createDivThirsty = document.createElement("div"),
//   titleH2 = document.createElement("h2"),
//   paragraphFisrt = document.createElement("p"),
//   paragraphSecond = document.createElement("p"),
//   paragraphThirsty = document.createElement("p"),

// const addElementsAndClass = () => {
//   cart__items.appendChild(createArticle).classList.add("cart__item");
//   createArticle.appendChild(createDiv).classList.add("cart__item__img");

//   createArticle
//     .appendChild(createDivSecond)
//     .classList.add("cart__item__content");
//   createDiv.appendChild(createImg).setAttribute("src", "www.g");
//   createDiv.setAttribute("alt", "ok");

//   createDivSecond
//     .appendChild(createDivThirsty)
//     .classList.add("cart__item__content__description");
//   createDivThirsty.appendChild(titleH2);
//   createDivThirsty.appendChild(paragraphFisrt);
//   createDivThirsty.appendChild(paragraphSecond);
// paragraphFisrt.innerHTML = "Qté:";
// };

// addElementsAndClass();

const createBasket = async () => {
  let product = JSON.parse(localStorage.array2);

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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${
                        product[i].quantity
                      }>
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  }
  data.reduce((ok) => console.log(eval(ok.price)));
};
createBasket();
