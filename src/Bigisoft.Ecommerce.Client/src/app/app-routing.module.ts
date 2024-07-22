import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./app.component').then(m => m.AppComponent), data: { breadcrumb: 'Dashboard' } },
  { path: 'products', loadChildren: () => import('./features/products/products-routing.module').then(m => m.ProductsRoutingModule) },
  { path: 'users', loadChildren: () => import('./features/users/users-routing.module').then(m => m.UsersRoutingModule) },
  { path: 'grids', loadChildren: () => import('./features/grids/grids-routing.module').then(m => m.GridsRoutingModule) },
  { path: 'auth', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth-test', loadComponent: () => import('./features/auth/auth-test.component').then(m => m.AuthorizedDataComponent) },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./core/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent), data: { breadcrumb: '404 Error' } },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
