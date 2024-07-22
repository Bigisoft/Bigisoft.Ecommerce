import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {AuthService} from "../../auth/AuthService";
import {NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  standalone: true,
  imports: [NgIf, NgFor, MatGridListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
})
export class GridComponent implements OnInit {
  isAuthenticated: boolean = false;
  cols: number = 5; // Default column count

  constructor(private _snackBar: MatSnackBar, public amplifyAuthService: AuthService, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      '(max-width: 599.98px) and (orientation: portrait)',
      '(max-width: 959.98px) and (orientation: landscape)',
      '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)',
      '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
      '(min-width: 840px) and (orientation: portrait)',
      '(min-width: 1280px) and (orientation: landscape)'
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints['(max-width: 599.98px) and (orientation: portrait)']) {
          this.cols = 1; // 1 column on small portrait screens
        } else if (result.breakpoints['(max-width: 959.98px) and (orientation: landscape)']) {
          this.cols = 2; // 2 columns on small landscape screens
        } else if (result.breakpoints['(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)']) {
          this.cols = 2; // 2 columns on mid-sized portrait screens
        } else if (result.breakpoints['(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)']) {
          this.cols = 3; // 3 columns for landscape screens between 960px and 1279.98px
        } else if (result.breakpoints['(min-width: 840px) and (orientation: portrait)']) {
          this.cols = 4; // 4 columns for large portrait screens
        } else if (result.breakpoints['(min-width: 1280px) and (orientation: landscape)']) {
          this.cols = 5; // 5 columns for larger landscape screens
        } else {
          this.cols = 5; // Default to 5 columns for other cases
        }
      }
    });
  }

  async ngOnInit(){
    this.isAuthenticated = await this.amplifyAuthService.isAuthenticated();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  products = [
    {
      name: 'Product 1',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
      description: 'Description for product 1.'
    },
    {
      name: 'Product 2',
      price: 49.99,
      image: 'https://img.freepik.com/premium-photo/ultra-realistic-orange-background-4k-hd-photo-product_1193781-21514.jpg?semt=ais_hybrid',
      description: 'Description for product 2.'
    },
    {
      name: 'Product 3',
      price: 19.99,
      image: 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg',
      description: 'Description for product 3.'
    },
    {
      name: 'Product 4',
      price: 99.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/003/558/840/small/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg',
      description: 'Description for product 4.'
    },
    {
      name: 'Product 4',
      price: 99.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/003/558/840/small/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg',
      description: 'Description for product 4.'
    },
    {
      name: 'Product 4',
      price: 99.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/003/558/840/small/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg',
      description: 'Description for product 4.'
    },
    {
      name: 'Product 4',
      price: 99.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/003/558/840/small/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg',
      description: 'Description for product 4.'
    },
    {
      name: 'Product 4',
      price: 99.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/003/558/840/small/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg',
      description: 'Description for product 4.'
    },
    {
      name: 'Product 4',
      price: 99.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/003/558/840/small/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg',
      description: 'Description for product 4.'
    },
    {
      name: 'Product 4',
      price: 99.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/003/558/840/small/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg',
      description: 'Description for product 4.'
    },
    {
      name: 'Product 4',
      price: 99.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/003/558/840/small/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg',
      description: 'Description for product 4.'
    },
    {
      name: 'Product 4',
      price: 99.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/003/558/840/small/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg',
      description: 'Description for product 4.'
    }
  ];
}
