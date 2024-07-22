import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Product } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone: true,
  imports: [NgIf, NgFor, MatTableModule, RouterModule]
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productService: ProductService) {}

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


  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
}
