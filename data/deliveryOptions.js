import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
         deliveryOption = option;
    }  
  });
 return deliveryOption || deliveryOption[0];

}

export function validDeliveryOption(deliveryOptionId) {
  let found = false;
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
     found = true;
 }; 
  });
  return found;
}

export function isWeekend(date) {
  const dayOfweek = date.format('dddd');
  return dayOfweek === 'Sunday' || dayOfweek === 'Saturday'

}


export function calculateDeliveryDate(deliveryOption) {
 let i = deliveryOption.deliveryDays;
 let deliveryDate = dayjs()

 while (i > 0) {
  deliveryDate = deliveryDate.add(1, 'days');
    if(!isWeekend(deliveryDate)){
      i--;
    }
 }
 
 const dateStrings = deliveryDate.format('dddd, MMMM D');
 
   return dateStrings;
}