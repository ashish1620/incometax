import TaxCalculator from './js/tax.js';

var calculator = new TaxCalculator();
var tax = calculator.calculateGross(400001);

console.log(tax)