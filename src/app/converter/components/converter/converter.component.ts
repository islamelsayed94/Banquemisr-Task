import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/core/services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  amount: number = 0;
  isValidAmount: boolean = false;
  currencies: string[] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  convertedValue: number = 0;
  constantAmounts: number[] = [10, 50, 100, 200,1000];
  quickConversions: { amount: number, result: number }[] = [];
  reverseQuickConversions: { amount: number, result: number }[] = [];




  constructor(private currencyService: CurrencyService, private router: Router) {}

  ngOnInit(): void {
    this.currencyService.getCurrencyRates().subscribe((data) => {
      if (data && data.rates) {
        this.currencies = Object.keys(data.rates);
      } else {
        console.error('Invalid response format:', data);
      }
    });
  }

  convert() {
    if (!this.amount || !this.fromCurrency || !this.toCurrency) {
      console.error('Incomplete data for conversion.');
      return;
    }

    this.currencyService.getCurrencyRates().subscribe((data) => {
      const rates = data.rates;

      if (!rates[this.fromCurrency] || !rates[this.toCurrency]) {
        console.error('Selected currencies not available for conversion.');
        return;
      }

      const fromRate = rates[this.fromCurrency];
      const toRate = rates[this.toCurrency];

      this.convertedValue = (this.amount / fromRate) * toRate;

      // Calculate quick conversions
      this.quickConvert(fromRate,toRate)

    // Calculate reverse quick conversions
    this.reverseQuickConvert(fromRate,toRate)



    });
  }

  swapValues() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
  }

  redirectToDetailsPage() {
    if (this.fromCurrency && this.toCurrency) {
      // Navigate to the details page with parameters
      this.router.navigate(['/details'], {
        queryParams: {
          from: this.fromCurrency,
          to: this.toCurrency,
          amount:this.amount
        }
      });
    } else {
      console.error('Please select FROM and TO currencies before navigating to details.');
    }
  }

  checkAmountValidity() {
    this.isValidAmount = this.amount > 0;
  }

  quickConvert(fromRate:any,toRate:any){
    this.quickConversions = this.constantAmounts.map(amount => {
      const result = (amount / fromRate) * toRate;
      return { amount, result };
    });
  }

  reverseQuickConvert(fromRate:any,toRate:any){
    this.reverseQuickConversions = this.constantAmounts.map(amount => {
      const result = (amount / toRate) * fromRate;
      return { amount, result };
    });

  }
}
