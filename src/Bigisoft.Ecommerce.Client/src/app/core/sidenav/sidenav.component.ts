import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MainContentComponent } from '../main-content/main-content.component';
import {NavigationEnd, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../shared.service';
import {SidenavService} from "./sidebar.service";
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

interface NavItem {
  text: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MainContentComponent, CommonModule],
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  navItems: NavItem[] = [
    { text: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { text: 'Products', icon: 'info', route: '/products' },
    { text: 'Grids', icon: 'person', route: '/grids' },
    { text: 'Sign-in', icon: 'person', route: '/auth' }
    // Add more items as needed
  ];

  constructor(private sidenavService: SidenavService, private router: Router) {}

  ngOnInit() {
    this.sidenavService.toggleSidenav$.subscribe(() => {
      this.toggleSidenav();
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
