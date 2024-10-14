import React, { useState } from 'react'
import './style.css'
import * as yup from 'yup'



function FormPage() {

  const [data,setData] = useState([])

    const [formdata,setFormdata] = useState({
    firstname: '', lastname:'', email:'', qualification:''
})

    const changeHandler = (e) => {
        setFormdata({...formdata, [e.target.name]: e.target.value})
    }

    const [errors, setErrors] = useState(false);


    const validationSchema = yup.object({
      firstname: yup.string().required("First Name is required"),
      lastname: yup.string().required("Last Name is required"),
      email: yup.string()
            .required("Email is Required")
            .email("Invalid Email"),
      qualification: yup.string().required("Qualification is requited")
    })




    let {firstname,lastname,email,qualification} = formdata
    const handleForm = async (e) => {
        e.preventDefault();
        try{
            await validationSchema.validate(formdata, {abortEarly: false})
              setData([...data, {firstname, lastname, email, qualification}])
              setFormdata({firstname: '', lastname:'', email:'', qualification:''})
            
        } catch (error) {
          const newError = {}
          

          error.inner.forEach((err) => {
            newError[err.path] = err.message;
          });


          setErrors(newError)
          // alert("Enter Properly",newError)
        }        
      }

      const [view,setView] = useState(false)
      const viewHandler = () => {
        setView(true)
      }
    

  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center'}}>
    <div className='container'>
      <form onSubmit={handleForm}>
        <div className='form-group'>
            <label>FirstName:</label>
            <input 
                type='text' 
                name='firstname'
                autoComplete='off'
                value={formdata.firstname}
                onChange={changeHandler}
                />
                {errors.firstname && <div className='error'>{errors.firstname}</div>}
        </div>
        <div className='form-group'>
            <label>LastName:</label>
            <input 
                type='text' 
                name='lastname'
                autoComplete='off'
                value={formdata.lastname}
                onChange={changeHandler}
            />
            {errors.lastname && <div className='error'>{errors.lastname}</div>}
        </div>
        <div className='form-group'>
            <label>Mail-ID:</label>
            <input 
                type='email' 
                name='email'
                autoComplete='off'
                value={formdata.email}
                onChange={changeHandler}
                />
                {errors.email && <div className='error'>{errors.email}</div>}
        </div>
        <div className='form-group'>
            <label>Highest Qualification:</label>
            <input 
                type='text' 
                name='qualification'
                autoComplete='off'
                value={formdata.qualification}
                onChange={changeHandler}
                />
                {errors.qualification && <div className='error'>{errors.qualification}</div>}
        </div>
        <div style={{display:'flex', width:'auto', justifyContent:'space-around', marginTop:'10px' }}>
          <button className='btn'>Submit</button>
          <button className='btn' onClick={viewHandler} onDoubleClick={(e) => {setView(false)}} >View Data</button>
        </div>
      </form>
    </div>

{view && 
  <div style={{marginTop:'40px'}}> 
    <table border={1} cellPadding={10} >
      <tr>
        <td>FirstName</td>
        <td>LastName</td>
        <td>Email-ID</td>
        <td>Qualification</td>
      </tr>

      {
        data.map((fdata,ind) => {
          return(
            <tr key={ind}>
              <td>{fdata.firstname}</td>
              <td>{fdata.lastname}</td>
              <td>{fdata.email}</td>
              <td>{fdata.qualification}</td>
            </tr>
          )
        })
      }
    </table>
  </div>}
  </div>
  )
}

export default FormPage
