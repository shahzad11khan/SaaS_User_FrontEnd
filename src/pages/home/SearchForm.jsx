
import { useTranslation } from 'react-i18next';
import VectorIcon from '../../assets/icons/Vector.svg';

export const SearchForm = () => {
    const { t, } = useTranslation();
  return (
    <div className='mx-4 z-20 relative md:flex justify-center'>
        <div className='shadow-xl top-[-85px] w-full  absolute md:w-[1200px] bg-white rounded-lg p-5'>
            <form className='flex flex-col md:flex-row  md:flex-wrap gap-3 justify-center items-center' >
                <select id='dinning' name='dinning' className='w-full md:w-[30%] rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]' >
                    <option value="">{t('hero.searchForm.dinning')}</option>
                </select>
                
                <select className='w-full md:w-[30%] rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]' name="selectAll" id="selectAll">
                    <option value="">{t('hero.searchForm.selectAll')}</option>
                </select>
                
                <select className='w-full md:w-[30%] rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]' name="selectSubCategory" id=" selectSubCategory">
                    <option value="">{t('hero.searchForm.selectSubCtgry')}</option>
                </select>
                
                <select className='w-full md:w-[20%] rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]' name="city" id="city">
                    <option value="">{t('hero.searchForm.city')}</option>
                </select>
                
                <select className='w-full md:w-[20%] rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]' name="destination" id="destination">
                    <option value="">{t('hero.searchForm.destination')}</option>
                </select>
                
                <span className='w-full md:w-[40%] relative'>
                    <img  className='absolute top-3 left-3'  src={VectorIcon} alt="search" />
                    <input placeholder={t('hero.searchForm.placeHolder')} className='w-full h-[44px]  px-9 rounded-lg border border-solid border-grey' type="text" name="search" id="search" />
                </span>
                <span className='w-full md:w-[10%] flex items-center jusify-center'>
                <button className='bg-[#013D29] w-full rounded-full text-white outfit py-1 px-5'>{t('hero.searchForm.button')}</button>
                </span>
            </form>

        </div>
    </div>
  )
}
