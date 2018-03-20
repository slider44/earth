import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import { LeaveModel } from '../../models/LeaveModel';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EmployeeModel } from '../../models/EmployeeModel';

@Injectable()
export class LeaveService {
  private readonly API_URL = 'http://localhost:1337/leaves';
  dataChange: BehaviorSubject<LeaveModel[]> = new BehaviorSubject<LeaveModel[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  // GET list of future leaves

  /*getEvents$(): void {
    this.httpClient.get<LeaveModel[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }*/

}
