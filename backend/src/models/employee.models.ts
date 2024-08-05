import { Schema, model, Document } from "mongoose";
export interface Location{
    lat:number,
    lon:number,
    display_name:string
}
export interface IEmployee extends Document {
    name: string;
    city: string;
    salary:string;
    location: Location
}


const EmployeeSchema = new Schema<IEmployee>({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    salary:{
        type:String,
        required:true
    },
    location: {
        // type: {
        //     type: String,
        //     enum: ["Point"], // Specify the type as Point
        //     required: true
        // },
        lat: {
            type: Number, // Latitude
            required: true
        },
        lon: {
            type: Number, // Longitude
            required: true
        },
        display_name:{
            type:String
        }
    }
}, { timestamps: true });

// Index for geoSpatial queries
// EmployeeSchema.index({ "location": "2dsphere" });

const Employee = model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
