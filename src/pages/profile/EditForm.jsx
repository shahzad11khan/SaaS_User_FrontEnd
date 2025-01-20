import { useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux";
import { editUser } from "../../slices/profileSlice";

export const EditForm = ({setForm , form}) => {
    let [pass , setPass] = useState(false);

    let handleOnChange = (e) => {
        let {name , value} = e.target;
        setForm((preVal) => (
          {...preVal , [name]: value}
        ))
    }   
    let  dispatch =  useDispatch()

    let handleUpdate = async (e) =>{
      e.preventDefault()
      dispatch(editUser(form))

    }

  return (
    <form onSubmit={handleUpdate} className="pt-5 w-full outfit  px-5 text-sm ">
            <div className=" flex flex-col gap-3 w-full justify-center">

              <div  className="w-full flex gap-7">
                <div className="gap-3 w-[50%]"> 
                  <label htmlFor="name" className="flex items-center"><b>Username</b></label>
                  <input onChange={handleOnChange} type="text" name="username" id="name" className="w-full border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.username} required />
                </div>
                <div className=" w-[50%]"> 
                  <label htmlFor="eml" className="flex items-center"><b>Email</b></label>
                  <input onChange={handleOnChange} type="email" name="email" id="eml" className=" w-full border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.email} required />
                </div>
              </div>

              <div className="w-full flex gap-6">
                <div className="relative  w-[50%]"> 
                  <label htmlFor="pass" className="flex items-center"><b>Pasword</b></label>
                  <input onChange={handleOnChange} type={pass?'password':'text'} name="password" id="pass" className="w-full border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.password} required />
                  {/* <p  className="absolute right-3 top-7 cursor-pointer font-semibold" onClick={()=>setPass(!pass)}> {pass?'Show':'Hide'} </p> */}
                </div>
                <div className="relative  w-[50%]"> 
                  <label htmlFor="Cpass" className="flex items-center "><b>Confirm Pasword</b></label>
                  <input onChange={handleOnChange} type={pass?'password':'text'} name="confirmPassword" id="Cpass" className="w-full border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.confirmPassword} required />
                  <p  className="absolute right-3 top-7 cursor-pointer font-semibold" onClick={()=> setPass(!pass)}> {pass?'Show':'Hide'} </p>
                </div>
              </div>

              <div className=' text-center w-[410px]'>
                <button type="submit" className='w-[100px]  bg-[#013D29]  rounded-full text-white outfit  py-[6px]'>update</button>
              </div>

            </div>
         </form> 
  )
}


EditForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  form: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
};
