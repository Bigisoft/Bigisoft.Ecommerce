import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./app.component').then(m => m.AppComponent), data: { breadcrumb: 'Dashboard' } },
  { path: 'products', loadChildren: () => import('./features/products/products-routing.module').then(m => m.ProductsRoutingModule) },
  { path: 'grids', loadChildren: () => import('./features/grids/grids-routing.module').then(m => m.GridsRoutingModule) },
  { path: '**', loadComponent: () => import('./core/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent), data: { breadcrumb: '404 Error' } },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
