import { renderOrderSummary } from "../../scripts/checkoutpage/ordersummary.js";

import { loadFromStorage,cart } from "../../data/cart.js";

import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
    beforeAll( async () => {
      await loadProductsFetch().then(() => { 
      })
    })

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML =`
    <div class="js-order-summary"></div>
    <div class="js-checkout-header"></div>
    <div class="js-payment-summary"></div>
    `
    spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
    ]);
   
  });
  loadFromStorage();

  renderOrderSummary();
  })

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  })


  it('display the cart', () => {
     
     expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

     expect(document.querySelector(`.js-quantity-value-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).innerText).toContain('Quantity: 2')

     expect(document.querySelector(`.js-quantity-value-${'15b6fc6f-327a-4ec4-896f-486349e85a3d'}`).innerText).toContain('Quantity: 1')

     expect(document.querySelector(`.js-product-name-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).innerText).toContain('Gray');

     expect(document.querySelector(`.js-product-price-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).innerText).toEqual('$10.90');


  })    

  it('removes a product', () => { 

 document.querySelector(`.js-delete-link-test-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).click();

expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

expect(document.querySelector(`.js-cart-item-container-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`)).toEqual(null);

expect(document.querySelector(`.js-cart-item-container-${'15b6fc6f-327a-4ec4-896f-486349e85a3d'}`)).not.toEqual(null)

expect(cart.length).toEqual(1);

expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');

  })

  it('update delivery option', () => {
    document.querySelector(`.js-delivery-option-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}-3`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}-3`).checked
    ).toEqual(true);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].deliveryOptionId).toEqual('3');  

    expect(document.querySelector('.js-shipping-price').innerHTML).toContain('$14.98');

    expect(document.querySelector('.js-totalpricecents').innerHTML).toContain('$63.50')
  
    
  })
 
})





