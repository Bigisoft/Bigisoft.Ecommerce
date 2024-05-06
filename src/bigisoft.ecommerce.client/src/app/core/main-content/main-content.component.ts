import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { DashboardComponent } from '../../features/dashboard/dashboard.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor, DashboardComponent, BreadcrumbsComponent]
})
export class MainContentComponent{

  routeString: string | undefined

  constructor(private router: Router) {}

  get isIndexPage(): boolean {
    return this.router.url === '/dashboard';
  }
}
