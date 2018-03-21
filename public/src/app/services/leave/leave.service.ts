import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import { LeaveModel } from '../../models/LeaveModel';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EmployeeModel } from '../../models/EmployeeModel';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class LeaveService {
  private readonly API_URL = 'http://localhost:1337/leaves';
  dataChange: BehaviorSubject<LeaveModel[]> = new BehaviorSubject<LeaveModel[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  // GET list of future leaves
  
  getEvents$(): Observable<LeaveModel[]> {
    return this.httpClient
      .get(this.API_URL)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
   
    return Observable.throw(errorMsg);
  }

}
