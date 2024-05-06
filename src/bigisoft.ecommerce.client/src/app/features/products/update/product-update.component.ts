import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {Product} from "../product";
import {ProductService} from "../product.service";
import {ProductSnackbarsService} from "../product-snackbars.service";


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
  standalone: true,
  imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ProductUpdateComponent implements OnInit {
  public product: Product | undefined;
  product_id: string | undefined;
  constructor(private activatedRouter: ActivatedRoute, private router: Router,
              private productService: ProductService,
              private productSnackbarsService: ProductSnackbarsService) {}


  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      this.product_id = params.get('id') || undefined;
    });

    if (this.product_id) {
      this.getProduct();
    }
  }


  onSubmit(form: NgForm) {
    const data: Product = form.value;

    this.productService.updateProduct(data).subscribe({
      next: () => {
        this.productSnackbarsService.SuccessfulUpdateSnackComponent();
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.productSnackbarsService.ErrorUpdateSnackComponent();
        console.error(error);
        this.router.navigate(['/products']);
      }
    });
  }

  getProduct() {
    this.productService.getProduct(Number(this.product_id)).subscribe({
      next: (result) => {
        this.product = result;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

