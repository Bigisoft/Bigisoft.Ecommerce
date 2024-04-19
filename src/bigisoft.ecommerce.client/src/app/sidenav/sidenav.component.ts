import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedService } from '../shared.service';
import { HomeComponent } from '../home/home.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MainContentComponent],
})
export class SidenavComponent implements OnDestroy {
  @ViewChild('snav') snav!: MatSidenav;
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);
  fillerContent = Array.from(
    {length: 5},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private sharedService: SharedService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

    if (this.mobileQuery.addEventListener) {
      this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    } else {
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    this.sharedService.sidenavToggleObservable$.subscribe(() => {
      this.snav?.toggle();
    });
  }

  ngOnDestroy(): void {
    if (this.mobileQuery.removeEventListener) {
      this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    } else {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
