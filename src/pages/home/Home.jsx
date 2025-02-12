import { Hero } from './Hero'
import { Deals } from './Deals'
import { DealsOfDay } from './DealsOfDay'
import { AppBanner } from './AppBanner'
// import { Map } from './Map'

import {Header} from '../../components/Header'
import Footer from '../../components/Footer'
import { useEffect, useState } from 'react'
import {allProducts} from '../../slices/ProductsSlice.js'
import { useDispatch} from 'react-redux'
import { Overview } from './Overview.jsx'

export const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(allProducts())
  },[dispatch])

  let [searchProducts , setProduct] = useState(null)
  let [categoryName , setCategoryName] = useState(null)
  // let icons= [
  //   {id:'header', icon : 'fa-arrow-up'},
  //   {id:'hero', icon: 'fa-magnifying-glass'},
  //   {id:'deals', icon:'fa-square'},
  //   {id:'dealsOfDay',icon:'fa-table'},
  //   {id:'app',icon:'fa-gamepad'},
  //   {id:'footer',icon:'fa-arrow-down'}
  // ]

  // const scrollToSection = (id) => {
  //   console.log(id)
  //   document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <>
    {/* <div className='fixed  z-50 top-[200px] bg-white w-[50px] rounded-lg'>
      {icons.map((el ,idx)=>(
      <div key={idx} onClick={() => scrollToSection(el.id)} className='h-[50px] w-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer'>
        <i className={`text-[20px] fa-solid ${el.icon} `}></i>
      </div>
      ))}
    </div> */}
    <div id="header"className='relative h-[185px] w-full'>
      <Header />
    </div>
    <div id="hero static">
      <Hero setProduct={setProduct} setCategoryName={setCategoryName} />
    </div>
    <div id="deals">
      <Deals  searchProducts={searchProducts} categoryName={categoryName} />
    </div>
    <div id="dealsOfDay">
      <DealsOfDay />
    </div>
    <Overview />
    <div id="app">
      <AppBanner />
    </div>
    {/* <Map /> */}
    <div id="footer">
    <Footer />
    </div>
    </>
  )
}
