import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface Breadcrumbs {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule, NgIf, NgFor],
  standalone: true,
  //templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
  template: `
    <ng-container *ngFor="let breadcrumb of breadcrumbs; let last = last">
      <ng-container *ngIf="breadcrumb.url !== '/dashboard'">
        <a routerLink="/dashboard">Dashboard</a> /
      </ng-container>

      <a [routerLink]="[breadcrumb.url]">{{ breadcrumb.label }}</a>

      <span *ngIf="!last"> / </span>
    </ng-container>
  `,
})
export class BreadcrumbsComponent {
  breadcrumbs: Breadcrumbs[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary')
    ).subscribe(route => {
      let breadcrumb: Breadcrumbs = {
        label: route.snapshot.data['breadcrumb'],
        url: this.router.url
      };
      this.breadcrumbs = []; // Clear the breadcrumbs array
      this.breadcrumbs.push(breadcrumb);
    });
  }
}
