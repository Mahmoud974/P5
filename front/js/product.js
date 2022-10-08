"use strict";
let data = [];
let array = [];
const option = document.querySelector("option");
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
  //   console.log(data);
};
const getArticledetails = async () => {
  await getArticle();
  title.textContent = data.name;
  price.textContent = data.price;
  description.textContent = data.description;

  for (let i = 0; i < data.colors.length; i++) {
    const select = document.querySelector("select");
    const option = document.createElement("option");
    select.appendChild(option);
    option.innerHTML = data.colors[i];
    option.value = data.colors[i];
  }
};
getArticledetails();

//Button for basket
addToCart.addEventListener("click", () => {
  array = [data._id, quantity.value];
  console.log(array);
  window.localStorage.ok = JSON.stringify();
});
