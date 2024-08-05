import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { MdEdit } from "react-icons/md";
import {IEmployeeDetails} from "../../store/EmployeeDetails"
import {useFormik} from "formik"
import { BACKEND_URL, HttpStatusCodes } from '../../utils/config';
import * as Yup from "yup"
import { useStore } from '../../hooks/useStore';
import {message} from "antd"


interface TextErrorProps{
  name:string
}
const TextError:React.FC<TextErrorProps>=({name})=>{
  return(
    <div className='error' style={{color:"red"}}>{name}</div>
  )
}

interface EmployeeModalProps{
   employee:IEmployeeDetails
}
const EmployeeModal: React.FC<EmployeeModalProps> = ({employee}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [employee,setEmployee]=useState<Partial<IEmployeeDetails>>({})

  const initialValues = {
    name: "",
    city: "",
    salary:""
  }

  useEffect(()=>{
    initialValues.name=employee.name
    initialValues.city=employee.city
    initialValues.salary=employee.salary
  },[isModalOpen])

  const {rootStore:{employeeDetailsStore}}=useStore();


  console.log('first',employee)

 

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    salary: Yup.string().required('Required'),
  })
  

  const onSubmit = async (values:any )=> {
    employeeDetailsStore.setLoading(true)
    console.log('Form data', values)
  
    const resp= await fetch(`${BACKEND_URL}/api/employee?_id=${employee?._id}`,{
      method:"PUT",
      headers:{
          "Content-Type":"Application/json"
      },
      body:JSON.stringify(values)
    })  
    if(resp.status==HttpStatusCodes.OK){
      const data:IEmployeeDetails= await resp.json();
      employeeDetailsStore.updateEmployee(data._id,data)
      message.success("Edited Successfully")
    }else{
      message.error("Error")
    }
    setIsModalOpen(false);
  
  }

  useEffect(() => {
    formik.setValues({
        ...formik.values,
        name:  employee?.name || "",
        city: employee.city || "",
        salary: employee.salary || ""
    });
}, [isModalOpen]);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button  onClick={showModal}>
       <MdEdit />
      </Button>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <form onSubmit={formik.handleSubmit}
      className='flex flex-col gap-3'
      >
      <div className='form-control '>
        <label htmlFor='name' >Name</label>
        <input
        className='border-gray-950 border'
          type='text'
          id='name'
          name='name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <TextError name={formik.errors.name}/>
        ) : null}
      </div>

      <div className='form-control'>
        <label htmlFor='city'>city</label>
        <input
        className='border-gray-950 border'
          type='text'
          id='city'
          name='city'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city ? (
          <TextError name={formik.errors.city} />
        ) : null}
      </div>

      <div className='form-control grid-cols-12'>
        <label htmlFor='salary' className='col-span-4'>Salary</label>
        <input
        className='border-gray-950 border col-span-8'
          type='text'
          id='salary'
          name='salary'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.salary}
        />
        {formik.touched.salary && formik.errors.salary ? (
          <TextError name={formik.errors.salary} />
        ) : null}
      </div>

      <button className='w-full h-fit p-2 rounded-full text-white bg-blue-700' type='submit'>Submit</button>
    </form>
      </Modal>
    </>
  );
};

export default EmployeeModal;