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
  return (
    <>
    <Header />
    <Hero  setProduct={setProduct} setCategoryName={setCategoryName} />
    <Deals products={products} categoryName={categoryName} />
    <DealsOfDay />
    <AppBanner />
    {/* <Map /> */}
    <Footer />
    </>
  )
}
