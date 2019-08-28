import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';
import { StocksComponent } from './stocks.component';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ StocksComponent ],
      providers: [ ApiService ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    spyOn(apiService, 'getStockList').and.returnValue(Observable.of([
      {
        symbol: 'NTAP',
        company: 'NetApp Inc',
        price: 42.80
      }
    ]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the right number of stocks listed', () => {
    component.stocks = [
      {
        symbol: 'NTAP',
        company: 'NetApp Inc',
        price: 42.80
      },
      {
        symbol: 'GOOG',
        company: 'Alphabet Inc',
        price: 829.08
      },
      {
        symbol: 'AAPL',
        company: 'Apple Inc',
        price: 139.78
      }
    ];
    expect(component.countStocks()).toBe(3);

    component.stocks = component.stocks.slice(1);
    expect(component.countStocks()).toBe(2);

    component.stocks = [];
    expect(component.countStocks()).toBe(0);
  });
});
