import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-auth-dialog-btn',
  standalone: true,
  imports: [MatButtonModule],
  template: `<button mat-button (click)="openDialog()">Sign-In</button>`,
  //styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AuthDialogDialog);
  }
}

// The code for the Authentication dialog
@Component({
  selector: 'app-auth-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, LoginComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthDialogDialog {}
