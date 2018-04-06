import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromUserService from '../../../../services';
import * as employeeActions from '../actions/employee.action';


@Injectable()
export class EmployeesEffect { 
    constructor(
        private actions$ : Actions,
        private employeeService: fromUserService.UserService
    ){}

   //using effect we can now dispatch actions from observable services
    @Effect()
    loadEmployees$ = this.actions$.ofType(employeeActions.LOAD_EMP)
    .pipe(
        switchMap(() => {
            return this.employeeService
                .getAllUsersForStore()
                .pipe(
                    map(employees => new employeeActions.LoadEmpsSuccess(employees)),
                    catchError(error=> of(new employeeActions.LoadEmpFail(error)))
            )
        })
    );

}