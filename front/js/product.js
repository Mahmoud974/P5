"use strict";
let data = [];
let arrayLocalStorage = JSON.parse(window.localStorage.array2 || "[]");
//Select the balises option and item__img
const option = document.querySelector("option"),
  item_img = document.querySelector(".item__img");

//Get an object URL
let str = window.location.href,
  url = new URL(str),
  search_params = new URLSearchParams(url.search),
  productId = search_params.get("id");

//Get Id of articles with API
const getdata = async () => {
  await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((data) => data.json())
    .then((res) => (data = res));
};
//Make of
const setData = () => {
  document.title = `${data.name} | ${data.description}`;
  title.textContent = data.name;
  item_img.innerHTML = ` <img src=${data.imageUrl} alt=${data.altTxt}>`;
  price.textContent = data.price.toLocaleString();
  description.textContent = data.description;

  //Get an array of string any colors
  for (let colors of data.colors) {
    let createColors = document.createElement("option");
    document.querySelector("#colors").appendChild(createColors);
    createColors.value = colors;
    createColors.innerHTML = colors;
  }
};

const getdatadetails = async () => {
  await getdata();
  setData();
};
getdatadetails();
//Add the products with the button and redirect at the page cart.html
addToCart.addEventListener("click", () => {
  if (quantity.value > 0 && quantity.value <= 100 && quantity.value != 0) {
    let optionsProduit = {
      _id: productId,
      colors: colors.value,
      quantity: Number(quantity.value),
      // nomProduit: data.name,
      // prixProduit: data.price,
      // descriptionProduit: data.description,
      // imgProduit: data.imageUrl,
      // altImgProduit: data.altTxt,
    };

    console.log(optionsProduit);
    let canapStorage = JSON.parse(localStorage.getItem("produit"));

    if (canapStorage) {
      const findProduct = canapStorage.find(
        (el) => el._id === productId && el.colors === colors.value
      );

      if (findProduct) {
        let newQuantite =
          parseInt(optionsProduit.quantity) + parseInt(findProduct.quantity);
        findProduct.quantity = newQuantite;
        localStorage.setItem("produit", JSON.stringify(canapStorage));
        console.table(canapStorage);
      } else {
        canapStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(canapStorage));
        console.table(canapStorage);
      }
      //Empty the basket
    } else {
      canapStorage = [];
      canapStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(canapStorage));
      console.table(canapStorage);
    }

    window.location.href = "cart.html";
  }
});
