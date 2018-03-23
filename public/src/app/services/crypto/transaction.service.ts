import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Transaction } from '../../src/app/models/transaction';

@Injectable()
export class TransactionService {
  private readonly API_URL = 'http://localhost:1337/transactions';
  dialogData: any;
  
  constructor(private _httpClient: HttpClient) { }

  addTransaction(transaction: Transaction): void{
    this._httpClient.post(this.API_URL + "/" , transaction).subscribe(data => {
      this.dialogData = transaction;
     // this.alert.success('Successfully added', 'Success!' );
      },
      (err: HttpErrorResponse) => {
     // this.alert.error( 'Error occurred', 'Error!');
    });
  }

}
