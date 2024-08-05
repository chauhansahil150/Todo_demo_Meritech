import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {message} from "antd"
import { BACKEND_URL, HttpStatusCodes } from '../../utils/config'
import { useStore } from '../../hooks/useStore'


const initialValues = {
  name: 'Vishwas',
  city: '',
  salary:""
}

interface TextErrorProps{
    name:string
}

const  TextError:React.FC<TextErrorProps>=({name})=>{
return(
<div className='error' style={{color:"red"}}>{name}</div>

)
}




const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
})

function EditEmployee () {
    const {rootStore:{employeeDetailsStore}}= useStore()
    
    const onSubmit = async (values:any )=> {
    console.log('Form data', values)
  
    const resp= await fetch(`${BACKEND_URL}/api/employee`,{
      method:"POST",
      headers:{
          "Content-Type":"Application/json"
      },
      body:JSON.stringify(values)
    })
    const data= await resp.json();
  
    if(resp.status==HttpStatusCodes.CREATED){
      employeeDetailsStore.addEmployees(data)
      message.success("Added Successfully")
    }else{
      message.error("Error")
    }
  
  }


  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  console.log('formik.touched', formik.touched)

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='form-control'>
        <label htmlFor='name'>Name</label>
        <input
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
      <div className='form-control'>
        <label htmlFor='salary'>salary</label>
        <input
          type='text'
          id='salary'
          name='salary'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.salary}
        />
        {formik.touched.city && formik.errors.city ? (
          <TextError name={formik.errors.city} />
        ) : null}
      </div>

      <button type='submit'>Submit</button>
    </form>
  )
}

export default EditEmployee