import * as fromEmployees from "./employee.reducer";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { getEmployeesEntities } from "./employee.reducer";

//decouple state from employee by implementing Employee state interface
export interface UserState {
  employees: fromEmployees.EmployeeState;
}

//bind UserState interface to ActionReducerMap
//register reducer as new object of type ActionReducerMap
export const reducers: ActionReducerMap<UserState> = {
  employees: fromEmployees.reducer
};

/* create base level of state object */

//holds a selector for entire lazy loaded module from a property indicated in StoreModule.forFeature('employees')
export const getUserState = createFeatureSelector<UserState>("employees");
