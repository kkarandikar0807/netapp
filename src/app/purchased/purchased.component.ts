import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { InverstorStock, Stock } from '../api.model';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedComponent implements OnInit {
  @Input()
  investorPortfolio: InverstorStock;

  totalStocks = 0;

  constructor() { }

  ngOnInit() {}

  countTotalStocks() {
    console.log('entered');
    this.investorPortfolio.stocks.forEach((stock) => {
      this.totalStocks += stock.quantity;
    });
  }
}
