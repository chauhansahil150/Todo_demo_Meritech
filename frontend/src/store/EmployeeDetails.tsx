import { action, observable, computed, makeObservable } from "mobx";
import { IRootStore } from "./RootStore";

export interface Location {
  lat: number;
  lon: number;
  display_name: string;
}

export interface IEmployeeDetails {
  _id: string;
  name: string;
  city: string;
  salary: string;
  location: Location;
}

export class EmployeeDetailsStore {
  employeeDetails: IEmployeeDetails[] = [];
  selectedUsers: IEmployeeDetails[] = [];
  loading: boolean = false; // New observable for loading state
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      employeeDetails: observable,
      selectedUsers: observable,
      loading: observable, // Make loading observable
      addEmployees: action,
      addEmployee: action,
      updateEmployee: action,
      deleteEmployee: action,
      setSelectedUsers: action,
      addUserToSelected: action,
      removeUserFromSelected: action,
      addEmployeeToSelected: action, // New action
      setLoading: action, // New action for setting loading state
      setEmployees:action,
      getAllEmployees: computed,
      getAllEmployeesLocation: computed,
    });
    this.rootStore = rootStore;
  }

  setLoading(value: boolean) {
        this.loading = value;
  }

  addEmployees(employees: IEmployeeDetails[]) {
    this.employeeDetails = employees;
    this.setLoading(false); // Set loading to false after adding employees
  }

  addEmployee(employee: IEmployeeDetails) {
    this.employeeDetails = [...this.employeeDetails, employee];
    this.setLoading(false); 
  }

  updateEmployee(_id: string, employee: IEmployeeDetails) {
        const index = this.employeeDetails.findIndex(u => u?._id === _id);
        this.employeeDetails[index] = employee;
        this.employeeDetails = [...this.employeeDetails];
        this.updateUserFromSelected(_id,employee)
        this.setLoading(false); 
  }

  deleteEmployee(_id: string) {
    const index = this.employeeDetails.findIndex(u => u?._id === _id);
    this.employeeDetails = this.employeeDetails.slice();
    this.employeeDetails.splice(index, 1);
    this.removeUserFromSelected(_id)
    this.setLoading(false); 
  }

  setSelectedUsers(users: IEmployeeDetails[]) {
    this.selectedUsers = users;
  }

  addUserToSelected(user: IEmployeeDetails) {
    this.selectedUsers = [...this.selectedUsers, user];
  }

  removeUserFromSelected(_id: string) {
    this.selectedUsers = this.selectedUsers.filter(u => u._id !== _id);
  }
  updateUserFromSelected(_id: string, employee: IEmployeeDetails) {
    const index = this.employeeDetails.findIndex(u => u?._id === _id);
        this.selectedUsers[index] = employee;
        this.selectedUsers = [...this.selectedUsers];
  }

  addEmployeeToSelected(employee: IEmployeeDetails) {
    if (!this.selectedUsers.find(u => u._id === employee._id)) {
      this.selectedUsers = [...this.selectedUsers, employee];
    }
  }
  setEmployees(employees: IEmployeeDetails[]) { // New method to set employee list
    this.employeeDetails = employees;
  }

 

  get getAllEmployees() {
    return this.employeeDetails;
  }

  get getAllEmployeesLocation() {
    return this.employeeDetails.map(e => e.location);
  }
}
