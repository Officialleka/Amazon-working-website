import { addToCart,cart,loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: add to cart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  })
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
     
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
 expect(cart.length).toEqual(1)
 expect(localStorage.setItem).toHaveBeenCalledTimes(1);
 expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
 expect(cart[0].quantity).toEqual(2)
 expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
 }]))
  })

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
     
    });
    loadFromStorage();

addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
 expect(cart.length).toEqual(1)
 expect(localStorage.setItem).toHaveBeenCalledTimes(1);
 expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
 expect(cart[0].quantity).toEqual(1)

 expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
 }]))
  })
  
})

describe('remove from cart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    })
    loadFromStorage(); 
  })

  it('remove a productId that is in the cart', () => {
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  })

  it('remove a productId that is not in the cart', () => {
    removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d')
      expect(cart.length).toEqual(1)
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]));
  })

})

describe("test suite: update delivery function", () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }
      ]);
     
    });
    loadFromStorage();
   
  })

  it('update delivery option', () => { 
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3')
     expect(cart[0].deliveryOptionId).toEqual('3')
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '3'}]));
  })

  it('update delivery option for product not in the cart', () => {
     updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', '1');
     expect(cart.length).toEqual(1);
     expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })

  it('update delivery option for delivery option ID that does not exist', () => {
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '4');
    expect(cart[0].deliveryOptionId).toEqual('1');
 })
  });
 