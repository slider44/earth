<<<<<<< HEAD
import { Component, OnInit, Inject } from "@angular/core";
import { UserComponent } from "../../../user/user.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CmcService } from "../../../../services/crypto/cmc.service";
import { Observable } from "rxjs/Observable";
import { FormControl } from "@angular/forms";
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";
import { map } from "rxjs/operator/map";
import { Coin } from "../../../../models/coin";
import { Transaction } from "../../../../models/transaction";
=======
import { Component, OnInit, Inject } from '@angular/core';
import { UserComponent } from '../../../user/user.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CmcService } from '../../../../services/crypto/cmc.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operator/map';
import { Coin } from '../../../../models/coin';
import { Transaction } from '../../../../models/transaction';
import { ViewHoldingDialogComponent } from '../view-holding-dialog/view-holding-dialog.component';
<<<<<<< HEAD
>>>>>>> 29c7dbda72fd95857f1f143dab0a624d093a2254
=======
>>>>>>> 29c7dbda72fd95857f1f143dab0a624d093a2254

@Component({
  selector: "app-add-holding-dialog",
  templateUrl: "./add-holding-dialog.component.html",
  styleUrls: ["./add-holding-dialog.component.scss"]
})
export class AddHoldingDialogComponent implements OnInit {
  transaction = new Transaction();
<<<<<<< HEAD
<<<<<<< HEAD

  date = new FormControl(new Date());
  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
=======
  date = new FormControl(new Date());
=======
  date = new FormControl(new Date());
>>>>>>> 29c7dbda72fd95857f1f143dab0a624d093a2254
  constructor(public dialogRef: MatDialogRef<ViewHoldingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      
    }
>>>>>>> 29c7dbda72fd95857f1f143dab0a624d093a2254

  ngOnInit() {
    this.transaction.userID = this.data.userID
    this.transaction.time_stamp = this.date.value;
  }

<<<<<<< HEAD
  addHolding() {
    this.dialogRef.close(this.transaction);
  }

<<<<<<< HEAD
  onNoClick() {
=======
  addHolding(){
    this.dialogRef.close(this.transaction);
  }

=======
>>>>>>> 29c7dbda72fd95857f1f143dab0a624d093a2254
  onNoClick(){
>>>>>>> 29c7dbda72fd95857f1f143dab0a624d093a2254
    this.dialogRef.close();
  }
}
