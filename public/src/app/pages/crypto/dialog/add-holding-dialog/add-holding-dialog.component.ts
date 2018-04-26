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

@Component({
  selector: "app-add-holding-dialog",
  templateUrl: "./add-holding-dialog.component.html",
  styleUrls: ["./add-holding-dialog.component.scss"]
})
export class AddHoldingDialogComponent implements OnInit {
  transaction = new Transaction();
  date = new FormControl(new Date());
  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.transaction.userID = this.data.userID
    this.transaction.time_stamp = this.date.value;
  }
  addHolding(){
    this.dialogRef.close(this.transaction);
  }
  onNoClick(){
    this.dialogRef.close();
  }
}
