import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatTableModule } from '@angular/material/table';
import { GridComponent } from './grid/grid.component';
import { NgFor, NgIf } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SharedService } from './shared.service';
import { SidenavComponent } from './sidenav/sidenav.component';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, NgIf, NgFor, HeaderComponent, SidenavComponent]
})

export class AppComponent
{

}
