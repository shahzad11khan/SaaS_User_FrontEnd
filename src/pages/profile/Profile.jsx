import { useEffect, useState } from "react"
// import axios  from "axios"
import {useNavigate} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { EditForm } from "./EditForm"
// import { UserDetails } from "./UserDetails"
import { FileUpload } from "./FileUpload"
import {Header} from '../../components/Header'
import {useSelector } from "react-redux"
import {jwtDecode} from "jwt-decode"


export const Profile = () => {

  let navigate = useNavigate();
  let [form , setForm] = useState({
    id:'',
    username: '',
    email: '',
    profileImage: null,
    password: '',
    confirmPassword: ''
  })

  let auth = useSelector(state => state.auth);
  let token = auth.token ;

  useEffect(()=>{
    if(!token){
        navigate('/home')
    }
  },[token, navigate])


  useEffect(() => {
    if(token){
      let {role, userEmail, userId, userImage ,userName} = jwtDecode(token)
      setForm(prev => ({
        ...prev,
        role,
        id: userId,
        username: userName,
        email: userEmail,
        profileImage: userImage
      })
    );
    }
  }, [token]);



  return (
    <>
    <Header />
    <div className="    flex justify-center  pt-[35px]  bg-[#8bfabb] h-[570px]">
      <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
      <div className=" bg-white relative w-[450px] h-[500px] flex flex-col justify-between pb-5  rounded-lg  overflow-hidden ">
      <div>
      <div className="px-5 flex justify-between items-end  outfit ">
          <h1 className="text-[40px] ">Profile</h1>
          <div className="flex gap-10">
          </div>
        </div>
        <div className="flex justify-center pt-5">  
          <FileUpload className   form={form}  token={token}   />
        </div>
      </div>
        <EditForm setForm={setForm}  form={form}  /> 
      </div>
    </div>  
    </>
  )
}
