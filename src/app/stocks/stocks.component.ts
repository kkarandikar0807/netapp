import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {InverstorStock, Stock} from '../api.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stocks: Stock[];
  myStocks: InverstorStock = null;
  stockHistoryName = null;

  googleValue = 0;
  appleValue = 0;
  netAppValue = 0;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getStockList().subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
      const loggedInUser: string = localStorage.getItem('userLoggedIn');
      if (loggedInUser) {
        this.apiService.getInvestorStockData(loggedInUser).subscribe((data: InverstorStock) => {
          this.myStocks = data;
          this.countStocks();
        });
      } else {
        this.router.navigateByUrl('');
      }
    });
  }

  buyStocks(stock: Stock) {
    const isPresent = this.myStocks.stocks.filter(s => s.symbol === stock.symbol);
    if (isPresent.length > 0) {
      for (let i = 0; i < this.myStocks.stocks.length; i++) {
        if (this.myStocks.stocks[i].symbol === stock.symbol) {
          this.myStocks.stocks[i].quantity += 1;
          this.myStocks.totalStocks += 1;
          this.totalValuation();
        }
      }
    } else {
      this.myStocks.stocks.push({quantity: 1, symbol: stock.symbol});
      this.myStocks.totalStocks += 1;
      this.totalValuation();
    }
}

showHistory(name: string) {
  this.stockHistoryName = name;
}

  countStocks() {
    this.myStocks.totalStocks = 0;
    this.myStocks.stocks.forEach(s => {
      this.myStocks.totalStocks += s.quantity;
    });
    this.totalValuation();
  }

  totalValuation() {
    this.myStocks.totalValue = 0;
    this.stocks.forEach(s => {
      if (s.symbol === 'GOOG') {
        this.googleValue = s.price;
      }

      if (s.symbol === 'NTAP') {
        this.netAppValue = s.price;
      }

      if (s.symbol === 'AAPL') {
        this.appleValue = s.price;
      }
    });
    let totalGoogleValue = 0;
    let totalAppleValue = 0;
    let totalNetAppValue = 0;
    this.myStocks.stocks.forEach(s => {
      if (s.symbol === 'GOOG') {
        totalGoogleValue = this.googleValue * s.quantity;
      }

      if (s.symbol === 'NTAP') {
        totalNetAppValue = this.netAppValue * s.quantity;
      }

      if (s.symbol === 'AAPL') {
        totalAppleValue = this.appleValue * s.quantity;
      }
    });

    this.myStocks.totalValue = totalAppleValue + totalGoogleValue + totalNetAppValue;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

}
