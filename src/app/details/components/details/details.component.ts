import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'src/app/core/services/currency.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent  implements OnInit{
  fromCurrency: string = '';
  toCurrency: string = '';
  amount:number =0;
  fromCurrencyFullName: string = '';
  toCurrencyFullName: string = '';
  historicalData: any = null;
  conversionList: any[] = [];
  predefinedCurrencies: string[] = ['EGP', 'EUR', 'CAD', 'GBP'];
  fromToList: any[] = [];
  toFromList: any[] = [];


  constructor(private currencyService: CurrencyService,private route: ActivatedRoute){ }

   ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fromCurrency = params['from'];
      this.toCurrency = params['to'];
      this.amount = params['amount'];

       // Use the service method to fetch data
       this.currencyService.getCurrencyRates().subscribe((response) => {
         this.updateConversionLists(response);
       });

      this.currencyService.getFullNameCurrencyRates().subscribe((data) => {
        const symbols = data.symbols;
        this.fromCurrencyFullName = symbols[this.fromCurrency] || 'Unknown';
        this.toCurrencyFullName = symbols[this.toCurrency] || 'Unknown';
      });
      // Call the new method to fetch historical data
       this.fetchHistoricalData();
    });
  }

  fetchHistoricalData(): void {
    const currentDate = new Date();
    const lastYearDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    const formattedLastYearDate = lastYearDate.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'

    const symbols = [this.fromCurrency, this.toCurrency];
     this.getHistoricalData(formattedLastYearDate, symbols);

  }

  getHistoricalData(date: string,symbols: string[]): void {
    this.currencyService.getHistoricalCurrencyData(date,symbols)
      .subscribe((response) => {
        this.historicalData = response;
      });
  }


  // updateConversionLists(data: any): void {
  //   const rates = data.rates;
  //   const fromCurrencyRate = rates[this.fromCurrency] || 1;
  //   const toCurrencyRate = rates[this.toCurrency] || 1;

  //   // Conversion list for 'FROM' to other predefined currencies
  //   this.fromToList = this.predefinedCurrencies.map((currency) => ({
  //     currency,
  //     value: (rates[currency] / fromCurrencyRate) * this.amount || 0
  //   }));

  //   // Conversion list for other predefined currencies to 'FROM'
  //   this.toFromList = this.predefinedCurrencies.map((currency) => ({
  //     currency,
  //     value: (rates[currency] / toCurrencyRate) * this.amount || 0
  //   }));
  // }
  // updateConversionLists(data: any): void {
  //   const rates = data.rates;
  //   const fromCurrencyRate = rates[this.fromCurrency] || 1;

  //   // Conversion list for 'FROM' to other predefined currencies
  //   this.fromToList = this.predefinedCurrencies.map((currency) => ({
  //     currency,
  //     value: (rates[currency] * this.amount) / fromCurrencyRate || 0
  //   }));

  //   // Conversion list for other predefined currencies to 'FROM'
  //   this.toFromList = this.predefinedCurrencies.map((currency) => ({
  //     currency,
  //     value: (rates[currency] / rates[this.fromCurrency]) * this.amount || 0
  //   }));
  // }
  updateConversionLists(data: any): void {
    const rates = data.rates;
    const fromCurrencyRate = rates[this.fromCurrency] || 1;

    // Conversion list for 'FROM' to other predefined currencies
    this.fromToList = this.predefinedCurrencies.map((currency) => ({
      currency,
      value: (rates[currency] * this.amount) / fromCurrencyRate || 0
    }));

    // Conversion list for other predefined currencies to 'FROM'
    this.toFromList = this.predefinedCurrencies.map((currency) => ({
      currency,
      value: (1 / rates[currency]) * this.amount * fromCurrencyRate || 0
    }));
  }

}









