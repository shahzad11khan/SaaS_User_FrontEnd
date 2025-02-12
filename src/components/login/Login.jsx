import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "./ResetPassword";
import { loginUser ,loginWithGoogle , resetError , resetSuccess} from '../../slices/authSlice';
import GoogleLoginButton from "./GoogleLoginButton";
import { toast, ToastContainer } from "react-toastify";

import PropTypes from "prop-types";

function Login({setSignUpView , setLoginView}) {
  let location = useLocation()
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing auth state from Redux
  const { loading, error, isAuthenticated , success} = useSelector((state) => state.auth);
  let [reset, setReset] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleOnChange = (e) => {
    setForm((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value };
    });
  };

  // Handling login with Redux thunk
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('hello')
    dispatch(loginUser(form));
  };

  let navigateToSignup = () => {
    if(location.pathname === "/login"){
      navigate('/signup');
    }else{
      setLoginView(false)
      setSignUpView(true)
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetSuccess());
    }
    
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [success, error, dispatch]); 

  useEffect(()=>{
    if (isAuthenticated) {
      setLoginView(false)    
    }
  },[isAuthenticated ,setLoginView])

  const handleLoginSuccess =(response) => {
    console.log("Login Success:");
    dispatch(loginWithGoogle(response));
  }

  const handleLoginFailure = () => {
    console.log("Login Failed");
  };

  return (
    <div className={`flex flex-col justify-center items-center  h-[100vh]`}>  
    <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
    <div className= " relative w-[400px] h-[75vh] flex flex-col justify-center items-center rounded-xl bg-white">
    {!reset?
      <>
      <h1 className="text-[24px] text-[#DB4444] outfit md:text-[36px] font-bold">Login</h1>
      <form onSubmit={handleLogin} className="w-[300px]">
        <div className="flex gap-1 text-[16px] outfit flex-col mt-4">
          <label htmlFor="emails">
            <b>Email</b>
          </label>
          <input
            id="emails"
            className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
            type="email"
            placeholder="email"
            onChange={handleOnChange}
            value={form.email}
            name="email"
            required
          />
          {/* {error && <p className="rounded-full mt-1 text-[12px]  pl-2 text-[#ff1c1c] font-semibold">{error}</p>} */}
        </div>
        <div className="flex outfit gap-1 flex-col mt-4">
          <label htmlFor="passwords">
            <b>Password</b>
          </label>
          <input
            id="passwords"
            className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
            type="text"
            placeholder="password"
            onChange={handleOnChange}
            value={form.password}
            name="password"
            required
          />
          {/* {error && <p className="rounded-full mt-1 text-[12px] text-[#ff1c1c] pl-2 text-red font-semibold">{error}</p>} */}
        </div>

        {/* {error ? ( */}
        <p onClick={() => setReset(!reset)} className="pt-2 cursor-pointer text-[#DB4444] text-[16px] font-bold h-[40px]">
          Forgot Password
        </p>
        {/* ) : null} */}

        <button type="submit" className=" bg-[black] outfit text-white text-[16px] py-2 px-4 rounded-full">
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <div className="my-5 outfit">
        <span className="text-12px text-[gray]">Don&apos;t have an account?</span>
        <span onClick={navigateToSignup} className="ml-2 cursor-pointer underline font-bold">
          Sign Up
        </span>
      </div>

      <div className="flex flex-col gap-5">
        <GoogleLoginButton
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}>
        </GoogleLoginButton>
      </div>
      </>
      : 
      <div className="absolute z-10   bg-white rounded-lg">
        <ResetPassword reset={reset} setReset={setReset} />
      </div> 
      }
    </div>
    </div>  
  );
}
Login.propTypes = {
  setSignUpView: PropTypes.func,
  setLoginView: PropTypes.func,
}
export default Login;
