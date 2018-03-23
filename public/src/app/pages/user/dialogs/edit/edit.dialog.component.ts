import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: './edit.dialog.component.html',
  styleUrls: ['./edit.dialog.component.scss']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: UserService) { }


/* 
  emailRegEx: string = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
 firstName
   = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  contact = new FormControl('', [Validators.pattern("^[-()+/0-9]+$"), Validators.minLength(5)]);
  email = new FormControl('', [Validators.required, Validators.pattern(this.emailRegEx)]);
  getErrorMessage() {

    if (this.firstName.hasError('required'))
      return "Required: please enter valid First Name";

    if (this.lastName.hasError('required'))
      return "Required: please enter valid Last Name";

    if (this.contact.hasError('pattern'))
      return "Required: please enter valid contact number";

    if (this.email.hasError('required') || this.email.hasError('email'))
      return "Required: please enter valid Email";
  }

  hasErrors() {
    if (this.firstName.valid && this.lastName.valid  && this.contact && this.email.valid) return false;
    return true;
  }
 */
  submit() {
    // emppty stuff

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    console.log(this.data);
 /*    if(!this.hasErrors()) { */
      console.log("add user no error");
      this.dataService.checkUserExists(this.data);
      console.log("checkUserExists: "+ this.dataService.checkUserExists(this.data));
    this.dataService.updateUser(this.data);
   /*  } */
  }

}
