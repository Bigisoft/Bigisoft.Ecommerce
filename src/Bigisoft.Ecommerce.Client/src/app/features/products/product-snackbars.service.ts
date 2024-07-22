import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductSnackbarsService {
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) {}
  SuccessfulSubmitOpenSnackBar() {
    this._snackBar.openFromComponent(SuccessfulSubmitSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ErrorSubmitOpenSnackBar() {
    this._snackBar.openFromComponent(ErrorSubmitSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  SuccessfulDeleteSnackComponent() {
    this._snackBar.openFromComponent(SuccessfulDeleteSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ErrorDeleteSnackComponent() {
    this._snackBar.openFromComponent(ErrorDeleteSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  SuccessfulUpdateSnackComponent() {
    this._snackBar.openFromComponent(SuccessfulUpdateSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ErrorUpdateSnackComponent() {
    this._snackBar.openFromComponent(ErrorUpdateSnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

@Component({
  selector: 'successful-submit-snack-component',
  styles: `
    .successful-submit-snack {
      color: #007506;
    }
  `,
  template: `
    <span class="successful-submit-snack">
      The product was added successfully!
    </span>

  `,
  standalone: true,
})
export class SuccessfulSubmitSnackComponent {}

@Component({
  selector: 'error-submit-snack-component',
  styles: `
    .error-submit-snack {
      color: #750000;
    }
  `,
  template: `
    <span class="error-submit-snack">
      There was an error while adding the product!
    </span>

  `,
  standalone: true,
})
export class ErrorSubmitSnackComponent {}

@Component({
  selector: 'successful-delete-snack-component',
  styles: `
    .successful-delete-snack {
      color: #007506;
    }
  `,
  template: `
    <span class="successful-delete-snack">
      The product was deleted successfully!
    </span>

  `,
  standalone: true,
})
export class SuccessfulDeleteSnackComponent {}

@Component({
  selector: 'error-delete-snack-component',
  styles: `
    .error-delete-snack {
      color: #750000;
    }
  `,
  template: `
    <span class="error-delete-snack">
      There was an error while deleting the product!
    </span>

  `,
  standalone: true,
})
export class ErrorDeleteSnackComponent {}

@Component({
  selector: 'successful-update-snack-component',
  styles: `
    .successful-update-snack {
      color: #007506;
    }
  `,
  template: `
    <span class="successful-update-snack">
      The product was updated successfully!
    </span>

  `,
  standalone: true,
})
export class SuccessfulUpdateSnackComponent {}

@Component({
  selector: 'error-update-snack-component',
  styles: `
    .error-update-snack {
      color: #750000;
    }
  `,
  template: `
    <span class="error-update-snack">
      There was an error while updating the product!
    </span>

  `,
  standalone: true,
})
export class ErrorUpdateSnackComponent {}

