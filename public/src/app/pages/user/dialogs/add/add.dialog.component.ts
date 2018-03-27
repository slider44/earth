import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
//import { User } from '../../user';
import { FormControl, Validators, AbstractControl, Form } from '@angular/forms';
import { EmployeeModel } from '../../../../models/EmployeeModel';
import { UserService } from '../../../../services/user/user.service';
import { min } from 'rxjs/operator/min';


@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss']
})
export class AddDialogComponent {


  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: EmployeeModel,
    public dataService: UserService) { }
  emailRegEx: string = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  contact = new FormControl('', [Validators.required, Validators.pattern("^[-()+/0-9]+$"), Validators.minLength(5), Validators.maxLength(5)]);
  email = new FormControl('', [Validators.required, Validators.pattern(this.emailRegEx)]);

  getErrorMessage() {

    if (this.firstName.hasError('required'))
      return "Required: please enter valid First Name";

    if (this.lastName.hasError('required'))
      return "Required: please enter valid Last Name";

    if (this.contact.hasError('pattern') ||
      this.contact.hasError('required') ||
      this.contact.hasError('minLength') ||
      this.contact.hasError('maxLength'))
      return "Required: please enter valid contact number";

    if (this.email.hasError('required') || this.email.hasError('pattern'))
      return "Required: please enter valid Email";
  }

  hasErrors() {
    if (this.firstName.valid && this.lastName.valid && this.contact && this.email.valid) return false;
    return true;
  }
  onNoClick(): void {
    console.log("close");
    this.dialogRef.close();
  }

  public confirmAdd(): void {

    console.log(this.user);
    if (!this.hasErrors()) {
      console.log("add user no error");
      this.dataService.checkUserExists(this.user);
      console.log("checkUserExists: " + this.dataService.checkUserExists(this.user));
      this.dataService.addUser(this.user);
    } else {
      console.log("add user has error");
    }

  }
}

/* 
export const contactValidator  = (control : AbstractControl) : {[key:number] : any} => {
const contact = control.get('contact');
 
  const value: string = control.value || '';
  const valid = value.match(/^\d{9}$/);
  return valid ? null : "Invalid contact number";
}; */