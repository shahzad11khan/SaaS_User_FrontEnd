import {toast} from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import PropTypes from 'prop-types'

export const ResetPassword = ({setReset ,reset}) => {
  let [correct , setCorrect] = useState(false);
  let [pass , setPass] = useState(true)
  let [form ,setForm] = useState({
    email:'',
    password:'',
    confirmPassword:''
  })

  const handleSearch = async(e)=>{
    e.preventDefault()
    try{
    let response = await axios.post('http://localhost:8080/user/searchEmail' ,{form})
    if(response){
      setCorrect(true)
    }
    }catch(err){
      toast.error(`${err.response.data.message}`)
    }
  }

  let handleChange =(e)=>{
    let {value ,name} = e.target;
    setForm((preVal)=>(
      {...preVal, [name]: value}
    ))
  }

  let handleReset = async(e)=>{
    e.preventDefault()
    try{
      let response = await axios.post('http://localhost:8080/user/reset' ,{form})
      toast.success(response.data.message)
      setReset(!reset)
    }catch(err){
      toast.error(`${err.response.data.message}`)
    }
  }

  return (
    <div className=" flex flex-col  items-center justify-center w-full  h-full opacity-100">
      
      
      {!correct?
      // everify email
      <span className='relative text-center border w-[350px] h-[250px] flex flex-col justify-center items-center rounded-lg'>
        <i onClick={()=> setReset(!reset)} className="cursor-pointer absolute left-5 top-5 fa-solid fa-arrow-left"></i>
        <h1 className={`text-[30px] outfit text-[#219653]`}>Verify Email</h1>
      <form onSubmit={handleSearch} className="flex flex-col gap-5 pt-5" >
        <div className="relative flex gap-5 "> 
          <label htmlFor="email" className="flex items-center"><b>Email</b></label>
          <input onChange={handleChange} value={form.email} type='email' name="email" id="Cpass" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"  required />
        </div>
        <div className="flex justify-center">
          <button type='submit' className="bg-[#013D29] w-[130px] rounded-full text-white outfit py-1">Search</button>
        </div>
      </form>
      </span>
      :
      //reset password
      <span className='relative text-center border w-[350px] h-[350px] flex flex-col justify-center gap-5 items-center rounded-lg'>
        <i onClick={()=> setCorrect(!correct)} className="cursor-pointer absolute left-5 top-5 fa-solid fa-arrow-left"></i>
        <h1 className={` text-[30px] outfit text-[#219653]`}>Reset Password</h1>
      <form onSubmit={handleReset}  className='relative flex flex-col gap-5'>
      <div className="relative "> 
        <label htmlFor="pass" className="flex items-center"><b>Pasword</b></label>
        <input onChange={handleChange} type={pass?'password':'text'} name="password" id="pass" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.password} required />
        {/* <p  className="absolute right-3 bottom-2 cursor-pointer font-semibold" onClick={()=>setPass(!pass)}> {pass?'Show':'Hide'} </p> */}
       </div>

       <div className="relative"> 
        <label htmlFor="Cpass" className="flex items-center"><b>Confirm Pasword</b></label>
        <input onChange={handleChange} type={pass?'password':'text'} name="confirmPassword" id="Cpass" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.confirmPassword} required />
        <p  className="absolute right-3 bottom-2 cursor-pointer font-semibold" onClick={()=> setPass(!pass)}> {pass?'Show':'Hide'} </p>
        </div>

        <div className="flex justify-center">
          <button type='submit' className="bg-[#013D29]  w-[130px] rounded-full text-white outfit py-1">Reset</button>
        </div>
      </form>
      </span>
      }

    </div>
  )
}

ResetPassword.propTypes = {
  setReset: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired
}