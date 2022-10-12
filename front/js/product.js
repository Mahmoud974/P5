"use strict";

let data = [];
let arrayLocalStorage = JSON.parse(window.localStorage.array2 || "[]");

const option = document.querySelector("option"),
  item_img = document.querySelector(".item__img");

const getArticle = async () => {
  let str = window.location.href;
  let url = new URL(str);
  let search_params = new URLSearchParams(url.search);
  if (search_params.has("id")) {
    var id = search_params.get("id");
  }
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((data) => data.json())
    .then((res) => (data = res));
};

const setLocalStorage = async () => {};

const setData = () => {
  document.title = `${data.name} | ${data.description}`;
  title.textContent = data.name;
  item_img.innerHTML = ` <img src=${data.imageUrl} alt=${data.altTxt}>`;
  price.textContent = data.price.toLocaleString();
  description.textContent = data.description;

  //input option
  for (let i = 0; i < data.colors.length; i++) {
    const select = document.querySelector("select");
    const option = document.createElement("option");
    select.appendChild(option);
    option.innerHTML = data.colors[i];
    option.value = data.colors[i];
  }
};

const getArticledetails = async () => {
  await getArticle();
  setData();
};
getArticledetails();

//Button for basket
addToCart.addEventListener("click", () => {
  arrayLocalStorage.push({
    _id: data._id,
    quantity: parseInt(quantity.value),
    colors: colors.options[colors.selectedIndex].value,
  });

  window.localStorage.array2 = JSON.stringify(arrayLocalStorage);
});
