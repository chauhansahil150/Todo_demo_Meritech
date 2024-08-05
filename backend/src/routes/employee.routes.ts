import express from "express"
import { saveEmployee,getAllEmployees,updateEmployee,deleteEmployee } from "../controllers/employee.controllers"
const router= express.Router()

router.get("/all",getAllEmployees)

router.route("/")
.post(saveEmployee)
.put(updateEmployee)
.delete(deleteEmployee)


export default router