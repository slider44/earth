import { EmployeeModel } from '../../../../models/EmployeeModel';
import * as fromEmployees from '../actions/employee.action';
import { ActionReducerMap } from '@ngrx/store';
import { UserState } from '.';


export interface EmployeeState {
    entities: {[_id : number]: EmployeeModel},
    loaded: boolean,
    loading: boolean
}

//implement EmployeeState interface
export const InitialState: EmployeeState = {
    //test data
    entities: {},
    loaded: false,
    loading: false
}

//create reducer func that handles employee action that returns the state of type EmployeState
export function reducer(
    state = InitialState,
    action: fromEmployees.EmpAction
): EmployeeState {

    //switch thru action types
    switch (action.type) {
        case fromEmployees.LOAD_EMP: {
            return {
                ...state,
                loading: true
            };
        }//end case

        case fromEmployees.LOAD_EMP_SUCCESS: {
            const employees = action.payload;
            const entities = employees.reduce(
                (entities:{[_id : number] : EmployeeModel}, employees)=> {
                    return {
                        ...entities,
                        [employees._id] : EmployeeModel
                    };
                },
            {
                    ...state.entities
            })

            return {
                ...state,
                loading: false, 
                loaded: true
            };
        }//end case

        case fromEmployees.LOAD_EMP_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }//end case
    }

    return state;
}


//create selector functions
export const getEmpLoading = (state: EmployeeState) => state.loading;
export const getEmpLoaded = (state: EmployeeState) => state.loaded;
export const getEmployeesEntities = (state: EmployeeState) => state.entities;