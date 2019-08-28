import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Authentication } from '../api.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string;

    constructor(private apiService: ApiService, private router: Router) {
    }

    login() {
        this.apiService.login(this.username).subscribe((data: Authentication) => {
            if (data.isAuthenticated) {
              localStorage.setItem('userLoggedIn', this.username);
                this.router.navigateByUrl('/stocks');
            }
        });
    }
}
