import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css',
  standalone: true,
  imports: [RouterModule]
})
export class ProductDeleteComponent implements OnInit {
  durationInSeconds = 5;
  product_id: string | undefined;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private activatedRouter: ActivatedRoute, private router: Router) {}


  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      this.product_id = params.get('id') || undefined;
    });

    this.onDelete(Number(this.product_id));
  }

  SuccessfulDeleteSnackComponent() {
    this._snackBar.openFromComponent(SuccessfulDeleteSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ErrorDeleteSnackComponent() {
    this._snackBar.openFromComponent(ErrorDeleteSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onDelete(id: number) {
    this.http.delete(`/api/products/${id}`).subscribe({
      next: () => {
        this.SuccessfulDeleteSnackComponent();
        console.log('Delete request sent successfully');
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.ErrorDeleteSnackComponent();
        console.error(error);
        this.router.navigate(['/products']);
      }
    });
  }
}


@Component({
  selector: 'successful-delete-snack-component',
  styles: `
    .successful-delete-snack {
      color: #007506;
    }
  `,
  template: `
    <span class="successful-delete-snack">
      The product was deleted successfully!
    </span>

  `,
  standalone: true,
})
export class SuccessfulDeleteSnackComponent {}

@Component({
  selector: 'error-delete-snack-component',
  styles: `
    .error-delete-snack {
      color: #750000;
    }
  `,
  template: `
    <span class="error-delete-snack">
      There was an error while deleting the product!
    </span>

  `,
  standalone: true,
})
export class ErrorDeleteSnackComponent {}
