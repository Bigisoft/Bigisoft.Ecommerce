import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent, data: { breadcrumb: 'Home' }  },
  { path: 'products', component: ProductsComponent, data: { breadcrumb: 'Products' }  },
  { path: 'grids', component: GridComponent, data: { breadcrumb: 'Grids' }  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
