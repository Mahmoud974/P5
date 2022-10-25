"use script";
let data = [];

//Get the data via API
const getData = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((res) => (data = res));
};
/**
 *Describe the products
 * @param {String} link
 * @param {String} src
 * @param {String} altImg
 * @param {String} title
 * @param {String} paragraph
 */
const paramsArticles = (link, src, altImg, title, paragraph) => {
  //Create the balises with createElement
  const createLink = document.createElement("a"),
    createArticle = document.createElement("article"),
    createImg = document.createElement("img"),
    createTitle = document.createElement("h3"),
    createParagraph = document.createElement("p");
  //Add in article
  items.appendChild(createLink);
  createLink.appendChild(createArticle);
  createArticle.appendChild(createImg);
  createArticle.appendChild(createTitle);
  createArticle.appendChild(createParagraph);
  //Add the Attributes and class
  createLink.setAttribute("href", link);
  createImg.setAttribute("src", src), createImg.setAttribute("altImg", altImg);
  createTitle.classList.add("productName"), (createTitle.textContent = title);
  createParagraph.classList.add("productDescription"),
    (createParagraph.textContent = paragraph);
  createParagraph.style.marginTop = "-12px";
  createParagraph.style.paddingBottom = "2px";
};

/**
 * Display the products on the house
 */
const getDisplay = async () => {
  await getData();
  data
    .map((product) => {
      let urlProduct = `http://127.0.0.1:5501/front/html/product.html?id=${product._id}`;
      //Initialize with the data
      paramsArticles(
        urlProduct,
        product.imageUrl,
        product.altTxt,
        product.name,
        product.description
      );
    })
    .join(" ");
};
//Load the page for the display the products
window.addEventListener("load", getDisplay);
