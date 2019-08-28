import { Component, Input, OnChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { StockSnapshot } from '../api.model';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnChanges {
  @Input()
  stockName: string;

  history: StockSnapshot[];
  chart: Chart = null;

  constructor(private apiService: ApiService) { }

  ngOnChanges(changes) {
    this.apiService.getStockHistory(this.stockName).subscribe((history: StockSnapshot[]) => {
      this.history = history;
      const historyDates = [];
      const historyPrice = [];
      if (this.history) {
        this.history.forEach(h => {
          historyDates.push(h.date);
          historyPrice.push(h.price);
        });
        const canvas = <HTMLCanvasElement>document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: historyDates,
            datasets: [
              {
                data: historyPrice,
                borderColor: 'blue',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      }
    });
  }

}
