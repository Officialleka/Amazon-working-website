
import { getOrder, orders } from "../data/orders.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
const orderUrl = new URL(window.location.href);
console.log(orderUrl.searchParams.get('orderId'));

const productUrl = new URL(window.location.href);
console.log(productUrl.searchParams.get('productId'));

async function renderTrackingPage() {

await loadProductsFetch()
  const orderId = orderUrl.searchParams.get('orderId')
    const productId = productUrl.searchParams.get('productId')
   const product = getProduct(productId);
  const order = getOrder(orderId)
   console.log(orderId)
   let matchingDetails;
   order.products.forEach((details) => {
    if (details.productId === product.id) {
      matchingDetails = details
      console.log(matchingDetails.estimatedDeliveryTime)
    }
   })
   console.log(dayjs().format('h,m'))
   console.log((dayjs(matchingDetails.estimatedDeliveryTime)).format('MMMM, D h, m'))
   const orderTime = order.orderTime
   console.log(orderTime)
   console.log(dayjs((orderTime)).format('MMMM,h, m'))
 const delivered = new Date((dayjs(matchingDetails.estimatedDeliveryTime)))
 
 const placed = new Date(orderTime)
 
 const today = new Date(dayjs().add(3, 'days'))
  console.log(placed)
  console.log(delivered) 
  console.log(today)
 
  console.log((((today - placed)/3600000)))
  console.log((delivered - placed)/3600000)
 
 const diference = (today - placed) / (delivered - placed)
 const progress = (Math.round(diference * 100))
 console.log(progress + '%')

 const trackingHtml = `
 <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
        <div class="delivery-date"> Arriving on ${(dayjs(matchingDetails.estimatedDeliveryTime)).format('MMMM, D')}.
        </div>

        <div class="product-info">
         ${product.name}
        </div>

        <div class="product-info">
          Quantity:  ${matchingDetails.quantity}
        </div>s

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label${progress < 50 ? 'current status' : ''}">
            Preparing
          </div>
          <div class="progress-label${progress >= 50 && progress < 100 ? 'current status' : ''} current-status">
            Shipped
          </div>
          <div class="progress-label${progress >= 100 ? 'current status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div style = "width: ${progress}%" class="progress-bar">
          <div style = "margin-left: 400px">${progress}%</div>
          </div>
        </div>
      </div>
  `
 
  document.querySelector('.js-order-tracking').innerHTML = trackingHtml;

  document.querySelector('.js-cart-quantity').innerHTML = matchingDetails.quantity

}

renderTrackingPage();