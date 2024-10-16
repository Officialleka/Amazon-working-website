import { renderCheckoutHeader } from "./checkoutpage/checkoutHeader.js";
import { renderOrderSummary } from "./checkoutpage/ordersummary.js";
import { renderPaymentSummary } from "./checkoutpage/paymentsummary.js";

import { loadProducts, loadProductsFetch } from "../data/products.js";

import { loadCartFetch } from "../data/cart.js";

/*import '../data/car-oop-class.js';
import '../data/backend-practice.js';
*/

async function loadPage() {
  try {
await Promise.all([
  loadProductsFetch(),
  loadCartFetch(),
])
  } catch (error) {
  console.log('error.Please try again later', error)
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();


/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }) 
]).then((param) => {
  console.log(param )
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*new Promise((resolve) => {
  loadProducts(() => {
    resolve('alue1');
  });
})

.then((param) => {
  return new Promise((resolve) => {
    loadCart();
    resolve();
    console.log(param)
  })
})

.then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
loadProducts(() => {
  console.log('done it')
  loadCart(() => {
    console.log('moving on')
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  })
  
})
*/

/*
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/