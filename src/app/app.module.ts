import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { StocksComponent } from './stocks/stocks.component';
import { HistoryComponent } from './history/history.component';
import { PurchasedComponent } from './purchased/purchased.component';
import { LoginComponent } from './login/login.component';
import routing from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    HistoryComponent,
    PurchasedComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
