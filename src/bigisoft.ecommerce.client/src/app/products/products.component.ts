import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

interface Product {
  id: number,
  name: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor, MatTableModule]
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  dataSource: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get<Product[]>('/api/products').subscribe({
      next: (result) => {
        this.products = result;
        this.dataSource = result;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  displayedColumns: string[] = ['id', 'name', 'update', 'delete'];
}
