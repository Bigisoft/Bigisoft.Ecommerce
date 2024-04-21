import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Product {
  name: string;
}

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ProductCreateComponent implements OnInit {
  durationInSeconds = 5;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  SuccessfulSubmitOpenSnackBar() {
    this._snackBar.openFromComponent(SuccessfulSubmitSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ErrorSubmitOpenSnackBar() {
    this._snackBar.openFromComponent(ErrorSubmitSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const data: Product = form.value;

    this.http.post<Product>('/api/products', data).subscribe({
      next: (result) => {
        this.SuccessfulSubmitOpenSnackBar();
        console.log('Form data sent successfully');
        form.resetForm();
      },
      error: (error) => {
        this.ErrorSubmitOpenSnackBar();
        console.error(error);
      }
    });
  }
}

@Component({
  selector: 'successful-submit-snack-component',
  styles: `
    .successful-submit-snack {
      color: #007506;
    }
  `,
  template: `
    <span class="successful-submit-snack">
      The product was added successfully!
    </span>

  `,
  standalone: true,
})
export class SuccessfulSubmitSnackComponent {}

@Component({
  selector: 'error-submit-snack-component',
  styles: `
    .error-submit-snack {
      color: #750000;
    }
  `,
  template: `
    <span class="error-submit-snack">
      There was an error while adding the product!
    </span>

  `,
  standalone: true,
})
export class ErrorSubmitSnackComponent {}
