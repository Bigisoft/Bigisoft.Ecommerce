import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor, HomeComponent, BreadcrumbsComponent]
})
export class MainContentComponent{

  routeString: string | undefined

  constructor(private router: Router) {}

  get isIndexPage(): boolean {
    return this.router.url === '/home';
  }
}
