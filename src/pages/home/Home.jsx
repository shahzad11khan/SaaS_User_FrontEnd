import { Hero } from './Hero'
import { Deals } from './Deals'
import { DealsOfDay } from './DealsOfDay'
import { AppBanner } from './AppBanner'
// import { Map } from './Map'

import {Header} from '../../components/Header'
import Footer from '../../components/Footer'

export const Home = () => {
  return (
    <>
    <Header />
    <Hero/>
    <Deals />
    <DealsOfDay />
    <AppBanner />
    {/* <Map /> */}
    <Footer />
    </>
  )
}
