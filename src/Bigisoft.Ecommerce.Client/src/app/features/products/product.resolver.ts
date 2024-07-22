import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from "./product";
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Observable<Product>> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const productId = route.paramMap.get('id');
    return this.productService.getProduct(Number(productId));
  }
}
