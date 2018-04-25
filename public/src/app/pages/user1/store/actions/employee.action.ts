import { Action } from "@ngrx/store";
import { EmployeeModel } from "../../../../models/EmployeeModel";

//load users
export const LOAD_EMP = "[Employees] Load Users";
export const LOAD_EMP_FAIL = "[Employees] Load Users failed";
export const LOAD_EMP_SUCCESS = "[Employees] Load Users success";

//Action creators: implement Action interface where 'payload is optional'
export class LoadEmp implements Action {
  readonly type = LOAD_EMP;
}
export class LoadEmpFail implements Action {
  readonly type = LOAD_EMP_FAIL;
  constructor(public payload: any) {}
}
export class LoadEmpsSuccess implements Action {
  readonly type = LOAD_EMP_SUCCESS;
  constructor(public payload: EmployeeModel[]) {}
}

//export action types

export type EmpAction = LoadEmp | LoadEmpFail | LoadEmpsSuccess;
