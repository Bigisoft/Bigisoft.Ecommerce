import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './core/header/header.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './features/auth/auth.interceptor';
import { Amplify } from 'aws-amplify';
import { environment } from '../../environments/environments';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HeaderComponent, SidenavComponent]
})

export class AppComponent {}
