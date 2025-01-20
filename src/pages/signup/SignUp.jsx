import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signUpUser } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";


 function SignUp(){
    let dispatch = useDispatch();
    let {isAuthenticated, loading, error} = useSelector(state => state.auth)
    const navigate = useNavigate()    
    const [form, setForm] = useState({
        username:'',
        email:'',
        password:''
  })
  useEffect(()=>{
    if(isAuthenticated){
        navigate('/home')
    }
  },[isAuthenticated , navigate])
    const handleOnChange = (e)=>{
        setForm((preValu)=>{
            return{...preValu, [e.target.name] : e.target.value}
        })
    }

    let navigateToLogin = ()=>{
        navigate('/Login')
    }

    const handleSignup = async(e)=>{
        e.preventDefault();
        dispatch(signUpUser(form))
    }


  return (
    <div className="mb-[130px] h-[70vh] flex flex-col justify-center items-center">
        {/* {success? (<p className={`text-center w-[80%] py-1 rounded-full mt-1 text-[14px] bg-[#b8fcbb] pl-2 text-[#014705] font-semibold `}>{success}</p>) : null} */}
        <h1 className="text-[24px] text-[#219653] outfit md:text-[40px] font-bold">Sign Up</h1>
        <form onSubmit={handleSignup} className="w-[300px]" >
            <div className="flex gap-1 outfit flex-col mt-4">
                <label htmlFor="usernames"> <b>Username</b></label>
                <input  className=" border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" id="usernames" type="text" placeholder="username" onChange={handleOnChange} value={form.username} name="username" required />
            </div>
            <div className="flex gap-1 outfit flex-col mt-4" >
                <label htmlFor="emails"><b>Email</b></label>
                <input className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" id="emails" type="email" placeholder="email" onChange={handleOnChange} value={form.email} name="email" required />
                <p className="rounded-lg mt-1 text-[14px] bg-[#fcd2d2] pl-2 text-red font-semibold">{error}</p>
            </div>
            <div className="flex gap-1 outfit flex-col mt-4">
                <label htmlFor="passwords"><b>Password</b></label>
                <input className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" id="passwords" type="Password" placeholder="password" onChange={handleOnChange} value={form.password} name="password" required />
            </div>
            <button type="submit" className="mt-4  text-white bg-[#013D29] outfit py-2 px-4 rounded-full">
            {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
        <div className="my-5 outfit"><span className=" text-12px text-[gray]">Already have  account?</span><span onClick={navigateToLogin} className=" ml-2 cursor-pointer underline font-bold">Login</span></div>
    </div>
  )
}

export default SignUp
