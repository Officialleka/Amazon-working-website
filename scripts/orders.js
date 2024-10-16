import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from "../data/products.js";
import { moneyDenom } from "./utils/money.js";

import { addToCart, calculateCartQuantity, cart } from "../data/cart.js";



renderOrderPage()

export async function renderOrderPage() {

  await loadProductsFetch()
  let orderHTML = '';
    orders.forEach((order) => {

      const today = dayjs(order.orderTime);
      console.log((order.orderTime))
    
    
      
      orderHTML += `
        <div class="order-container">
              
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${dayjs(order.orderTime).format('MMMM, D')}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${moneyDenom(order.totalCostCents)}</div>
                  </div>
                </div>
    
                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>

              
    
              <div class="order-details-grid">
              ${productList(order)}
              </div>
            </div>
      `
    })
  

      function productList(order) {
   let productListHTML = '';
      
    order.products.forEach((productDetails) => {
      const productId = productDetails.productId
     const matchingOrders = getProduct(productId);

      productListHTML += `
         <div class="product-image-container">
                  <img src="${matchingOrders.image}">
                </div>
    
                <div class="product-details">
                  <div class="product-name">
                  ${matchingOrders.name}
                  </div>
                  <div class="product-delivery-date">
                  Delivery date: ${(dayjs(productDetails.estimatedDeliveryTime)).format('MMMM, D')}.
                  </div>
                  <div class="product-quantity js-product-quantity">
                    Quantity:  ${productDetails.quantity}
                  </div>
                  <button class="buy-again-button button-primary js-buy-again-button" data-product-id = "${matchingOrders.id}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
                </div>
    
                <div class="product-actions">
                  <a href="tracking.html?orderId=${order.id}&productId=${matchingOrders.id}">
                    <button class="track-package-button button-secondary">
                      Track package
                    </button>
                  </a>
                </div>
      `
   
    })

    return productListHTML;
}
 
document.querySelector('.js-orders-grid').innerHTML = orderHTML;

document.querySelectorAll('.js-buy-again-button').forEach((buyAgainButton) => {
  buyAgainButton.addEventListener('click', () => {
    const productId = buyAgainButton.dataset.productId
    addToCart(productId)
    window.location.href = 'checkout.html'
   
    console.log('working')  
 })
 })

}
document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity()
renderOrderPage();
 
  
  


