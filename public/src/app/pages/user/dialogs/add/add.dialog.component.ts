import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
//import { User } from '../../user';
import {FormControl, Validators} from '@angular/forms';
import { EmployeeModel } from '../../../../models/EmployeeModel';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss']
})
export class AddDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: EmployeeModel,
    public dataService: UserService) { }

    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
    ]);

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }

    submit() {
      // emppty stuff
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    public confirmAdd(): void {
      console.log(this.user);
      this.dataService.addUser(this.user);
    }


}
