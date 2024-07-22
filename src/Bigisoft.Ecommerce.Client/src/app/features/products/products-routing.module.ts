import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './product.resolver';
import {authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '', loadComponent: () => import('./main/main.component').then(m => m.ProductsMainComponent), data: { breadcrumb: 'Products' },
    children: [
      { path: '', loadComponent: () => import('./get-all/products.component').then(m => m.ProductsComponent) },
      { path: 'add', loadComponent: () => import('./create/product-create.component').then(m => m.ProductCreateComponent), data: { breadcrumb: 'Add product' }, canActivate: [authGuard] },
      { path: 'edit/:id', loadComponent: () => import('./edit/product-edit.component').then(m => m.ProductEditComponent), data: { breadcrumb: 'Edit product' } },
      { path: 'delete/:id', loadComponent: () => import('./delete/product-delete.component').then(m => m.ProductDeleteComponent), data: { breadcrumb: 'Delete product' } },
      { path: ':id', loadComponent: () => import('./get/product-get.component').then(m => m.ProductGetComponent), resolve: { product: ProductResolver }, data: { breadcrumb: 'Product' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
