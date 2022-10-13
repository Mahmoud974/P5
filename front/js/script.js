"use script";
let data = [];
let arrayTry = [];
const getData = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((res) => (data = res));
};
// window.localStorage.getItem("array2");

const paramsArticles = (element, element1, element2, element3, element4) => {
  const createLink = document.createElement("a"),
    createArticle = document.createElement("article"),
    createImg = document.createElement("img"),
    createTitle = document.createElement("h3"),
    createParagraph = document.createElement("p");
  //Add article
  items.appendChild(createLink);
  createLink.appendChild(createArticle);
  createArticle.appendChild(createImg);
  createArticle.appendChild(createTitle);
  createArticle.appendChild(createParagraph);
  //Add Attribute and class
  createLink.setAttribute("href", element);
  createImg.setAttribute("src", element1),
    createImg.setAttribute("alt", element2);
  createTitle.classList.add("productName"),
    (createTitle.textContent = element3);
  createParagraph.classList.add("productDescription"),
    (createParagraph.textContent = element4);
  createParagraph.style.marginTop = "-12px";
  createParagraph.style.paddingBottom = "2px";
};

const getDisplay = async () => {
  await getData();
  data
    .map((product) => {
      var str = `http://127.0.0.1:5500/front/html/product.html?id=${product._id}`;

      var url = new URL(str);
      url.searchParams.get("name");

      paramsArticles(
        str,
        product.imageUrl,
        product.altTxt,
        product.name,
        product.description
      );
    })
    .join(" ");
};

window.addEventListener("load", getDisplay);
arrayTry = window.localStorage.getItem("array2");
