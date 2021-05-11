class Tax {
    constructor(startPrice, endPrice, taxRate) {
        this.startPrice = startPrice;
        this.endPrice = endPrice;
        this.taxRate = taxRate;
    }
}

class TaxCalculator {
    constructor() {
        this.initRates()
        this.minPrice = 400000;
    }

    initRates() {
        this.rates = [
            new Tax(0, 150000, 0),
            new Tax(150000, 300000, 0.025),
            new Tax(300000, 800000, 0.1),
            new Tax(800000, 10000000, 0.25),
            new Tax(10000000, Number.MAX_VALUE, 0.30)
        ]
    }

    getTax(tax, price) {
        var finalTax = 0;
        var amountToTax = 0;

        if (tax.endPrice > price) {  // price less than the range
            amountToTax = price - tax.startPrice;
        }

        else if (tax.endPrice <= price) {  // price greater than the range
            amountToTax = tax.endPrice - tax.startPrice;
        }

        finalTax = amountToTax * tax.taxRate;
        return finalTax;
    }

    calculateTax(price) {
        if (price <= this.minPrice) // less than min tax amount
            return 0;

        var finalTaxAmount = 0;
        this.rates.forEach(tax => {
            if (tax.startPrice <= price)
                finalTaxAmount += this.getTax(tax, price)
        });

        return finalTaxAmount;
    }

    getNet(price, taxRate) {
        return price - (price * taxRate);
    }

    getGross(tax, price) {
        var gross = price - this.getNet(tax.endPrice - tax.startPrice, tax.taxRate);
        return [tax.endPrice - tax.startPrice, gross];
    }

    calculateGross(price) {
        if (price <= this.minPrice)
            return price;

        var out = 0;
        this.rates.forEach(tax => {
            if (price < 0)
                return

            if ((tax.endPrice - tax.startPrice) >= price) {
                out += price / (1 - tax.taxRate);
                price -= this.getNet(tax.endPrice - tax.startPrice, tax.taxRate);
                return;
            }

            else {
                var res = this.getGross(tax, price);
                price = res[1];
                out += res[0];
            }

        });

        return out;
    }
}
