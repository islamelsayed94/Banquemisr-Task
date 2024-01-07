import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://data.fixer.io/api';
  private accessKey = '8e63ce13dea7d40e2e276a297009f199';

  constructor(private http: HttpClient) { }

  getCurrencyRates(): Observable<any> {
    const url = `${this.apiUrl}/latest?access_key=${this.accessKey}`;
    return this.http.get(url);
  }

  getFullNameCurrencyRates(): Observable<any> {
    const url = `${this.apiUrl}/symbols?access_key=${this.accessKey}`;
    return this.http.get(url);
  }

  getHistoricalCurrencyData(date: string,symbols: string[]): Observable<any> {
    const symbolsQueryParam = symbols.join(',');
    const url = `${this.apiUrl}/${date}?access_key=${this.accessKey}&symbols=${symbolsQueryParam}`;
    console.log(url)
    return this.http.get(url);
  }
}
