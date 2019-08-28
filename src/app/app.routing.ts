import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './stocks/stocks.component';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'stocks',
        component: StocksComponent
    }
];

const routing: ModuleWithProviders = RouterModule.forRoot(routes);

export default routing;
