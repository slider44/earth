import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";

import { EmployeeModel } from "../../models/EmployeeModel";

import { MatDialog, MatPaginator, MatSort } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { FormControl, Validators } from "@angular/forms";

import { AddDialogComponent } from "./dialogs/add/add.dialog.component";
import { DeleteDialogComponent } from "./dialogs/delete/delete.dialog.component";
import { EditDialogComponent } from "./dialogs/edit/edit.dialog.component";
import { fromEvent } from "rxjs/observable/fromEvent";

import { Subscription } from "rxjs/Subscription";
import { UserService } from "../../services";

import { Store } from "@ngrx/store";
import * as fromStore from "../../pages/user1/store";
import { getUserState, UserState } from "../../pages/user1/store";
import * as fromEffects from "../user1/store/effects/employee.effect";
import { Observable } from "rxjs/Observable";
import { EmployeeState } from "./store/reducers/employee.reducer";

@Component({
  selector: "app-user1",
  templateUrl: "./user1.component.html",
  styleUrls: ["./user1.component.scss"]
})
export class User1Component implements OnInit {
  displayedColumns = ["firstName", "lastName", "contact", "email", "actions"];
  displayedtransColumns = ["coin", "holdings", "price", "action"];
  userDatabase: EmployeeModel[] = [];
  dataSource: any | null;
  index: number;
  id: string;
  selectedUserId: string;

  users: Array<EmployeeModel> = [];

  transactionListSub: Subscription;
  transactionList: Observable<any>;

  employees$: Observable<EmployeeModel[]>;

  constructor(
    public store: Store<fromStore.UserState>,
    public httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter") filter: ElementRef;

  ngOnInit() {
    //dispatch action to load employees

    this.loadData();
  }

  public loadData() {
    this.store.dispatch(new fromStore.LoadEmp());
    console.log("userDatabase from store: " + this.userDatabase);

    this.store.select(fromStore.getAllEmployees).subscribe(arr => {
      console.log("fromStore.getAllEmp: " + arr);
      this.userDatabase = arr;

      this.dataSource = new UserDataSource(
        this.userDatabase,
        this.paginator,
        this.sort
      );
    });

    Observable.fromEvent(this.filter.nativeElement, "keyup")
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  addNew(user: EmployeeModel) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: "500px",
      data: { issue: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.userDatabase
          .push
          //insert effects
          /*           this._userService.getDialogData() */
          ();

        this.loadData();
      }
    });
  }

  addTransactionDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: "300px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

export class UserDataSource extends DataSource<EmployeeModel> {
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: EmployeeModel[] = [];
  renderedData: EmployeeModel[] = [];

  constructor(
    public _userDatabase: any,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */

  connect(): Observable<EmployeeModel[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._userDatabase,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];
    console.log("fromDatasource from UserDataSource: " + this._userDatabase);
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._userDatabase
        .slice()
        .filter((user: EmployeeModel) => {
          const searchStr = (user._id +
            user.firstName +
            user.lastName +
            +user.contact,
          user.email).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(
        startIndex,
        this._paginator.pageSize
      );
      return this.renderedData;
    });
  }
  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(user: EmployeeModel[]): EmployeeModel[] {
    if (!this._sort.active || this._sort.direction === "") {
      return user;
    }

    return user.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "_id":
          [propertyA, propertyB] = [a._id, b._id];
          break;
        case "firstName":
          [propertyA, propertyB] = [a.firstName, b.firstName];
          break;
        case "lastName":
          [propertyA, propertyB] = [a.lastName, b.lastName];
          break;
        case "contact":
          [propertyA, propertyB] = [a.contact, b.contact];
          break;
        case "email":
          [propertyA, propertyB] = [a.email, b.email];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
