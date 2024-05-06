import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {ProductSnackbarsService} from "../product-snackbars.service";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css',
  standalone: true,
  imports: [RouterModule]
})
export class ProductDeleteComponent implements OnInit {
  product_id: string | undefined;
  constructor(private activatedRouter: ActivatedRoute, private router: Router,
              private productService: ProductService,
              private productSnackbarsService: ProductSnackbarsService) {}

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      this.product_id = params.get('id') || undefined;
    });

    this.onDelete(Number(this.product_id));
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.productSnackbarsService.SuccessfulDeleteSnackComponent();
        console.log('Delete request sent successfully');
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.productSnackbarsService.ErrorDeleteSnackComponent();
        console.error(error);
        this.router.navigate(['/products']);
      }
    });
  }
}
