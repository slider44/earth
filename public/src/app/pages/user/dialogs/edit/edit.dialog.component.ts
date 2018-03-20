import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: './edit.dialog.component.html',
  styleUrls: ['./edit.dialog.component.scss']
})
export class EditDialogComponent  {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: UserService) { }

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
  
    stopEdit(): void {
      console.log(this.data);
      this.dataService.updateUser(this.data);
    }
}
