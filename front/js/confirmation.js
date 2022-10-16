"use strict";
let idOrder = new URL(window.location.href).searchParams.get("orderId");
const confirmChecked = () => {
  orderId.innerText = localStorage.getItem("orderId");

  localStorage.clear();
};

confirmChecked();
