import { useState , useEffect} from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector} from 'react-redux'
import { emailSearch, previousView , OTPVerify , setNewPassword} from '../../slices/resetPasswordSlice'


export const ResetPassword = ({setReset ,reset}) => {
  let dispatch = useDispatch();
  let {loading , refToken , view} = useSelector(state => state.resetPassword)
  let [pass , setPass] = useState(true)
  let [form ,setForm] = useState({
    email:'',
    token: refToken,
    OTP:'',
    num1:'',
    num2:'',
    num3:'',
    num4:'',
    num5:'',
    newPassword:'',
    confirmPassword:''
  })
  const [error , setError] = useState(null)

  useEffect(()=>{
    if(view>2){
      setReset(!reset)
    }
  },[view , reset , setReset])
  
  let handleChange =(e)=>{
    let {value ,name} = e.target;
    setForm((preVal)=>(
      {...preVal, [name]: value}
    ))
    setError(null)
    console.log(form)
  }

  const handleSearch = async(e)=>{
    e.preventDefault();
    dispatch(emailSearch(form))
  }

  let handleOTP = async(e)=>{
    e.preventDefault()
    let{num1 , num2 , num3 , num4 , num5 } = form;
     setForm((preVal)=>(
      {...preVal , OTP : num1 + num2 + num3 + num4 + num5 }
    )); 
    dispatch(OTPVerify(form))

  }


  let handleReset = async(e)=>{   
     e.preventDefault()
     const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

     if (!regex.test(form.newPassword)) {
       setError("Password must have 1 uppercase, 1 number, 1 special character, and be at least 4 characters long.");
      return
     }
     console.log("hello123")
     console.log(form)
     dispatch(setNewPassword(form))

  }

  return (
    <div className="shadow-gray shadow-2xl flex flex-col  items-center justify-center w-full  h-full opacity-100">
      {view === 0?
      // verify email
      <span className='relative text-center w-[350px] h-[200px] flex flex-col justify-center items-center rounded-lg'>
        <i onClick={()=> setReset(!reset)} className="cursor-pointer absolute left-5 top-5 fa-solid fa-arrow-left"></i>
        <h1 className={`text-[30px] outfit text-[#219653]`}>Verify Email</h1>
      <form onSubmit={handleSearch} className="flex flex-col gap-5 pt-5" >
        <div className="relative flex gap-5 "> 
          <label htmlFor="email" className="flex items-center"><b>Email</b></label>
          <input onChange={handleChange} value={form.email} type='email' name="email" id="Cpass" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"  required />
        </div>
        <div className="flex justify-center">
          <button type='submit' className="bg-[#013D29] w-[130px] rounded-full text-white outfit py-1">{loading?'loading...':'Verify Email'}</button>
        </div>
      </form>
      </span>
      : view === 1?
      //reset password
      <span className={`relative text-center  w-[350px] ${error ?'h-[450px]':'h-[400px]'}  flex flex-col justify-center gap-5 items-center rounded-lg`}>
        <i onClick={()=> dispatch(previousView())} className="cursor-pointer absolute left-5 top-5 fa-solid fa-arrow-left"></i>
        <h1 className={` text-[30px] outfit text-[#219653]`}>Verify OTP</h1>
        <p className={`outfit text-semibold  text-[red] ${error && 'border border-[red]'}   w-[80%] `}>{error}</p>
      <form onSubmit={handleOTP}  className='relative flex flex-col gap-5'>
        <div className='relative'>  
          <span className='flex gap-5 justify-between'>
            <input value={form.num1} onChange={handleChange} name='num1' className='px-2 border w-7 h-10 text-center rounded-lg' maxLength={1} type="text"  required/>          
            <input value={form.mum2} onChange={handleChange} name='num2' className='px-2 border w-7 h-10 text-center rounded-lg' maxLength={1} type="text" required/>
            <input value={form.num3} onChange={handleChange} name='num3' className='px-2 border w-7 h-10 text-center rounded-lg' maxLength={1} type="text" required/>
            <input value={form.num4} onChange={handleChange} name='num4' className='px-2 border w-7 h-10 text-center rounded-lg' maxLength={1} type="text" required/>
            <input value={form.num5} onChange={handleChange} name='num5' className='px-2 border w-7 h-10 text-center rounded-lg' maxLength={1} type="text" required/>
          </span>
        </div>

        <div className="flex justify-center">
          <button type='submit' className="bg-[#013D29]  w-[130px] rounded-full text-white outfit py-1">{loading?'loading...':'Verify OTP'}</button>
        </div>
      </form>
      </span>
      :
      <span className={`relative text-center  w-[350px] ${error ?'h-[450px]':'h-[400px]'}  flex flex-col justify-center gap-5 items-center rounded-lg`}>
      <i onClick={()=> dispatch(previousView())} className="cursor-pointer absolute left-5 top-5 fa-solid fa-arrow-left"></i>
      <h1 className={` text-[30px] outfit text-[#219653]`}>Reset Password</h1>
      <p className={`outfit text-semibold  text-[red] ${error && 'border border-[red]'}   w-[80%] `}>{error}</p>
    <form onSubmit={handleReset}  className='relative flex flex-col gap-5'>
      <div className="relative "> 
        <label htmlFor="pass" className="flex items-center"><b>Pasword</b></label>
        <input onChange={handleChange} type={pass?'password':'text'} name="newPassword" id="pass" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.password} required />
        {/* <p  className="absolute right-3 bottom-2 cursor-pointer font-semibold" onClick={()=>setPass(!pass)}> {pass?'Show':'Hide'} </p> */}
      </div>

      <div className="relative"> 
        <label htmlFor="Cpass" className="flex items-center"><b>Confirm Pasword</b></label>
        <input onChange={handleChange} type={pass?'password':'text'} name="confirmPassword" id="Cpass" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.confirmPassword} required />
        <p  className="absolute right-3 bottom-2 cursor-pointer font-semibold" onClick={()=> setPass(!pass)}> {pass?'Show':'Hide'} </p>
      </div>

      <div className="flex justify-center">
        <button type='submit' className="bg-[#013D29]  w-[130px] rounded-full text-white outfit py-1">{!loading?'reset password':'loading...'}</button>
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