import { NgIf, NgFor } from '@angular/common';
import {ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface Breadcrumbs {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule, NgIf, NgFor, MatGridListModule, MatToolbarModule, MatCardModule],
  standalone: true,
  styleUrl: './breadcrumbs.component.scss',
  templateUrl: './breadcrumbs.component.html',
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
}
