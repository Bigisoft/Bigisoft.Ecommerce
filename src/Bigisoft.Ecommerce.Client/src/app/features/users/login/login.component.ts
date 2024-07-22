import { Component } from '@angular/core';
import {LoginService} from "../login.service";
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../auth.service";
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginValid = true;

  username: string | undefined;
  password: string | undefined;

  constructor(private authService: LoginService, private http: HttpClient) { }

  login() {
    if (this.username != null) {
      if (this.password != null) {
        this.authService.login(this.username, this.password)
          .then(result => {
            // Optionally, handle the response
            // Send the tokens to the backend for HttpOnly cookie setting
            this.http.post('/api/auth/login', {
              Username: this.username,
              Password: this.password
            }).subscribe(response => {
              console.log('Logged in successfully', result);
            });
          })
          .catch(error => {
            console.error('Login failed', error);
          });
      }
    }
  }





}
