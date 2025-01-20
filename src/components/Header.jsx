
import NotificationIcon from '../assets/icons/Notification.svg';
import Logo from '../assets/icons/Deelly Logo.svg';
import VectorIcon from '../assets/icons/Vector.svg';
import GroupIcon from '../assets/icons/Group 1000001661.svg';
// import BuyIcon from '../assets/icons/Buy.svg';
import Heart from '../assets/Card/Heart.svg'
import ProfileIcon from '../assets/icons/Profile.svg';
import {  useState } from 'react';

import Dining from '../assets/navIcons/Dinning.svg'
import Entertain from '../assets/navIcons/Entetainment.svg'
import Group from '../assets/navIcons/Group 1000004755.svg'
import Home from '../assets/navIcons/Home.svg'
import Salon from '../assets/navIcons/Salon.svg'
import Menu from '../assets/icons/MENU.svg'

import { Link, useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
// configure react with i18n 
import { useTranslation } from 'react-i18next';
import { logout } from '../slices/authSlice';


export const Header = () => {
  // destruct hook 
  let navigate= useNavigate()
  let dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  let favorite = useSelector(state => state.favorite);
  let cart = useSelector(state => state.cart);
  
  let[navbar , setNavbar] = useState(false);
  let [profile , setProfile] = useState(false);
  let [search , setSearch] = useState('')
  let navArr = [[Home,t('header.bottom.1'),'/home'],[Dining,t('header.bottom.2'),'/dinning'],[Salon,t('header.bottom.3'),'/salon'],[Group,t('header.bottom.4'),'/entertainment'],[Entertain,t('header.bottom.5') ,'/home services'],]
  let token = useSelector(state => state.auth.token)
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
    dispatch(logout());
    navigate('/');
    setProfile(!profile);
  }
  return (
    < div className=''>
    {/* upper header  */}
    <div className="h-[44px] bg-[#013D29] hidden md:flex justify-between items-center px-6  ">
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
  <div className="h-[80px] flex justify-between items-center px-[30px] md:px-[60px]">
    <div className='flex gap-10 items-center md:gap-3'>
      <div onClick={()=> setNavbar(!navbar)} className="cursor-pointer md:hidden" >
        {navbar? <i className="h-[24px] w-[24px] text-[24px] fa-solid fa-xmark"></i> : <img src={Menu} className="h-[24px] w-[24px] "/>}
      </div>
      <img src={Logo} alt="logo" />
      <select className='cursor-pointer h-[40px] outfit  px-5 border border-[#219653] rounded-full hidden md:flex ' name="country" id="country">
        <option value=""> {t('header.middle.select.pak')}</option>
        <option value="">{t('header.middle.select.cad')}</option>
        <option value="uk">{t('header.middle.select.uk')}</option>
      </select>
    </div>
    <div>
      <div className='flex  gap-7 relative px-6  '>
        <div className=' gap-3 hidden md:flex '>
          <form  onSubmit={searchSubmit} >
            <button type="submit" className="cursor-pointer absolute top-3 left-8">
              <img src={VectorIcon} alt="search" />
            </button>
            <input  value={search} onChange={SearchChange} className=' outline-none h-[44px]  px-9 rounded-full border border-solid border-grey' type="text" name="search" id="search" />
          </form>
          <img src={GroupIcon} alt="group" />
        </div>
        <div className=' flex  gap-2 h-[40px] pl-3'>
            <Link to={'/favorite'} className='cursor-pointer relative w-[40px] rounded-full h-[40px] bg-[#E9E9E9] flex justify-center items-center'>
                <img className='  w-[20px] h-[20px]  ' src={Heart} alt="buy" />
                <div className=' absolute top-[-5px] right-[-5px] rounded-full bg-[#fcefc0] w-5 h-5 outfit flex justify-center items-center'> {favorite.count}</div>
            </Link>
            <Link to={'/cart'} className='cursor-pointer relative w-[40px] rounded-full h-[40px] bg-[#E9E9E9] flex justify-center items-center'>
            <i className=" text-[20px] fa-solid fa-basket-shopping"></i>
            <div className=' absolute top-[-5px] right-[-5px] rounded-full bg-[#fcefc0] w-5 h-5 outfit flex justify-center items-center'>{cart.count}</div>
            </Link>

            <span onClick={()=> setProfile(!profile)} className='cursor-pointer w-[40px] rounded-full h-[40px] bg-[#E9E9E9]  items-center hidden md:flex  justify-center'>
                <img src={ProfileIcon} alt="profile" />
            </span>

            {profile? 
            <div className='z-50 absolute top-14 rounded-lg right-0  py-4 bg-white border'>
              {token?  
                <span>
                  <Link className='py-2 w-[200px] pl-4 flex gap-2 text-[14px] hover:bg-[#E9FBF2] items-center' to={'/profile'}><img className='text-[10px] ' src={ProfileIcon} alt="" />User Profile</Link> 
                  <p onClick={handleLogout} className='cursor-pointer py-2 w-[200px] pl-4 flex gap-2 text-[14px] hover:bg-[#E9FBF2] items-center' to={'/profile'}><img className='text-[10px] ' src={ProfileIcon} alt="" />LogOut</p>  
                </span>
                :
                <span>
                  <Link onClick={()=> setProfile(!profile)} className=' py-2 w-[200px] pl-4 flex gap-2 text-[14px] hover:bg-[#E9FBF2] items-center' to={'/login'} ><img className=' text-[10px]' src={ProfileIcon} alt="" />Login</Link>
                  <Link onClick={()=> setProfile(!profile)} className='py-2 w-[200px] pl-4 flex gap-2 text-[14px] hover:bg-[#E9FBF2] items-center' to={'/signup'}  ><img className='text-[10px] 'src={ProfileIcon} alt="" />Sign Up</Link>
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
  <div className='  gap-20 h-[60px] pl-[60px] px-6 hidden md:flex '>

    {navArr.map((el,idx) =>(
      <div className='flex ' key={idx}>
          <Link to={el[2]} className='cursor-pointer flex items-center gap-2 outfit text-[14px]'><img className='h-[20px] ' src={el[0]} alt="" />{el[1]}</Link>
      </div>
    ))}
  </div>
    </div>
  )
}
