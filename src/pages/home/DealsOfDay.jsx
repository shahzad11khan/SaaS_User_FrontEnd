import { useTranslation } from 'react-i18next';

import Card from '../../components/Card'
import  { useState } from 'react';

export const DealsOfDay = () => {
  let {t} = useTranslation()
  let [more , setMore] = useState(false)
  const items = t('dealsOfDay.items', { returnObjects: true }); 

  const firstThreeDeals = items.slice(9,12);
  const secondThreeDeals = items.slice(3, 6);

  let showMore=()=>{
    setMore(true)
  }

  let showLess=()=>{
    setMore(false)
  }

  return (
    <div className="bg-[#FCF5DC] flex px-4 justify-center py-16 md:py-20 ">
        {/* title % button */}
        <div className="md:w-[1200px]  flex gap-10 flex-col ">
            <div className="w-full flex justify-between items-center">
                <div className='' >
                    <h1 className="text-[34px] md:text-[60px] font-semibold leading-[70px]">{t('dealsOfDay.heading.0')}<span className="text-[#219653]">{t('dealsOfDay.heading.1')}</span></h1>
                    <p className='text-[14px] outfit'>{t('dealsOfDay.paragraph')}</p>
                </div>
                <button className="hidden md:block outfit text-[16px] rounded-full py-3 px-5 bg-[#013D29]  text-white">{t('dealsOfDay.bText')}</button>
            </div>
            {/* card */}
            <div  className='flex gap-10 flex-col md:flex-row justify-between  '>
              {secondThreeDeals.map((deal, index) => (
                <Card key={index} data={deal } />
              ))}
            </div>

          
            {more && <div  className='flex gap-10 flex-col md:flex-row justify-between  '>
            {firstThreeDeals.map((deal, index) => (
              <Card key={index} data={deal} />
            ))}
            </div>}

            <div className={`text-center outfit font-bold `}>
            {!more
            ?<button onClick={showMore}>show more</button>
            :<button onClick={showLess}>show less</button>
            }
            </div>

        </div>
    </div>
  )
}