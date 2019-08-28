import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { Stock, StockSnapshot, Authentication, InverstorStock } from './api.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}


@Injectable()
export class ApiService {


  constructor(private http: HttpClient) { }

  getStockList(): Observable<Stock[]> {
    return this.http.get<Stock[]>('/api/stocks')
      .catch(this.errorHandler);
  }

  getStockHistory(stockName: string): Observable<StockSnapshot[]> {
    return this.http.get<StockSnapshot[]>(`/api/history/${stockName}`)
      .catch(this.errorHandler);
  }

  getInvestorStockData(name: string): Observable<InverstorStock> {
    return this.http.get<InverstorStock>(`/api/investors/${name}`).catch(this.errorHandler);
  }

  login(username: string): Observable<Authentication> {
      return this.http.post<Authentication>(`/api/login`, {username: username}, httpOptions).catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }


}
