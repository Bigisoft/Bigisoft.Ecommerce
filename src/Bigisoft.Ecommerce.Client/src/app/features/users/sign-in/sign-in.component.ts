import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  public loginValid = true;

  username: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(){}

  signIn(): void {
    if (this.username != null && this.password != null) {
      this.authService.signIn(this.username, this.password)
        .then((result) => {
          console.log('Successfully signed in!', result);
          // Redirect or perform any other action upon successful sign-in
        })
        .catch((error) => {
          console.error('Error signing in:', error);
        });
    }
  }

}
