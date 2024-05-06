import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, ActivationEnd, Router, RouterModule } from '@angular/router';
import { Product } from "../product";
import { ProductService } from "../product.service";
import { filter } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone: true,
  imports: [NgIf, NgFor, MatTableModule, RouterModule]
})
export class ProductsComponent implements OnInit {
  isChildRouteActive = false;
  public products: Product[] = [];

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(){
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (result) => {
        this.products = result;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  displayedColumns: string[] = ['id', 'name', 'update', 'delete'];
}
