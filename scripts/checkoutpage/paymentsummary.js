import {  cart, calculateCartQuantity, resetCart } from "../../data/cart.js";
import {  getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder} from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { moneyDenom } from "../utils/money.js";


export function renderPaymentSummary() {
  let productPriceCent = 0;
  let shippingPrice = 0;
   cart.forEach((cartItem) => {
    const productId = cartItem.productId
    const product = getProduct(productId)
   productPriceCent += product.priceCents * cartItem.quantity;

   const deliveryOptionId = cartItem.deliveryOptionId;

  const deliveryOption = getDeliveryOption(deliveryOptionId);

 shippingPrice += deliveryOption.priceCents;

   });

   const totalBeforeTax = productPriceCent + shippingPrice;

   const estimatedTax = totalBeforeTax * 0.1;

   const totalCents = totalBeforeTax + estimatedTax;

   const itemTotal = calculateCartQuantity();
   
   const paymentsummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${itemTotal}):</div>
            <div class="payment-summary-money">
            $${moneyDenom(productPriceCent)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping-price">
            $${moneyDenom(shippingPrice)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${moneyDenom(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${moneyDenom(estimatedTax)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-totalpricecents">
            $${moneyDenom(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary js-place-button">
            Place your order
          </button>
   `;

   document.querySelector('.js-payment-summary').innerHTML = paymentsummaryHTML;

   document.querySelector('.js-place-button').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          cart: cart
        })
      })
  
     const order = await response.json()
     addOrder(order);
     console.log(order)
    } catch (error) {
      console.log('Unexpected error. TRY again later.')
    }

    resetCart();
    window.location.href = 'orders.html'
   })

}