import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Transaction } from '../../models/transaction';
import { catchError } from 'rxjs/operators';
import {Observable } from 'rxjs/Observable';

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

  getTransaction(userId) :Observable<any>{
    return this._httpClient
    .get(this.API_URL+"/count/"+userId)
    .pipe(
      catchError((error) => this._handleError(error))
    );
  }
  
  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
   
    return Observable.throw(errorMsg);
  }
}
