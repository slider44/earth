import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../../store";
import * as fromFeature from "../reducers";
import * as fromEmployees from "../reducers/employee.reducer";
import { EmployeeModel } from "../../../../models/EmployeeModel";

//getting employee state
export const getEmpState = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.employees
);

//separating state properties from state tree and create new state
export const getEmployeesEntities = createSelector(
  getEmpState,
  fromEmployees.getEmployeesEntities
);

export const getAllEmployees = createSelector(
  getEmployeesEntities,
  entities => {
    return Object.keys(entities).map(_id => entities[_id]);
  }
);

export const getSelectedEmplyee = createSelector(
  getEmployeesEntities,
  fromRoot.getRouterState,
  (entities, router): EmployeeModel => {
    return router.state && entities[router.state.params._id];
  }
);

export const getEmployeesLoading = createSelector(
  getEmpState,
  fromEmployees.getEmpLoading
);

export const getEmployeesLoded = createSelector(
  getEmpState,
  fromEmployees.getEmpLoading
);
