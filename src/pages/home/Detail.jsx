import Dinning from '../../assets/Hero/Dinning 1.svg'
import Salon from '../../assets/Hero/image 82447.svg'
import Entertain from '../../assets/Hero/Group 1000006952.svg'
import Cleaning from '../../assets/Hero/image 82453.svg'

import one from '../../assets/Hero/Group.svg'
import two from '../../assets/Hero/Frame (1).svg'
import three from '../../assets/Hero/Group (1).svg'
import { useTranslation } from 'react-i18next'

export const Detail = () => {
    let {t} =  useTranslation()
    let iconArr = [[Dinning,t('hero.details.D1.0'),'#D5F4ED'],[Salon , t('hero.details.D1.1'),'#F5E3DB'], [Entertain,t('hero.details.D1.2'),'#F5DCDC'], [Cleaning,t('hero.details.D1.3'),'#CFE9FE'] , [Cleaning,t('hero.details.D1.3'),'#CFE9FE'] , [Cleaning,t('hero.details.D1.3'),'#CFE9FE'] , [Cleaning,t('hero.details.D1.3'), '#CFE9FE']];
    let cardArr = [[one, t('hero.details.D2.0.h') ,t('hero.details.D2.0.p')],[two,t('hero.details.D2.1.h'),t('hero.details.D2.1.p')],[three,t('hero.details.D2.2.h'),t('hero.details.D2.2.p')]]
  return (
    <>
    <div className=' flex gap-10 flex-col items-center bg-[#F9F9F9] py-10 pt-[360px] md:pt-[100px]'>
    <div className='hidden md:block'>    
        <div className='w-[1200px] flex  justify-between '>
        {iconArr.map((el,idx)=>(
            <div key={idx}>
                <div className={`w-[100px] h-[100px] flex justify-center items-center rounded-full `} style={{ backgroundColor: el[2] }} ><img className='' src={el[0]} alt="" /></div>
                <p className='text-center text-16px outfit'>{el[1]}</p>
            </div>
        ))}
    </div >
    </div>
    <div className='mx-5 md:w-[1200px] flex  flex-col md:flex-row gap-5  justify-between '>
        {cardArr.map((el ,idx)=>(
            <div className='flex items-center gap-5 md:gap-3 md:w-[30%] ' key={idx}>
                <img className='h-[50px] w-[50px]' src={el[0]} alt="" />
                <div className='w-[230px]'>
                    <h1  className='text-[20px] font-semibold md:text-[18px] outfit'>{el[1]}</h1>
                    <p className='text-[14px] outfit opacity-50 md:optacity-100'>{el[2]}</p>
                </div>
            </div>
        ))}
    </div>
    </div>
    </>
  )
}
