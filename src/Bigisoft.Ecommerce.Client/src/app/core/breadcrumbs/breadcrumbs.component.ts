import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface Breadcrumbs {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule, NgIf, NgFor, MatGridListModule],
  standalone: true,
  styleUrl: './breadcrumbs.component.css',
  template: `
    <div class="breadcrumb ubuntu-regular">
      <ng-container *ngFor="let breadcrumb of breadcrumbs; let last = last">
      <span *ngIf="!last">
        <a [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a> /
      </span>
        <span *ngIf="last">{{ breadcrumb.label }}</span>
      </ng-container>
    </div>

    <!--div class="breadcrumb ubuntu-regular">
      <ng-container *ngFor="let breadcrumb of breadcrumbs; let last = last">
        <a [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
        <span *ngIf="!last"> / </span>
      </ng-container>
    </div-->
  `,
})
export class BreadcrumbsComponent {
  breadcrumbs: Breadcrumbs[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.buildBreadCrumb(this.activatedRoute.root))
    ).subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumbs[] = []): Breadcrumbs[] {
    // If this is the first breadcrumb
    if (breadcrumbs.length === 1) {
      breadcrumbs.unshift({ label: 'Dashboard', url: '/dashboard' }); // Add 'Dashboard' at the beginning
    }

    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.path ? route.routeConfig.path : '';

    // Check if the route has a resolved product
    if (route.snapshot.data && route.snapshot.data['product']) {
      label = route.snapshot.data['product'].name; // Use the product name as the breadcrumb label
    }

    let nextUrl = path ? `${url}/${path}` : url;
    let breadcrumb = {
      label: label,
      url: nextUrl
    };
    let newBreadcrumbs = label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }





  /*buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumbs[] = []): Breadcrumbs[] {
    // Add breadcrumb for the "Dashboard" route
    if (breadcrumbs.length === 0) {
      breadcrumbs.push({ label: 'Dashboard', url: '/dashboard' });
    }

    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.path ? route.routeConfig.path : '';

    // Check if the route has a resolved product
    if (route.snapshot.data['product']) {
      label = route.snapshot.data['product'].name; // Use the product name as the breadcrumb label
    }

    let nextUrl = path ? `${url}/${path}` : url;
    let breadcrumb = {
      label: label,
      url: nextUrl
    };
    let newBreadcrumbs = label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }*/
}
