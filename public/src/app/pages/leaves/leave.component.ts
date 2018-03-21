import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave/leave.service';
import {HttpClient} from '@angular/common/http';
import { UtilsService } from '../../utils/utils.service';
import { FilterSortService } from '../../utils/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { EmployeeModel } from '../../models/EmployeeModel';
import { LeaveModel } from '../../models/LeaveModel';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit , OnDestroy{
  
  userDatabase: LeaveService | null;
  leaveListSub: Subscription;
  leaveList: LeaveModel[];
  filteredLeaves: LeaveModel[];
  loading: boolean;
  error: boolean;
  query: '';
  pageTitle = "Leaves"

  constructor(
    public utils: UtilsService,
    private api: LeaveService,
    public fs: FilterSortService) { }

  ngOnInit() {

    this.loadData();
  }

  public loadData() {

    this.loading = true;
    // Get future leaves
    this.leaveListSub = this.api.getEvents$()
    .subscribe(res=> { this.leaveList = res; this.filteredLeaves = res;
      this.loading = false;
      console.log(res)
    }, 
      err=> {
        console.error(err);
        this.loading = false;
        this.error = true;
      }

    );

    
  }

  searchEvents() {
    this.filteredLeaves = this.fs.search(this.leaveList, this.query, '_id', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredLeaves = this.leaveList;
  }

  ngOnDestroy() {
    this.leaveListSub.unsubscribe();
  }


}
