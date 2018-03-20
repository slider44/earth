import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave/leave.service';
import {HttpClient} from '@angular/common/http';
import { UtilsService } from '../../utils/utils.service';
import { FilterSortService } from '../../utils/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  
  userDatabase: LeaveService | null;
  leaveListSub: Subscription;


  constructor(public httpClient: HttpClient, 
              public utils: UtilsService,
              public fs: FilterSortService,
              public leaveService: LeaveService) { }

  ngOnInit() {

   // this.loadData();
  }

  public loadData() {
    //this.leaveListSub = this.leaveService.getEvents$().su
  }

}
