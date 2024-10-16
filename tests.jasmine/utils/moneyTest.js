import { moneyDenom } from "../../scripts/utils/money.js";

describe('test suite: moneyDenom', () => {
   it('works with price in cents', () => {
     expect(moneyDenom(3095)).toEqual('30.95')
   })

   it('works with 0', () => {
    expect(moneyDenom(0)).toEqual('0.00')
   })
 describe('higher and lower decimals', () => {
  it('works with higher decimal', () => {
    expect(moneyDenom(2000.5)).toEqual("20.01")
   })
   it('works with lower decimal', () => {
    expect(moneyDenom(2000.4)).toEqual("20.00")
   })

 })
   it('negative number', () => {
    expect(moneyDenom(-2000)).toEqual('-20.00')
   })

})