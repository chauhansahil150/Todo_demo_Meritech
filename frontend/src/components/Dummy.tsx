import React from 'react'
import { useStore } from '../hooks/useStore'
import {message} from "antd"
import { BACKEND_URL, HttpStatusCodes } from '../utils/config'

const Dummy:React.FC<any> = ({u}) => {
const {rootStore:{employeeDetailsStore}}= useStore()


    async function onClickDelete(id: string) {
        const resp=await fetch(`${BACKEND_URL}/api/employee?_id=${id}`,{
        method:"delete"
      })
      if(resp.status==HttpStatusCodes.OK){
       employeeDetailsStore.deleteEmployee(id)
        message.success("Successfully Deleted")
      }else{
        message.error("error")
      }
        // employeeDetailsStore.deleteEmployee(id)
    }
  return (
    <div key={u._id}>
                    <span> id: {u._id} </span>
                    <span> userName: {u.name}</span>
                    <span> city: {u.city}</span>
                    <button
                        onClick={() => {
                            onClickDelete(u._id)
                        }}
                    >
                        X
                    </button>
                </div>
  )
}

export default Dummy