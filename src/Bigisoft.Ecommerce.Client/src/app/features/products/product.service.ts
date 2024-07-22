import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from "./product";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/products';
  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + `/${id}`);
  }

  updateProduct(data: Product): Observable<Product> {
    console.log(data);
    return this.http.put<Product>(this.apiUrl, data);
  }
}
