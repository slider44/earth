import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Transaction } from '../../models/transaction';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TransactionService {
  private readonly API_URL = 'http://localhost:1337/transactions';
  dialogData: any;
  dataChange: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);
  @Input() userId;
  
  constructor(private _httpClient: HttpClient) { }

  addTransaction(transaction: Transaction): void{
    this._httpClient.post(this.API_URL + "/" , transaction).subscribe(data => {
      //this.dialogData = transaction;
     //console.log("success");
      },
      (err: HttpErrorResponse) => {
     // this.alert.error( 'Error occurred', 'Error!');
     console.log(err);
    });
  }

  getTransaction(userId) :Observable<Transaction[]>{
    return this._httpClient
    .get(this.API_URL+"/"+userId)
    .pipe(
      catchError((error) => this._handleError(error))
    );
  }
  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
   
    return Observable.throw(errorMsg);
  }
}
