import { useTranslation } from 'react-i18next';
import Card from '../../components/Card'
import { useState,  } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

export const Deals = ({searchProducts , categoryName }) => {
  let [more , setMore] = useState(false)
  let {t} = useTranslation();
  const {products , loading } = useSelector(state => state.product)
  
  // const products =products  || t('deals.products', { returnObjects: true });
  const firstThreeDeals =searchProducts?.length>0
   ? searchProducts.slice(0, 3)
   : products?.slice(0, 3);
  const secondThreeDeals = searchProducts?.length>5
   ? searchProducts.slice(6, 9)
   : products?.length>5 && products.slice(6, 9);

  let showMore=()=>{
    setMore(true)
  }

  let showLess=()=>{
    setMore(false)
  }
  return (
    <div className=" flex px-4 justify-center pb-16 md:pb-16 ">
        {/* title % button */}
        <div className="md:w-[1200px] bg-white flex gap-10 flex-col ">
            <div className="w-full flex justify-between items-center">
              { searchProducts === null ||  searchProducts.length < 1 
              ?            
              <>     
              <div className='' >
                <h1 className="text-[34px] md:text-[50px] font-semibold leading-[70px]">{t('deals.heading.0')} <span className="text-[#219653]">{t('deals.heading.1')}</span></h1>
                <p className='text-[14px] outfit'>{t('deals.paragraph')}</p>
              </div>                
              {/* <button className="hidden md:block outfit text-[16px] rounded-full py-3 px-5 bg-[#013D29]  text-white">{t('deals.bText')}</button> */}
              </>
              :
              <div className='' >
              <h1 className="text-[34px] md:text-[50px] font-semibold leading-[70px]"> 
                {categoryName.SelectedCategory && categoryName.SelectedCategory}/ 
                <span className="text-[#219653]">{categoryName.selectedSubCategory && categoryName.selectedSubCategory}</span>
              </h1>
            </div>
              }
            </div>
            {/* first three view by default */}
            <div  className='flex gap-7  flex-wrap flex-col md:flex-row justify-start  '>
            {loading ?
            <p>loading...</p>
            : firstThreeDeals?.map((deal, index) => (
            <Card key={index} data={deal} />
            ))}
            </div>

            {/* second three view if present */}
            {more && <div  className='flex gap-7  flex-wrap flex-col md:flex-row justify-start  '>
            {secondThreeDeals?.map((deal, index) => (
            <Card key={index} data={deal} />
          ))}
            </div>}

          {/* button for second three if present */}
          {products?.length > 3 && 
            <div className={`text-center outfit font-bold `}>
            { !more
            ?<button onClick={showMore}>show more</button>
            :<button onClick={showLess}>show less</button>
            }
            </div>
          }
        </div>
    </div>
  )
}

Deals.propTypes={
    searchProducts: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        productImageUrl: PropTypes.string.isRequired,
        productPrice: PropTypes.number.isRequired,
        productTag: PropTypes.string,
        rating: PropTypes.number,
        productCategory: PropTypes.string.isRequired,
      })
    ),
  
    categoryName: PropTypes.shape({
      SelectedCategory: PropTypes.string,
      search: PropTypes.string,
      selectedSubCategory: PropTypes.string,
    }),
    
}