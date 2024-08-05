import employeeDB from "../services/employee.db"
import {Request,Response} from "express"
import {IEmployee} from "../models/employee.models"
import {HttpStatusCodes} from "../utils/httpStatusCodes"
import { getLatLog } from "../utils/helper";

export async function saveEmployee(req:Request,res:Response){
   try {
    console.log(req.body)
    const user:IEmployee=req.body;
    const loc=await getLatLog(req.body.city)
    user.location={
        lat:loc.lat,
        lon:loc.lon,
        display_name:loc.display_name
    }
    const resp=await employeeDB.saveEmployee(user)
    if(resp?.status==HttpStatusCodes.CREATED){
        const employee= resp.employee ?? {}
        res.status(HttpStatusCodes.CREATED).json(employee);
    }
   } catch (error) {
    console.log(error)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
   }
}

export async function getAllEmployees(req:Request,res:Response) {
    try {
        const resp=await employeeDB.getAllEmployees();
        if(resp?.status==HttpStatusCodes.OK){
            const employees=resp.employees ?? [];
            console.log(employees)
            res.status(HttpStatusCodes.OK).json(employees)
        }
    } catch (error) {
        console.log(error)
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end()
    }
    
}

export async function updateEmployee(req:Request,res:Response) {
    try {
        // const employeeId:string=req.query.employeeId || "";  =>Type 'string | ParsedQs | string[] | ParsedQs[]' is not assignable to type 'string'.
        const employeeId:string=req.query._id as string || ""
        //By using as string, you're asserting to TypeScript that req.query.employeeId should be treated as a string. If it's not a string, TypeScript will handle it as such, ensuring type safety
        const updatedData:Partial<IEmployee>=req.body;
        const loc=await getLatLog(req?.body?.city)
        updatedData.location={
            lat:loc.lat,
            lon:loc.lon,
            display_name:loc.display_name
        }
        const resp=await employeeDB.updateEmployee(employeeId,updatedData)
        if(resp?.status==HttpStatusCodes.OK){
            res.status(HttpStatusCodes.OK).json(resp.employee);
        }
        else if(resp?.status==HttpStatusCodes.NOT_FOUND){
            res.status(HttpStatusCodes.NOT_FOUND).end();
        }
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
    }
}

export async function deleteEmployee(req:Request,res:Response) {
    try {
        const employeeId:string = req.query._id as string || ""
        console.log(typeof employeeId)
        const resp= await employeeDB.deleteEmployee(employeeId)
        
        if(resp?.status==HttpStatusCodes.OK){
            res.status(HttpStatusCodes.OK).end();
        }
        else if(resp?.status==HttpStatusCodes.NOT_FOUND){
            res.status(HttpStatusCodes.NOT_FOUND).end();
        }
    } catch (error) {
        console.log(error)
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end()
    }
}