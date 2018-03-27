import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
//import { User } from './user';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { FormControl, Validators } from '@angular/forms';
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { UserService } from '../../services/user/user.service';
import { EmployeeModel } from '../../models/EmployeeModel';
import { TransactionService } from '../../services/crypto/transaction.service';
import { AddHoldingDialogComponent } from '../crypto/dialog/add-holding-dialog/add-holding-dialog.component';
import { Transaction } from '../../models/transaction';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit {

  displayedColumns = ['firstName', 'lastName',  'contact' , 'email', 'actions'];
  userDatabase: UserService | null;
  dataSource: UserDataSource | null;
  index: number;
  id: string;
  selectedUserId: string;

  users:Array<EmployeeModel> = [];
  

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private _userService: UserService,
    private _transactionService: TransactionService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  holdings(user:EmployeeModel){
    this.selectedUserId = user._id;
    console.log(this.selectedUserId);
  }

  /*getTransaction(){
    this. this._transactionService.getTransaction();
  }*/

  addTransactionDialog(){
    const dialogRef = this.dialog.open(AddHoldingDialogComponent, {
      width:"300px",
      data: {user: "user"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null){
        this._transactionService.addTransaction(result);
      }
    });
  }

  addNew(user: EmployeeModel) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width:"500px",
      data: {issue: user}
   });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.userDatabase.dataChange.value.push(this._userService.getDialogData());
       
        this.loadData();
        
      }
    });
  }

  deleteItem(i: number, id: string, firstName: string, lastName: string, contact: string, email: string) {
   
    this.id = id;
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width:"500px",
      data: {_id: id, firstName: firstName, lastName: lastName, contact: contact, email: email}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.userDatabase.dataChange.value.findIndex(x => x._id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.userDatabase.dataChange.value.splice(foundIndex, 1);
        this.loadData();
      }
    });
  }
/* 
  getErrorMessage(firstName: FormControl, lastName: FormControl, contact : FormControl, email : FormControl ) {

    if (firstName.hasError('required'))
      return "Required: please enter valid First Name";

    if (lastName.hasError('required'))
      return "Required: please enter valid Last Name";

    if (contact.hasError('pattern'))
      return "Required: please enter valid contact number";

    if (email.hasError('required') || email.hasError('email'))
      return "Required: please enter valid Email";
  }

  hasErrors(firstName: FormControl, lastName: FormControl, contact : FormControl, email : FormControl ) {
    if (firstName.valid && lastName.valid  && contact && email.valid) return false;
    return true;
  } */

  startEdit(i: number, id: string, firstName: string, lastName: string, contact: string, email: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width:"500px",
      data: {_id: id, firstName: firstName, lastName: lastName,contact: contact,  email: email}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.userDatabase.dataChange.value.findIndex(x => x._id === this.id);
        // Then you update that record using data from dialogData (values you entered)
        this.userDatabase.dataChange.value[foundIndex] = this.userDatabase.getDialogData();
        // And lastly refresh table
        //this.refreshTable();
      
        this.loadData();
       
      }
    });
  }

    // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    private refreshTable() {
      // if there's a paginator active we're using it for refresh
      if (this.dataSource._paginator.hasNextPage()) {
        this.dataSource._paginator.nextPage();
        this.dataSource._paginator.previousPage();
        // in case we're on last page this if will tick
      } else if (this.dataSource._paginator.hasPreviousPage()) {
        this.dataSource._paginator.previousPage();
        this.dataSource._paginator.nextPage();
        // in all other cases including active filter we do it like this
      } else {
        this.dataSource.filter = '';
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    }

  public loadData() {
    this.userDatabase = new UserService(this.httpClient);
    this.dataSource = new UserDataSource(this.userDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}


export class UserDataSource extends DataSource<EmployeeModel> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: EmployeeModel[] = [];
  renderedData: EmployeeModel[] = [];

  constructor(public _userDatabase: UserService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */

  connect(): Observable<EmployeeModel[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._userDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._userDatabase.getAllUsers();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._userDatabase.users.slice().filter((user: EmployeeModel) => {
        const searchStr = (user._id + user.firstName + user.lastName + + user.contact, user.email).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }


  /** Returns a sorted copy of the database data. */
  sortData(user: EmployeeModel[]): EmployeeModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return user;
    }

    return user.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case '_id': [propertyA, propertyB] = [a._id, b._id]; break;
        case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
        case 'lastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
        case 'contact': [propertyA, propertyB] = [a.contact, b.contact]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

