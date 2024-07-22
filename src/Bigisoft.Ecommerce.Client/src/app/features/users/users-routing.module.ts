import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductResolver} from "../products/product.resolver";
import {RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadComponent: () => import('./main/main.component').then(m => m.MainComponent), data: { breadcrumb: 'Users' },
    children: [
      { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
      { path: 'sign-in', loadComponent: () => import('./sign-in/sign-in.component').then(m => m.SignInComponent), data: { breadcrumb: 'Sign-In' } },
      { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent), data: { breadcrumb: 'Login' } },
      { path: 'sign-up', loadComponent: () => import('./sign-up/sign-up.component').then(m => m.SignUpComponent), data: { breadcrumb: 'Sign-Up' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
