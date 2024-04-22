import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
}
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
  standalone: true,
  imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ProductUpdateComponent implements OnInit {
  public product: Product | undefined;
  durationInSeconds = 5;
  product_id: string | undefined;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private activatedRouter: ActivatedRoute, private router: Router) {}


  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      this.product_id = params.get('id') || undefined;
    });
    
    if (this.product_id) {
      this.getProduct();
    }
  }

  SuccessfulUpdateSnackComponent() {
    this._snackBar.openFromComponent(SuccessfulUpdateSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ErrorUpdateSnackComponent() {
    this._snackBar.openFromComponent(ErrorUpdateSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit(form: NgForm) {
    const data: Product = form.value;

    this.http.put<Product>(`/api/products/`, data).subscribe({
      next: () => {
        this.SuccessfulUpdateSnackComponent();
        //console.log('Update request sent successfully');
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.ErrorUpdateSnackComponent();
        //console.error(error);
        this.router.navigate(['/products']);
      }
    });

    console.log(data);
  }

  getProduct() {
    this.http.get<Product>(`/api/products/${this.product_id}`).subscribe({
      next: (result) => {
        this.product = result;
        //console.log(this.product);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}


@Component({
  selector: 'successful-update-snack-component',
  styles: `
    .successful-update-snack {
      color: #007506;
    }
  `,
  template: `
    <span class="successful-update-snack">
      The product was updated successfully!
    </span>

  `,
  standalone: true,
})
export class SuccessfulUpdateSnackComponent {}

@Component({
  selector: 'error-update-snack-component',
  styles: `
    .error-update-snack {
      color: #750000;
    }
  `,
  template: `
    <span class="error-update-snack">
      There was an error while updating the product!
    </span>

  `,
  standalone: true,
})
export class ErrorUpdateSnackComponent {}

