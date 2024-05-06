import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ProductsMainComponent} from "../products/main/main.component";
import {ProductResolver} from "../products/product.resolver";
import {GridComponent} from "./grid/grid.component";

const routes: Routes = [
  {
    path: '', component: GridComponent, data: { breadcrumb: 'Grids' },
    children: [
      { path: '', loadComponent: () => import('./grid/grid.component').then(m => m.GridComponent) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridsRoutingModule { }
