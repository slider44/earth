import * as fromEmployees from './employee.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import { getEmployeesEntities } from './employee.reducer';

//decouple state from employee by implementing Employee state interface
export interface UserState {
    employees: fromEmployees.EmployeeState
}

//bind UserState interface to ActionReducerMap
//register reducer as new object of type ActionReducerMap
export const reducers: ActionReducerMap<UserState> = {
    employees: fromEmployees.reducer,

};


/* create base level of state object */

//holds a selector for entire lazy loaded module from a property indicated in StoreModule.forFeature('employees')
export const getUserState = createFeatureSelector<UserState>('employees');

//getting employee state
export const getEmpState = createSelector(
    getUserState,
    (state: UserState) => state.employees
);

//separating state properties from state tree

export const getEmployeesEntity = createSelector(
    getEmpState, fromEmployees.getEmployeesEntities
);

export const getAllEmployees = createSelector(
    getEmployeesEntity, 
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getEmployeesLoading = createSelector(
    getEmpState, fromEmployees.getEmpLoading
);


export const getEmployeesLoded = createSelector(
    getEmpState, fromEmployees.getEmpLoading
);