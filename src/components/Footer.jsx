import Logo from '../assets/icons/Group 1000004714 (1).svg'
import Visa from '../assets/creditCard/Visa.png'
import Mastercard from '../assets/creditCard/Mastercard.png'
import Paypal from '../assets/creditCard/Paypal.png'
import Pay from '../assets/creditCard/ Pay.png'
import { useTranslation } from 'react-i18next'


export default function Footer(){
    let {t} = useTranslation()
    let icons = [['#1DA1F2','fa-brands fa-twitter'], ['#1877F2', 'fa-brands fa-facebook'], ['#F00073','fa-brands fa-instagram']];
    let list1 =t('footer.top.oCompany.list',{returnObjects:true});
    let payment =[Visa , Mastercard , Paypal , Pay ];
    return( 
    
        <div className="bg-black text-white ">
            <div className=" px-5 flex  justify-center py-10 md:py-20">
                <div className='flex flex-col md:flex-row gap-10 justify-between w-[1200px]'>
                    <div className=' w-[60px] h-[60px]' ><img className='h-full w-full' src={Logo} alt="logo" /></div>
                    
                    <div className='flex  '>
                    <div className='' >
                        <h1 className=' text-[18px] oufit font-semibold'>{t('footer.top.tDeal.heading')}</h1>
                        <p className='pt-3 text-[14px] opacity-50 w-[300px]'>{t('footer.top.tDeal.paragraph')}</p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-[18px] oufit font-semibold'>{t('footer.top.oCompany.heading')}</h1>
                        <ul className='pt-3 flex flex-col gap-2'>
                            {list1.map((el,idx) =>(
                                <li className='text-[14px] opacity-50 w-[300px]' key={idx}>{el}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-[18px] oufit font-semibold'>{t('footer.top.payment')}</h1>
                            <div className='flex gap-2 pt-3'>
                                {payment.map((el,idx) =>(
                                    <div className='border  bg-white rounded-lg py-2 px-1' key={idx}>
                                        <img className='h-[16px] w-[50px] object-contain' src={el} alt="payment" />
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
                </div>


                <hr className="mb-8  md:my-8  mx-4 text-center w-[95%] md:mx-auto  "/>
                <div className="pb-8 md:ml-12  w-[90%] md:w-[85%] ">
                    <div className="md:flex md:justify-between text-center w-full">
                        <p>{t('footer.bottom')}</p>
                        <div className="flex justify-center  items-center gap-4 mt-4 md:mt-auto ">
                            {icons.map((icons , index) =>
                            <div className=' flex justify-center items-center rounded-xl w-[32px] h-[32px]' style={{backgroundColor: icons[0]}}  key={index}> 
                                <i  className={`w-[16px] h-[16px] text-[white] ${icons[1]}`}></i>
                            </div>
                            )}
                        </div>
                    </div> 
                </div> 
        </div>
    )
}