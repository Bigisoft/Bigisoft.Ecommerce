import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sidenavToggleSource = new Subject<void>();
  sidenavToggleObservable$ = this.sidenavToggleSource.asObservable();

  toggleSidenav() {
    this.sidenavToggleSource.next();
  }
}
