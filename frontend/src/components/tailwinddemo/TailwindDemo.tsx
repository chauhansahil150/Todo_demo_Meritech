import React from 'react'
import Button from './Button'
import Input from './Input'

function TailwindDemo() {
  return (
    <div>
        <Button 
        onClick={()=>alert("added successfully")
        }
        isfullround={true}
        >Add</Button>
        <Button
        className='bg-green-600 hover:bg-green-800'
        >Update</Button>
        <Button
        className='bg-red-600 hover:bg-red-800'
        >Delete</Button>
        <Input type='text' />
    </div>
  )
}

export default TailwindDemo