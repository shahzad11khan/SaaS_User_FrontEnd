import { useTranslation } from 'react-i18next';

import Card from '../../components/Card'
import  { useState } from 'react';
import { useSelector } from 'react-redux';

export const DealsOfDay = () => {
  const {products , loading } = useSelector(state => state.product)
  let {t} = useTranslation()
  let [more , setMore] = useState(false)
  // const products = t('dealsOfDay.products', { returnObjects: true }); 

  // const firstThreeDeals = products?.slice(9,12);
  // const secondThreeDeals = products?.length>5 && products.slice(3, 6);

  const firstThreeDeals = products?.slice(0, 4);
  const secondThreeDeals = products?.length>5 && products.slice(6, 9);

  let showMore=()=>{
    setMore(true)
  }

  let showLess=()=>{
    setMore(false)
  }

  return (
    <div className="bg-white flex px-4 justify-center py-16 md:py-26 ">
        {/* title % button */}
        <div className="md:w-[1200px]  flex gap-10 flex-col ">
            <div className="w-full flex justify-between items-center">
                <div className='' >
                    <h1 className="text-[34px] md:text-[40px] font-semibold leading-[70px]">{t('dealsOfDay.heading.0')} <span className="text-[#DB4444]">{t('dealsOfDay.heading.1')}</span></h1>
                    <p className='text-[14px] outfit'>{t('dealsOfDay.paragraph')}</p>
                </div>
                {/* <button className="hidden md:block outfit text-[16px] rounded-full py-3 px-5 bg-[#013D29]  text-white">{t('dealsOfDay.bText')}</button> */}
            </div>
            {/* card */}
            <div  className='flex gap-10 flex-col md:flex-row justify-start  '>
              {loading? 
              <p>loading...</p>
              :firstThreeDeals?.map((deal, index) => (
                <Card key={index} data={deal } />
              ))}
            </div>

          
            {more && <div  className='flex gap-10 flex-col md:flex-row justify-start  '>
            {secondThreeDeals?.map((deal, index) => (
              <Card key={index} data={deal} />
            ))}
            </div>}

            {products?.length > 4 &&
            <div className={`text-center outfit font-bold `}>
            {!more
            ?<button onClick={showMore} className='bg-[#DB4444] py-2 px-5 rounded-full'>show more</button>
            :<button onClick={showLess} className='bg-[#DB4444] py-2 px-5 rounded-full'>show less</button>
            }
            </div>
            }
        </div>
    </div>
  )
}
