import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import {AuthService} from "../AuthService";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AmplifyAuthenticatorModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private amplifyAuthService: AuthService, public authenticator: AuthenticatorService) { }

  ngOnInit(){
    //console.info(this.amplifyAuthService.getCurrentSession());
  }
}
