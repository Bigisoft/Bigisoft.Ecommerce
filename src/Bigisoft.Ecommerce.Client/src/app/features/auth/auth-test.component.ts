import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./AuthService";

@Component({
  selector: 'app-authorized-data',
  template: `
    <p *ngFor="let tst of objectValues(test)">{{tst}}</p>
  `,
  standalone: true,
  styles: ``,
  imports: [
    NgFor,
  ]
})
export class AuthorizedDataComponent implements OnInit {
  test = "";

  constructor(private http: HttpClient, private amplifyAuthService: AuthService) { }

  ngOnInit(): void {
    this.http.get<any>('/api/auth/validate', { withCredentials: true }).subscribe({
      next: (result) => {
        this.test = result;
        console.log(result);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  objectValues(obj: string): any[] {
    return Object.values(obj);
  }
}
