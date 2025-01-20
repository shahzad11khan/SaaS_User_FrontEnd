import {Header} from '../../components/Header'
import Footer from '../../components/Footer'

import { Sidebar } from '../../components/Sidebar'
import { Main } from './Main'
import data from "../../assets/json/entertainment.json"

import { useState } from 'react'


export const Entertainment = () => {
  const [Products, setProducts] = useState(data);

  const sortLowToHigh = () => {
    const sorted = [...Products].sort((a, b) => a.price - b.price);
    setProducts(sorted);
  };

  const sortHighToLow = () => {
    const sorted = [...Products].sort((a, b) => b.price - a.price);
    setProducts(sorted);
  };

  const showByCtgry = (Ctgry)=>{
    let filterProductByCtgry = data.filter((el=> el.category === Ctgry))
    setProducts(filterProductByCtgry);
  }
  return (
    <>
    <Header />
    <div className=' flex justify-center bg-[#FCF5DC] py-20  '>
      <div className='w-[1200px] flex gap-5'>
        <Sidebar lowToHigh ={sortLowToHigh} highToLow={sortHighToLow} viewByCtgry={showByCtgry} products={data} />
        <Main products={Products}  />
      </div>
    </div>
    <Footer />
    </>
    )
}
