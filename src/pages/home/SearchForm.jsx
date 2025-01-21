
import { useTranslation } from 'react-i18next';
import VectorIcon from '../../assets/icons/Vector.svg';

import dinning from '../../assets/json/dinning.json'
import entertainment from '../../assets/json/entertainment.json'
import homeServices from '../../assets/json/homeServices.json'
import salon from '../../assets/json/salon.json'
import { useState } from 'react';
import PropTypes from 'prop-types'
import { toast , ToastContainer} from 'react-toastify';


export const SearchForm = ({setProduct , setCategoryName}) => {
    let [subCategory , setSubCategory] = useState(null)
    let [form , setForm] = useState({
        SelectedCategory: null,
        search: '',
        selectedSubCategory: null
    })

    const categories = {
        dinning: dinning, 
        entertainment: entertainment,
        homeServices: homeServices,
        salon: salon
    };
    const { t, } = useTranslation();
    let handleCategory = (e) => {
        let {name , value} = e.target;       
        setForm(
            {... form , [name] : value}
       )
        let  selectedCategories =  categories[e.target.value] || null;
        if(selectedCategories === null){
            return  setSubCategory(null)
        }
        setSubCategory([... new Set(selectedCategories.map(el => el.category))])
    }

     let handleChange = (e)=> {
        let {name , value} = e.target;
        setForm(
            {... form , [name] : value}
        )
    }

    let handleSearchSubmit = (e) => {
        e.preventDefault()
        let  selectedCategories =  categories[form.SelectedCategory];
        let productsArr = selectedCategories.filter(el => 
            el.category === form.selectedSubCategory &&
            el.title.toLowerCase().includes(form.search.toLowerCase())
        )
        
        if ( productsArr.length < 1) {
            toast.error("produnt not found");
        }else{
            
            setCategoryName(form)
            setProduct(productsArr);
        }
    }    

  return (
    <div className='mx-4 z-20 relative md:flex justify-center'>
        <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
        <div className='shadow-xl top-[-50px] w-full  absolute md:w-[1200px] bg-white rounded-lg p-5'>
            <form onSubmit={ handleSearchSubmit} className='flex flex-col md:flex-row outline-none  md:flex-wrap gap-3 justify-center items-center' >
                <select  onChange={handleCategory} name='SelectedCategory' className='w-full md:w-[30%] outline-none rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]' required >
                    <option value="">{t('hero.searchForm.selectCategory')}</option>
                    <option value={"dinning"}>Dinning</option>
                    <option value={"entertainment"}>Entertainment</option>
                    <option value={"homeServices"}>Home Services</option>
                    <option value={"salon"}>Salon</option>
                </select>
                
                <select onChange={handleChange} name="selectedSubCategory" className='w-full md:w-[30%] outline-none rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]'  required>
                    <option >{t('hero.searchForm.selectSubCtgry')}</option>
                    {subCategory?.map((el , idx)=>(
                        <option key={idx} value={el}>{el}</option>
                    ))}
                </select>
                
                {/* <select className='w-full md:w-[30%] rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]' name="selectSubCategory" id=" selectSubCategory">
                    <option value="">{t('hero.searchForm.selectSubCtgry')}</option>
                </select>
                
                <select className='w-full md:w-[20%] rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]' name="city" id="city">
                    <option value="">{t('hero.searchForm.city')}</option>
                </select>
                
                <select className='w-full md:w-[20%] rounded-lg h-[44px] px-4 border border-solid border-[#E7E7E7] bg-[#F9F9F9]' name="destination" id="destination">
                    <option value="">{t('hero.searchForm.destination')}</option>
                </select> */}
                
                <span className='w-full md:w-[25%] relative'>
                    <img  className='absolute top-3 left-3'  src={VectorIcon} alt="search" />
                    <input onChange={handleChange} value={form.search} placeholder={t('hero.searchForm.placeHolder')} className='w-full h-[44px] outline-none  px-9 rounded-lg border border-solid border-grey' type="text" name="search" id="search" required />
                </span>
                <span className='w-full md:w-[10%] flex items-center jusify-center'>
                <button  type='submit' className='bg-[#013D29] w-full rounded-full text-white outfit py-1 px-5'>{t('hero.searchForm.button')}</button>
                </span>
            </form>

        </div>
    </div>
  )
}
SearchForm.propTypes = {
//   products : PropTypes.string.isRequired,
    setProduct : PropTypes.func.isRequired,
    setCategoryName: PropTypes.func.isRequired,
}