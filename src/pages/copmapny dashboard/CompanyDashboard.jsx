import NotificationIcon from '../../assets/icons/Notification.svg';
import { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import Menu from '../../assets/icons/MENU.svg'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies, selectedCompany } from '../../slices/companiesSlice';

export const CompanyDashboard = () => {
    const navigate = useNavigate()
    const{allCompanies} = useSelector(state => state.company)
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    let[navbar , setNavbar] = useState(false);
    let [search , setSearch] = useState('')
    useEffect(()=>{
      let lng = localStorage.getItem('i18nextLng');
        if(lng){
          i18n.changeLanguage(lng);
        }  
      },[i18n])
      const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    useEffect(()=>{
        dispatch(getAllCompanies())
    },[])
    
    let SearchChange = (e) =>{
        setSearch(e.target.value)
    }

    let searchSubmit = (e) =>{
        e.preventDefault();
        console.log(search);
        setSearch('')
    }

    let companyClick = (company)=>{
        console.log(company)
        dispatch(selectedCompany(company))
        navigate('/home')
    }
  return (
    <div className='flex flex-col h-[100vh] items-center bg-black'> 
        {/* upper header  */}
        <div className="h-[44px] w-full bg-black hidden md:flex  justify-between items-center px-6  ">
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
        <div className=" bg-white w-full h-[80px] flex justify-between items-center px-[30px] md:px-[60px]">
            <div className='flex gap-10 items-center md:gap-3'>
                <div onClick={()=> setNavbar(!navbar)} className="cursor-pointer md:hidden" >
                    {navbar? <i className="h-[24px] w-[24px] text-[24px] fa-solid fa-xmark"></i> : <img src={Menu} className="h-[24px] w-[24px] "/>}
                </div>
                <Link to={'/'} className='text-[40px] font-600'>      
                Deelly
                </Link>
            </div>
            <div>
                <div className='flex gap-7 relative px-6'>
                    <form   onSubmit={searchSubmit} >
                        <input  value={search} onChange={SearchChange} placeholder='what are you looking for?' className='bg-[#F5F5F5] outline-none h-[44px] pl-3 w-[300px] rounded-full border border-solid border-[#F5F5F5]' type="text" name="search" id="search" />
                        <button type="submit" className="cursor-pointer relative  top- right-9">
                            <i className=" text-[20px] text-[gray] fa-solid fa-magnifying-glass"></i>            
                        </button>
                    </form>
                </div>
            </div>
        </div>
        {/* conmapnies  */}
        <div className=' flex flex-col gap-5 items-start py-5 justify-start h-full w-[1200px] text-white'>
            <h1 className="text-[30px] outfit" >ALL COMPANIES</h1>
            <div className='flex flex-wrap gap-5 '>
                {allCompanies?.map((el, idx)=>
                    <div onClick={()=> companyClick(el)} className=' cursor-pointer flex flex-col items-center justify-center  py-3 bg-[#3b3b3b] rounded-lg w-[200px] h-[200px] ' key={idx}>
                        <img className='h-[120px] w-[120px] rounded-full' src={el.companyLogo} alt="comapnylogo" />
                        <p><span>Company :</span><span className='pl-2'>{el.companyName}</span></p>
                        <p><span>Business :</span><span className='pl-2'>{el.businessType}</span></p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
