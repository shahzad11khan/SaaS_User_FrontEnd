

import one from '../../assets/Hero/Group.svg'
import two from '../../assets/Hero/Frame (1).svg'
import three from '../../assets/Hero/Group (1).svg'

import { useTranslation } from 'react-i18next'

export const Overview = () => {
    let {t} =  useTranslation()

    let cardArr = [[one, t('hero.details.D2.0.h') ,t('hero.details.D2.0.p')],[two,t('hero.details.D2.1.h'),t('hero.details.D2.1.p')],[three,t('hero.details.D2.2.h'),t('hero.details.D2.2.p')]]

  return (
    <div className='flex gap-10 flex-col items-center  py-10'>
            <div className='mx-5 md:w-[1200px] flex  flex-col md:flex-row gap-5  justify-between '>
        {cardArr.map((el ,idx)=>(
            <div className=' flex items-center gap-5 md:gap-3 md:w-[30%] '  key={idx}>
                <img className='h-[50px] w-[50px] text-[#DB4444]' src={el[0]} alt="" />
                <div className='w-[230px]'>
                    <h1  className='text-[20px] font-semibold md:text-[18px] outfit'>{el[1]}</h1>
                    <p className='text-[14px] outfit opacity-50 md:optacity-100'>{el[2]}</p>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}
