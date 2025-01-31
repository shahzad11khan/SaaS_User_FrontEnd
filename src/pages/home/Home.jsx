import { Hero } from './Hero'
import { Deals } from './Deals'
import { DealsOfDay } from './DealsOfDay'
import { AppBanner } from './AppBanner'
// import { Map } from './Map'

import {Header} from '../../components/Header'
import Footer from '../../components/Footer'
import { useState } from 'react'

export const Home = () => {
  let [products , setProduct] = useState(null)
  let [categoryName , setCategoryName] = useState(null)
  let icons= [
    {id:'header', icon : 'fa-arrow-up'},
    {id:'hero', icon: 'fa-magnifying-glass'},
    {id:'deals', icon:'fa-square'},
    {id:'dealsOfDay',icon:'fa-table'},
    {id:'app',icon:'fa-gamepad'},
    {id:'footer',icon:'fa-arrow-down'}
  ]

  const scrollToSection = (id) => {
    console.log(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
    <div className='fixed  z-50 top-[200px] bg-white w-[50px] rounded-lg'>
      {icons.map((el ,idx)=>(
      <div key={idx} onClick={() => scrollToSection(el.id)} className='h-[50px] w-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer'>
        <i className={`text-[20px] fa-solid ${el.icon} `}></i>
      </div>
      ))}
    </div>
    <div id="header">
    <Header />
    </div>
    <div id="hero">
    <Hero  setProduct={setProduct} setCategoryName={setCategoryName} />
    </div>
    <div id="deals">
    <Deals products={products} categoryName={categoryName} />
    </div>
    <div id="dealsOfDay">
    <DealsOfDay />
    </div>
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
