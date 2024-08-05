import Employee, { IEmployee } from "../models/employee.models";
import {HttpStatusCodes} from "../utils/httpStatusCodes"
interface BaseResponse {
    status: number;
  }
  
  interface SaveEmployeeResponse extends BaseResponse {
    employee?: IEmployee;
  }
  
  interface GetEmployeeResponse extends BaseResponse {
    employees: IEmployee[]; // Always an array, even if it contains only one employee
  }
  
  interface UpdateEmployeeResponse extends BaseResponse {
    employee?: IEmployee;
  }
  
  interface DeleteEmployeeResponse extends BaseResponse {}

function saveEmployee(employee: IEmployee): Promise<SaveEmployeeResponse> {
  return new Promise<SaveEmployeeResponse>((resolve, reject) => {
    Employee.create<IEmployee>(employee)
      .then((employee) => {
        console.log("Employee saved successfully", employee);
        resolve({
          employee: employee,
          status: HttpStatusCodes.CREATED,
        });
      })
      .catch((err) => {
        console.error(err);
        reject(HttpStatusCodes.INTERNAL_SERVER_ERROR); // Only status code is passed in case of an error
      });
  });
}

function getAllEmployees(): Promise<GetEmployeeResponse> {
  return new Promise<GetEmployeeResponse>((resolve, reject) => {
    Employee.find({})
      .then((employees) => {
        resolve({
          employees: employees,
          status: HttpStatusCodes.OK,
        });
      })
      .catch((err) => {
        console.log(err);
        reject(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      });
  });
}

function updateEmployee(
  employeeId: string,
  updatedData: Partial<IEmployee>
): Promise<UpdateEmployeeResponse> {
  return new Promise<UpdateEmployeeResponse>((resolve, reject) => {
    Employee.findOneAndUpdate({ _id: employeeId }, updatedData, { new: true })
      .then((employee) => {
        if (!employee) {
          reject({ status: HttpStatusCodes.NOT_FOUND });
        }
        resolve({
          employee:employee as IEmployee,
          status: HttpStatusCodes.OK,
        });
      })
      .catch((err) => {
        console.log(err);
        reject(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      });
  });
}

function deleteEmployee(employeeId: string): Promise<DeleteEmployeeResponse> {
  return new Promise<DeleteEmployeeResponse>((resolve, reject) => {
    Employee.findByIdAndDelete({ _id: employeeId })
      .then((employee) => {
        if (!employee) {
          resolve({ status: HttpStatusCodes.NOT_FOUND });
        }
        resolve({ status: HttpStatusCodes.OK });
      })
      .catch((err) => {
        console.log(err);
        reject(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      });
  });
}

export default {
  saveEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
