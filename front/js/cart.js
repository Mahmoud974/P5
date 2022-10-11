"use strict";

let data = [];
const getData = async (myId) => {
  await fetch(`http://localhost:3000/api/products/${myId}`)
    .then((res) => res.json())
    .then((res) => (data = res));
};

let myGet = window.localStorage.getItem("array2");

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

const addElementsAndClass = (imgProduct, titleproduct, price, qte) => {
  createImg.setAttribute("alt", "Photographie");

  cart__items.appendChild(cart__item);
  cart__item.classList.add("cart__item");
  cart__item.setAttribute("data-id", "{product-ID}");
  cart__item.setAttribute("data-color", "{product-color}");
  //IMG mettre image
  cart__item.appendChild(cart__item__content);
  cart__item__content.classList.add("cart__item__content");
  cart__item.appendChild(cart__item__img).classList.add("cart__item__img");
  cart__item__img.appendChild(createImg).setAttribute("src", imgProduct);

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
  titleH2.innerHTML = titleproduct;
  paragraphPrice.innerHTML = price;
  paragraphColors.innerHTML = qté;

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
    console.log(attributInput.valueOf());
    itemQuantity.setAttribute(key, "A modifier");
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

const createBasket = async () => {
  let product = JSON.parse(window.localStorage.array2);

  for (let i = 0; i < myGet.length; i++) {
    await getData(product[i]._id);

    // addElementsAndClass(
    //   data.imageUrl,
    //   data.name,
    //   product[i].colors,
    //   data.price * product[i].quantity,
    //   product[i].quantity
    // );
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
    let total = data.price;
    console.log();
  }
};

createBasket();
