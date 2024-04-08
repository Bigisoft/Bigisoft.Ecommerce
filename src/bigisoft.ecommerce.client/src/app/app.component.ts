import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatCommonModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { GridComponent } from './grid/grid.component';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
  standalone: true,
  imports: [NgIf, NgFor, HeaderComponent, MatTableModule, GridComponent]
})

export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  dataSource: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
        this.dataSource = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  displayedColumns: string[] = ['date', 'temperatureC', 'temperatureF', 'summary'];
  title = 'bigisoft.ecommerce.client';
}
