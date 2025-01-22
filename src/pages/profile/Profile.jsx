import { useEffect, useState } from "react"
// import axios  from "axios"
import {useNavigate} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { EditForm } from "./EditForm"
// import { UserDetails } from "./UserDetails"
import { FileUpload } from "./FileUpload"
import {Header} from '../../components/Header'
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../slices/profileSlice"


export const Profile = () => {

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [form , setForm] = useState({
    id:'',
    username: '',
    email: '',
    profileImage: null,
    password: '',
    confirmPassword: ''
  })

  
  let auth = useSelector(state => state.auth);
  let profile = useSelector(state => state.profile)
  let user = profile.user

  let token = auth.token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzNjNzlhZjY3NmQ1ZDkwOTZhM2FhMCIsImVtYWlsIjoiYXMwMzg5ODIyQGdtYWlsLmNvbSIsImlhdCI6MTczNzM3MTM4NSwiZXhwIjoxNzM3NDU3Nzg1fQ.OAx21i3tq3K0hxUlLNgQfyPUe_7mM4VTf1eDqlPwiQQ";


  


  useEffect(()=>{
    if(!token){
        navigate('/home')
    }
  },[token, navigate])

  useEffect(()=>{
    dispatch(getUser(auth.token))
  },[dispatch ,auth.token ])

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
      }));
    }else{
      setForm(prev => ({
        ...prev,
        id:"6773c79af676d5d9096a3aa0",
        username:"Coding Life",
        email: "shahzadkhan311@gmail.com",
        profileImage:{filename: '1737364361190-FB_IMG_1610463405228.jpg', path: 'uploads\\1737364361190-FB_IMG_1610463405228.jpg'},
      }))
    }
  }, [user]);



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
