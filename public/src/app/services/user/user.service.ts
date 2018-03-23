import { Http, HttpModule, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EmployeeModel } from '../../models/EmployeeModel';
import { isEmpty } from 'rxjs/operators';

@Injectable()
export class UserService {

  private readonly API_URL = 'http://localhost:1337/users';
  dataChange: BehaviorSubject<EmployeeModel[]> = new BehaviorSubject<EmployeeModel[]>([]);
   // Temporarily stores data from dialogs
   dialogData: any;
 
  constructor (private httpClient: HttpClient) {}

  get users(): EmployeeModel[]{
  
    return this.dataChange.value;

  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllUsers(): void {
    this.httpClient.get<EmployeeModel[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  
    // ADD, POST METHOD
    addUser(user: EmployeeModel): void {
    this.httpClient.post(this.API_URL + "/" , user).subscribe(data => {
      this.dialogData = user;
     // this.alert.success('Successfully added', 'Success!' );
      },
      (err: HttpErrorResponse) => {
     // this.alert.error( 'Error occurred', 'Error!');
    });
  }

   // DELETE METHOD
   deleteUser(id: string): void {
    this.httpClient.delete(this.API_URL + "/" + id).subscribe(data => {
      console.log(data['']);
      //this.alert.success('Successfully deleted', 'Success!' );
      },
      (err: HttpErrorResponse) => {
       /// this.alert.error( 'Error occurred', 'Error!');
      }
    );
  }

   // UPDATE, PUT METHOD
   updateUser(user: EmployeeModel): void {
    this.httpClient.put(this.API_URL + "/" + user._id, user).subscribe(data => {
        this.dialogData = user;
       // this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
       // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  //check if contact num already exists

  checkUserExists (user : EmployeeModel): void {
    this.httpClient.get(this.API_URL+ "/"+user.firstName).subscribe(data => {
      console.log("data in checkuser: " );
    },
    (err: HttpErrorResponse) => {
     // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    }
  
  );
  }
}
