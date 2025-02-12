
import NotificationIcon from '../assets/icons/Notification.svg';
// import Logo from '../assets/icons/Deelly Logo.svg';
// import VectorIcon from '../assets/icons/Vector.svg';
// import GroupIcon from '../assets/icons/Group 1000001661.svg';
// import BuyIcon from '../assets/icons/Buy.svg';
import Heart from '../assets/Card/Heart.svg'
import ProfileIcon from '../assets/icons/Profile.svg';
import {  useEffect, useState } from 'react';

// import Dining from '../assets/navIcons/Dinning.svg'
// import Entertain from '../assets/navIcons/Entetainment.svg'
// import Group from '../assets/navIcons/Group 1000004755.svg'
// import Home from '../assets/navIcons/Home.svg'
// import Salon from '../assets/navIcons/Salon.svg'
import Menu from '../assets/icons/MENU.svg'

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
// configure react with i18n 
import { useTranslation } from 'react-i18next';
import { logout } from '../slices/authSlice';

import Login from './login/Login'
import SignUp from './signup/SignUp'
import { googleLogout } from "@react-oauth/google"


export const Header = () => {
  let {category} = useParams()
  let [categories , setCategories] =useState(null)
  let navigate= useNavigate()
  let dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  let favorite = useSelector(state => state.favorite);
  let cart = useSelector(state => state.cart);
  const {products}  = useSelector(state => state.product);

  useEffect(() => {
    // Extract unique categories from `products`
    const uniqueCategories = [...new Set(products?.map((el) => el.productCategory))];
    setCategories(uniqueCategories);
  }, [products]);
  
  let[navbar , setNavbar] = useState(false);
  let [profile , setProfile] = useState(false);
  let [search , setSearch] = useState('')
  // let navArr = [[Home,t('header.bottom.1'),'/home'],[Dining,t('header.bottom.2'),'/dinning'],[Salon,t('header.bottom.3'),'/salon'],[Group,t('header.bottom.4'),'/entertainment'],[Entertain,t('header.bottom.5') ,'/home services'],]
  let token = useSelector(state => state.auth.token)     ;


  let [loginView , setLoginView] = useState(false)
  let [signUpView , setSignUpView] = useState(false)

useEffect(()=>{
  let lng = localStorage.getItem('i18nextLng');
    if(lng){
      i18n.changeLanguage(lng);
    }  
  },[i18n])
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  let SearchChange = (e) =>{
    setSearch(e.target.value)
  }

  let searchSubmit = (e) =>{
    e.preventDefault();
    console.log(search);
    setSearch('')
  }

  let handleLogout = ()=>{
    localStorage.removeItem('appState')
    googleLogout()
    dispatch(logout());
    navigate('/');
    setProfile(!profile);
  }

  let handleLoginPreview = ()=> {
    setProfile(!profile)
    setLoginView(true)
  }

  let handleSignupPreview = ()=> {
    setProfile(!profile)
    setSignUpView(true)
  }

  return (
    <>
    < div className='fixed z-50 bg-white w-full'>
    {/* upper header  */}
    <div className="h-[44px] bg-black hidden md:flex justify-between items-center px-6  ">
    <div className="flex gap-3 ">
      <img src={NotificationIcon} alt="icon" />
      <p className="text-[14px] text-white outfit">
        {/* to view data  of specific translation*/}
      {t('header.top.p')}
      </p>
    </div>
    <div className="flex gap-5">
      <p className="text-[#669082] outfit">{t('header.top.sLanguage')}:</p>
      <div className="flex gap-3">
        <p onClick={() => changeLanguage('en')} className={`cursor-pointer  outfit ${i18n.language === 'en'?'text-white' : 'text-[#669082]'}`}>English</p>
        <span className="h-5 w-[1px] bg-[#669082]"></span>
        <p onClick={() => changeLanguage('sp')} className={`cursor-pointer  outfit ${i18n.language === 'sp'?'text-white' : 'text-[#669082]'}`}>Spanish</p>
      </div>
    </div>
  </div>
    
    {/* middle header */}
  <div className=" h-[80px] flex justify-between items-center px-[30px] md:px-[60px]">
    <div className='flex gap-10 items-center md:gap-3'>
      <div onClick={()=> setNavbar(!navbar)} className="cursor-pointer md:hidden" >
        {navbar? <i className="h-[24px] w-[24px] text-[24px] fa-solid fa-xmark"></i> : <img src={Menu} className="h-[24px] w-[24px] "/>}
      </div>
      <Link to={'/'} className='text-[40px] font-600'>      
      Deelly
        {/* <img src={Logo} alt="logo" /> */}
      </Link>
      {/* <select className='cursor-pointer h-[40px] outfit  px-5 border border-[#219653] rounded-full hidden md:flex ' name="country" id="country">
        <option value=""> {t('header.middle.select.pak')}</option>
        <option value="">{t('header.middle.select.cad')}</option>
        <option value="uk">{t('header.middle.select.uk')}</option>
      </select> */}
    </div>
    <div>
      <div className='flex gap-7 relative px-6'>
        <div className='gap-3 hidden md:flex'>
          <form   onSubmit={searchSubmit} >
            <input  value={search} onChange={SearchChange} placeholder='what are you looking for?' className='bg-[#F5F5F5] outline-none h-[44px]  pl-3 w-[300px] rounded-full border border-solid border-[#F5F5F5]' type="text" name="search" id="search" />
            <button type="submit" className="cursor-pointer relative  top- right-9">
            <i className=" text-[20px] text-[gray] fa-solid fa-magnifying-glass"></i>            
            </button>
          </form>
          {/* <img src={GroupIcon} alt="group" /> */}
        </div>
        <div className=' flex  gap-2 h-[40px] pl-3'>
          {/* favorite & cart  icons */}
          {token?
          <>
            <Link to="/favorite" className='cursor-pointer relative w-[40px] bg-[#F5F5F5] rounded-full h-[40px]  flex justify-center items-center'>
              <img className='  w-[20px] h-[20px]  ' src={Heart} alt="buy" />
              <div className=' absolute top-[-5px] right-[-5px] rounded-full text-white text-[12px] bg-[#DB4444] w-5 h-5 outfit flex justify-center items-center'> {favorite.count}</div>
            </Link>
            <Link to={'/cart'} className='cursor-pointer relative w-[40px] rounded-full h-[40px] bg-[#F5F5F5] flex justify-center items-center'>
              <i className=" text-[20px] fa-solid fa-basket-shopping"></i>
            <div className=' absolute top-[-5px] right-[-5px] rounded-full text-white text-[12px]  bg-[#DB4444] w-5 h-5 outfit flex justify-center items-center'>{cart.count}</div>
            </Link>
          </>
          :
          <>
            <div onClick={() => setLoginView(true)}  className='cursor-pointer relative w-[40px] rounded-full h-[40px] bg-[#F5F5F5] flex justify-center items-center'>
              <img className='  w-[20px] h-[20px]  ' src={Heart} alt="buy" />
              <div className=' absolute top-[-5px] right-[-5px] rounded-full bg-[#DB4444] text-[12px] text-white w-5 h-5 outfit flex justify-center items-center'> {favorite.count}</div>
            </div>
            <div onClick={() => setLoginView(true)} className='cursor-pointer relative w-[40px] rounded-full h-[40px] bg-[#F5F5F5] flex justify-center items-center'>
              <i className=" text-[20px] fa-solid fa-basket-shopping"></i>
            <div className=' absolute top-[-5px] right-[-5px] rounded-full ] bg-[#DB4444] text-[12px]  text-[white] w-5 h-5 outfit flex justify-center items-center'>{cart.count}</div>
            </div>
          </>
          } 
          
            <span onClick={()=> setProfile(!profile)} className='cursor-pointer w-[40px] rounded-full h-[40px] bg-[#F5F5F5]  items-center hidden md:flex  justify-center'>
                <img src={ProfileIcon} alt="profile" />
            </span>
            {/* login signup and profile log oout  routes button*/}
            {profile? 
            <div className='z-50 absolute top-14 rounded-lg right-0  py-4 bg-white border'>
              {token?  
                <span>
                  <Link className='py-2 w-[200px] pl-4 flex gap-2 text-[14px] hover:bg-[#E9FBF2] items-center' to={'/profile'}><img className='text-[10px] ' src={ProfileIcon} alt="" />User Profile</Link> 
                  <p onClick={handleLogout} className='cursor-pointer py-2 w-[200px] pl-4 flex gap-2 text-[14px] hover:bg-[#E9FBF2] items-center' to={'/profile'}><img className='text-[10px] ' src={ProfileIcon} alt="" />LogOut</p>  
                </span>
                :
                <span>
                  <p  onClick={handleLoginPreview} className='cursor-pointer py-2 w-[200px] pl-4 flex gap-2 text-[14px] hover:bg-[#E9FBF2] items-center'  ><img className=' text-[10px]' src={ProfileIcon} alt="" />Login</p>
                  <p onClick={handleSignupPreview} className='cursor-pointer py-2 w-[200px] pl-4 flex gap-2 text-[14px] hover:bg-[#E9FBF2] items-center'  ><img className='text-[10px] 'src={ProfileIcon} alt="" />Sign Up</p>
                </span>
              }
            </div>
            :null}
        </div>
      </div>
    </div>
  </div>
  <div  className='bg-[#EDEDED] h-[1px]'><br /></div>
  
  {/* bottom header */}
  <div className='    gap-20 h-[60px] pl-[60px] px-6 hidden md:flex '>
  {categories?.map((el,idx) =>(
    <div className={`flex ${category && category === el && 'underline underline-offset-8 font-bold decoration-[3px]'}`} key={idx}>
        <Link to={`/${el}`} className={`  cursor-pointer flex items-center gap-2 outfit text-[18px]   `}>{el.toUpperCase()}</Link>
    </div>
  ))}
  </div>


  </div>
  {loginView ?
    <div className=' fixed  top-0 left-0 flex  items-center justify-center  z-50  bg-[black] w-full h-full  bg-opacity-35 '>     
      <Login setSignUpView={setSignUpView}  setLoginView={setLoginView} />        
      <i onClick={() => setLoginView(false)} className="relative right-[3%] top-[-33%] cursor-pointer fa-solid fa-xmark  text-[24px]"></i>
    </div>
    : null}

      {signUpView ?
    <div className=' fixed top-0 left-0 flex  items-center justify-center  z-50  bg-black w-full h-full  bg-opacity-35 '>
        <SignUp  setSignUpView={setSignUpView}  setLoginView={setLoginView} />
        <i onClick={() => setSignUpView(false)} className="relative right-[3%] top-[-43%] cursor-pointer fa-solid fa-xmark  text-[24px]"></i>
    </div>
    : null}
  </>
  )
}
