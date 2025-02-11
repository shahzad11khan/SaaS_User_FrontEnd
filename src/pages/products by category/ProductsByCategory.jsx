import {Header} from '../../components/Header'
import Footer from '../../components/Footer'

import { Sidebar } from './Sidebar'
import { Main } from './Main'

import { useState } from 'react'
import { useSelector } from 'react-redux'

export const ProductsByCategory = () => {
  let {products} = useSelector(state => state.product)   
  const [Products, setProducts] = useState(products);

  const sortLowToHigh = () => {
    console.log(products)
    const sorted = [...Products].sort((a, b) => a.productPrice - b.productPrice);
    setProducts(sorted);
  };

  const sortHighToLow = () => {
    const sorted = [...Products].sort((a, b) => b.price - a.price);
    setProducts(sorted);
  };

  const showByCtgry = (Ctgry)=>{
    let filterProductByCtgry = products.filter((el=> el.category === Ctgry))
    setProducts(filterProductByCtgry);
  }
  return (
    <>
    <Header />
    <div className=' flex justify-center  py-10  '>
      <div className='w-[1200px] flex gap-5'>
        <Sidebar lowToHigh ={sortLowToHigh} highToLow={sortHighToLow} viewByCtgry={showByCtgry} products={products} />
        <Main products={Products}/>
      </div>
    </div>
    <Footer />
    </>
    )
}
