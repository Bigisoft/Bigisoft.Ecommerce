import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AppComponent, data: { breadcrumb: 'Dashboard' }  },
  { path: 'products', component: ProductsComponent, data: { breadcrumb: 'Products' }  },
  { path: 'add-product', component: ProductCreateComponent, data: { breadcrumb: 'Add product' }  },
  { path: 'delete-product/:id', component: ProductDeleteComponent, data: { breadcrumb: 'Delete product' }  },
  { path: 'grids', component: GridComponent, data: { breadcrumb: 'Grids' }  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
