import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedService } from '../../shared.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, SidenavComponent],
})
export class HeaderComponent {
  constructor(private sharedService: SharedService) { }

  toggleSidenav() {
    this.sharedService.toggleSidenav();
  }
}
