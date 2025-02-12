import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signUpUser } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import defaultPic  from '../../assets/default user/defaultUser.png';


function SignUp({ setSignUpView, setLoginView }) {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "active",
    dateOfBirth: "",
    role: "user",
    permission: "",
    refreshToken: null,
    userLogo: null, 
  });

  const [previewUrl, setPreviewUrl] = useState(defaultPic);


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Show image preview
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result); 
      };

      if (file) {
        reader.readAsDataURL(file); 
      }

      setForm((prevForm) => ({
        ...prevForm,
        [name]: file, 
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value, 
      }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();  
    if (form.dateOfBirth) {
      let date = new Date(form.dateOfBirth);
      form.dateOfBirth = date.toLocaleDateString("en-GB").replace(/\//g, "-");
    }
    console.log(form)
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });
    dispatch(signUpUser(formData));
  };

  //  Navigate to Login
  const navigateToLogin = () => {
    // if (location.pathname === "/signup") {
    //   navigate("/login");
    // } else {
      setLoginView(true);
      setSignUpView(false);
    // }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick={false} />

      <div className="flex flex-col h-[95vh] justify-center items-center bg-white w-[500px] rounded-lg">
        <h1 className="text-[24px] text-[#DB4444] outfit md:text-[36px] font-bold">Sign Up</h1>

        <form onSubmit={handleSignup} className="w-full px-[40px] ">
            {/* User logo */}
          <div  className="relative flex justify-center">
            <img className="h-[120px] w-[120px] rounded-full object-cover" src={ previewUrl} alt="user" />
            <label
              htmlFor="file-input"
              className="absolute right-[37%] bottom-[2px] hover:bg-[#DB4444] hover:text-white text-[#DB4444] bg-white h-[30px] w-[30px] border rounded-full cursor-pointer flex justify-center items-center"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </label>
            <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleOnChange}
            name="userLogo"
            accept="image/*"
            />
          </div>

          <div className="w-full flex gap-2  ">
            {/* Full Name */}
            <div className="flex gap-1 outfit flex-col mt-4 w-[50%] ">
              <label htmlFor="fullname"><b>Fullname</b></label>
              <input className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
                id="fullname"
                type="text"
                placeholder="fullname"
                onChange={handleOnChange}
                value={form.fullName}
                name="fullName"
                required />
            </div>

            {/* Username */}
            <div className="flex gap-1 outfit flex-col mt-4 w-[50%]">
              <label htmlFor="username"><b>Username</b></label>
              <input className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
                id="username"
                type="text"
                placeholder="username"
                onChange={handleOnChange}
                value={form.username}
                name="username"
                required />
            </div>
          </div>


          <div className="w-full flex gap-2 ">
            {/* Date of Birth */}
            <div className="flex gap-1 flex-col outfit  justify-between mt-4 w-[50%]">
              <label htmlFor="dateOfBirth"><b>Date of Birth</b></label>
              <input className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
                id="dateOfBirth"
                type="date"
                onChange={handleOnChange}
                value={form.dateOfBirth}
                name="dateOfBirth"
                required />
            </div>

            {/* Email */}
            <div className="flex gap-1 outfit flex-col mt-4 w-[50%]">
              <label htmlFor="email"><b>Email</b></label>
              <input className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
                id="email"
                type="email"
                placeholder="email"
                onChange={handleOnChange}
                value={form.email}
                name="email"
                required />
            </div>
          </div>


          <div className="w-full flex gap-2 ">
            {/* Password */}
            <div className="flex gap-1 outfit flex-col mt-4 w-[50%]">
              <label htmlFor="password"><b>Password</b></label>
              <input className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
                id="password"
                type={view ? "text" : "password"}
                placeholder="password"
                onChange={handleOnChange}
                value={form.password}
                name="password"
                required />
            </div>

            {/* Confirm Password */}
            <div className="relative flex gap-1 outfit flex-col mt-4 w-[50%]">
              <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
              <input className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
                id="confirmPassword"
                type={view ? "text" : "password"}
                placeholder="confirm password"
                onChange={handleOnChange}
                value={form.confirmPassword}
                name="confirmPassword"
                required />
              <div onClick={() => setView(!view)} className="cursor-pointer absolute right-[18px] top-[37px]">
                <i className={`${view ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}`}></i>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="mt-4 text-white bg-[black] outfit text-[16px] py-2 px-4 rounded-full">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Navigate to Login */}
        <div className="my-5 outfit">
          <span className="text-12px text-gray-500">Already have an account?</span>
          <span onClick={navigateToLogin} className="ml-2 cursor-pointer underline font-bold">Login</span>
        </div>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  setSignUpView: PropTypes.func,
  setLoginView: PropTypes.func,
};

export default SignUp;
