// import Object from '../../assets/Hero/OBJECTS.png'
import Image from '../../assets/Hero/2c5598627d268e8c9154dc45635c709d.jpeg'
import playIcon from '../../assets/Hero/Play Circle.svg'
import { SearchForm } from './SearchForm'
import { SubCategory } from './SubCategory'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types'

export const Hero = ({setProduct , setCategoryName}) => {
  
  const { t, } = useTranslation();
  return (
    <>
    <div className='w-full md:flex  md:h-[500px] z-0 overflow-hidden' >
        <div className=' md:px-0 relative md:w-[50%] h-[475px] md:h-full bg-[black] text-white flex flex-col items-center pt-16 md:pt-28 '>
            <div className='md:w-[70%] flex flex-col gap-5 z-10'>      
              <h1 className='text-[44px] md:text-[60px] font-bold outfit leading-[44px] md:leading-[64px]'>
                {t('hero.heading.1')} <span className='text-[#DB4444]'>{t('hero.heading.2')}</span>{t('hero.heading.3')}</h1>
              <p className='text-[ 18px] w-[80%] md:w-[60%] outfit'>{t('hero.paragraph')}</p>
              {/* <button className='md:mt-5 bg-[#013D29] w-[40%] md:w-[20%] rounded-full text-white outfit py-3'>{t('hero.bText')}</button> */}
            </div>
            {/* <img className='absolute bottom-0 md:bottom-[40px] right-[-70px] z-0' src={Object} /> */}
        </div>
        <div className='relative h-[475px] md:w-[60%] z-10'>
          <img className=' object-cover h-[full] w-full' src={Image} alt="" />
          <div className='z-20 absolute rounded-full top-[35%] left-[35%] md:left-[40%] h-[120px] w-[120px] md:h-[141px] md:w-[141px] bg-[#DB4444] flex justify-center items-center'>
              <img className=' h-[55px] w-[55px] cursor-pointer' src={playIcon} alt="" />
          </div>
        </div>
    </div>
    <SearchForm setProduct={setProduct} setCategoryName={setCategoryName} />
    <SubCategory setProduct={setProduct} setCategoryName={setCategoryName} />
    </>
  )
}
Hero.propTypes = {
  setProduct : PropTypes.func.isRequired,
  setCategoryName: PropTypes.func.isRequired,
}