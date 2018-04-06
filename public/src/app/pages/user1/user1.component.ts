import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EmployeeModel } from '../../models/EmployeeModel';
import * as fromStore from '../../pages/user1/store';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { FormControl, Validators } from '@angular/forms';


import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { fromEvent } from 'rxjs/observable/fromEvent';


@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.scss']
})

export class UserComponent1Component implements OnInit {
  displayedColumns = ['firstName', 'lastName',  'contact' , 'email', 'actions'];


employees$ : Observable<EmployeeModel[]>;

  constructor(private store: Store<fromStore.UserState>,public httpClient: HttpClient,
    public dialog: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    //dispatch action
    this.store.dispatch(new fromStore.LoadEmp());
  }


  addTransactionDialog(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width:"300px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

