import { Component, OnInit, Inject } from '@angular/core';
import { ViewCoinTransactionComponent } from '../view-coin-transaction/view-coin-transaction.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TransactionService } from '../../../../services/crypto/transaction.service';
import { UserComponent } from '../../../user/user.component';
import { Observable, Subscription } from 'rxjs';
import { AddHoldingDialogComponent } from '../add-holding-dialog/add-holding-dialog.component';

@Component({
  selector: 'app-view-holding-dialog',
  templateUrl: './view-holding-dialog.component.html',
  styleUrls: ['./view-holding-dialog.component.scss']
})
export class ViewHoldingDialogComponent implements OnInit {
  displayedtransColumns=["coin", "holdings", "price", "action"];
  transactionList: Observable<any>;
  transactionListSub: Subscription;
  
  constructor(private _transactionService: TransactionService,public dialog: MatDialog,public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getTransaction(this.data.user._id);
  }

  getTransaction(userId){
    this.transactionListSub = this._transactionService.getTransaction(userId)
    .subscribe(res=> { 
      this.transactionList = res;
      console.log(this.transactionList)
    }, 
      err=> {
        console.error(err);
      }

    );
  }

  showCoinTransactionDialog(userId,coin){
    const dialogRef = this.dialog.open(ViewCoinTransactionComponent, {
      width:"450px",
      data: {userId: userId, coin:coin}
    });
  }

  addTransactionDialog(){
    const dialogRef = this.dialog.open(AddHoldingDialogComponent, {
      width:"450px",
      data:{userID: this.data.user._id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.coin != null && result.qty != null){
        this._transactionService.addTransaction(result);
      }
      this.getTransaction(this.data.user._id);
    });
  }
}
