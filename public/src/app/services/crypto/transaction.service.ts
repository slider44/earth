import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Transaction } from '../../models/transaction';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TransactionService {
  private readonly API_URL = 'http://localhost:1337/transactions';
  dialogData: any;
  dataChange: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);
  @Input() userId;
  
  constructor(private _httpClient: HttpClient) { }

  addTransaction(transaction: Transaction): void{
    this._httpClient.post(this.API_URL + "/" , transaction).subscribe(data => {
      this.dialogData = transaction;
     //console.log("success");
      },
      (err: HttpErrorResponse) => {
     // this.alert.error( 'Error occurred', 'Error!');
     console.log(err);
    });
  }

  getTransaction(userId) : void{
    this._httpClient.get<Transaction[]>(this.API_URL+"/employeeTx/",userId).subscribe(data => {
      //this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }

}
