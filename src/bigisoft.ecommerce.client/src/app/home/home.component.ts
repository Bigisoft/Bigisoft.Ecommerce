import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [NgIf, NgFor, MatTableModule]
})

export class HomeComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  dataSource: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe({
      next: (result) => {
        this.forecasts = result;
        this.dataSource = result;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  displayedColumns: string[] = ['date', 'temperatureC', 'temperatureF', 'summary'];
  title = 'bigisoft.ecommerce.client';
}
