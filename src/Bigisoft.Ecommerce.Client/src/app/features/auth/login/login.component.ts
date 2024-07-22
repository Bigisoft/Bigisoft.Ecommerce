import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import {AuthService} from "../AuthService";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AmplifyAuthenticatorModule, MatCardModule, MatButtonModule, MatTabsModule,MatFormFieldModule,
    MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private amplifyAuthService: AuthService, public authenticator: AuthenticatorService) { }

  ngOnInit(){
    //console.info(this.amplifyAuthService.getCurrentSession());
  }
}
