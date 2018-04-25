import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserComponent } from '../../../user/user.component';
import { TransactionService } from '../../../../services/crypto/transaction.service';
import { Observable } from 'rxjs/Observable';
import { ViewHoldingDialogComponent } from '../view-holding-dialog/view-holding-dialog.component';

@Component({
  selector: 'app-view-coin-transaction',
  templateUrl: './view-coin-transaction.component.html',
  styleUrls: ['./view-coin-transaction.component.scss']
})
export class ViewCoinTransactionComponent implements OnInit {
  transactionList: Observable<any>;
  displayedtransColumns=["holdings", "transaction", "price", "date", "action"];

  constructor(public dialogRef: MatDialogRef<ViewHoldingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public _transactionService: TransactionService) { 
    }

  ngOnInit() {
    this.getCoinTransaction(this.data.userId,this.data.coin);
  }

  getCoinTransaction(userId,coin){
    this._transactionService.getCoinTransaction(userId,coin).subscribe(res=> {
      console.log(res);
      this.transactionList = res;
    },err=> {
      console.error(err);
    });
  }

  edit(transId){
    
  }

  delete(transId){
    this._transactionService.deleteTransaction(transId);
    this.getCoinTransaction(this.data.userId, this.data.coin);
  }

}
