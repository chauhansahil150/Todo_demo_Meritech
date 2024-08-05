import { EmployeeDetailsStore } from "./EmployeeDetails";
export interface IRootStore{
    employeeDetailsStore:EmployeeDetailsStore;
}

export class RootStore implements IRootStore{
    employeeDetailsStore: EmployeeDetailsStore;

    constructor(){
        this.employeeDetailsStore=new EmployeeDetailsStore(this)
    }
}