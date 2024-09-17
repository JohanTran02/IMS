import React from 'react'
import Sidebar from '../components/Sidebar.tsx'
import Editpage from '../components/Editpage.tsx'
import Form from '../components/Formpage.tsx'
import FormPicker from '../components/FormPicker.tsx'

const EditManufacturer = () => {
  return (
    
      <div className=' flex m-4 gap-4'>
      <Sidebar/>
      <div className='flex flex-col gap-4'>
      <Editpage/>
      <FormPicker/>
      <Form/>

      </div>

      </div>
    
  )
}

export default EditManufacturer
