// import Dinning from '../../assets/Hero/Dinning 1.svg'
// import Salon from '../../assets/Hero/image 82447.svg'
// import Entertain from '../../assets/Hero/Group 1000006952.svg'
// import Cleaning from '../../assets/Hero/image 82453.svg'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const SubCategory = ({setProduct , setCategoryName}) => {
    const [clicked , setClicked] = useState(null)
    const {products} = useSelector(state => state.product)
    const subCategory = products?.map(product => product.productSubCategory)
    const uniqueSubcategory = [...new Set(subCategory)]
    // let colors = ['#D5F4ED','#F5E3DB','#F5DCDC','#CFE9FE','#CFE9FE'];
    // const generateRandomIndex = () => {
    //     let idx = Math.floor(Math.random()*4);
    //     return idx
    // }

    let handleCtgryClick = (ctgry)=>{
        setClicked(ctgry)
        let category= {
            SelectedCategory:ctgry
        }
        let  selectedCategories =  products.filter(el => el.productSubCategory === ctgry)
        setCategoryName(category)
        setProduct(selectedCategories);
    }
  return (
    <>
    <div className=' flex gap-10 flex-col items-center bg-[#F9F9F9]pt-[360px] md:pt-[50px]'>
        <div className='hidden md:block'>    
            <div className='w-[1200px] flex gap-5  justify-start '>
                {uniqueSubcategory?.map((el,idx)=>(
                    <div className='cursor-pointer' onClick={() => handleCtgryClick(el)} key={idx}>
                        {
                            el !== null && el !== undefined  &&
                            <div  className={`w-[100px] h-[60px] flex justify-center items-center px-5 rounded-2xl ${ el === clicked && 'underline underline-offset-8 font-bold decoration-[3px]'} `} >
                                <p className='text-center text-16px outfit'>{el.toUpperCase()}</p>
                            </div>
                        }
                    </div>
                ))}
            </div >
        </div>
    </div>
    </>
  )
}
SubCategory.propTypes = {
  setProduct : PropTypes.func.isRequired,
  setCategoryName: PropTypes.func.isRequired,
}