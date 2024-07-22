import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Product } from "../product";
import {ProductService} from "../product.service";
import {ProductSnackbarsService} from "../product-snackbars.service";


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ProductCreateComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private productService: ProductService, private productSnackbarsService: ProductSnackbarsService) {}

  ngOnInit() {}


  onSubmit(form: NgForm) {
    const data: Product = form.value;

    this.productService.createProduct(data).subscribe({
      next: (result) => {
        this.productSnackbarsService.SuccessfulSubmitOpenSnackBar();
        console.log('Form data sent successfully');
        form.resetForm();
        this.router.navigateByUrl('/products');
      },
      error: (error) => {
        for(let err of this.objectValues(error))
        {
          if (err.errors && err.errors.Name && err.errors.Name[0]) {
            console.error(err.errors.Name[0]);
            this.productSnackbarsService.ErrorSubmitOpenSnackBar(err.errors.Name[0]);
          }
        }
        //this.router.navigateByUrl('/products');
      }
    });
  }

  objectValues(obj: string): any[] {
    return Object.values(obj);
  }
}

