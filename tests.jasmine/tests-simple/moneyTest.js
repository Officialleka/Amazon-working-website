import { moneyDenom } from "../../scripts/utils/money.js";


console.log('test suite: moneyDenom')

console.log('works with price in cents')
if(moneyDenom(3095) === '30.95') {
   console.log('passed')
}
else{
  console.log('failed')
};

console.log('works wth 0')
if(moneyDenom(0) === '0.00') {
  console.log('passed')
}
else{
 console.log('failed')
};

console.log('works wth higher decimal')
if(moneyDenom(2000.5) === '20.01') {
  console.log('passed')
}
else{
 console.log('failed')
};

console.log('works with lower decimal')
if(moneyDenom(2000.4) === '20.00') {
  console.log('passed')
}
else{
 console.log('failed')
};

console.log('negative number')

if(moneyDenom(-2000) === '-20.00') {
  console.log('passed')
}
else {
  console.log('failed')
}