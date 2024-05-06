import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../core/breadcrumbs/breadcrumb.service';

@Component({
  selector: 'app-product-get',
  standalone: true,
  imports: [],
  templateUrl: './product-get.component.html',
  styleUrl: './product-get.component.css'
})
export class ProductGetComponent implements OnInit {
  public product: Product | undefined;
  product_id: string | undefined;
  constructor(private activatedRouter: ActivatedRoute, private productService: ProductService, private breadcrumbService: BreadcrumbService) {}
  ngOnInit(){
    this.activatedRouter.paramMap.subscribe(params => {
      this.product_id = params.get('id') || undefined;
    });

    if (this.product_id) {
      this.getProduct();
    }
  }

  getProduct() {
    this.productService.getProduct(Number(this.product_id)).subscribe({
      next: (result) => {
        this.product = result;
        this.breadcrumbService.setBreadcrumb(this.product.name); // Set the breadcrumb
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
