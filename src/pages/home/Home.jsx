import { Hero } from './Hero'
import { Deals } from './Deals'
import { DealsOfDay } from './DealsOfDay'
import { AppBanner } from './AppBanner'
// import { Map } from './Map'

import {Header} from '../../components/Header'
import Footer from '../../components/Footer'
import { useEffect, useState } from 'react'
import {allProducts} from '../../slices/ProductsSlice.js'
import { useDispatch, useSelector} from 'react-redux'
import { Overview } from './Overview.jsx'
import { getAllCompanies } from '../../slices/companiesSlice.js'
import ChatBox from '../../components/ChatBox.jsx'
import FirebaseNotification from '../../utils/FirebaseNotification.jsx'
import { io } from "socket.io-client";
import { jwtDecode } from 'jwt-decode'

export const Home = () => {
  const{token} = useSelector(state => state.auth)
  const socket = io("https://saasserversidescript-production-befa.up.railway.app/");
  useEffect(() => {
    if (!token) return;

    let { userId } = jwtDecode(token);
    console.log("👤 User ID:", userId);
  
    // ✅ User joins their own room
    socket.emit("joinUser", userId);

    // ✅ Listen for order status updates
    socket.on("orderStatus", (orderUpdate) => {
      console.log("🔔 Order status updated:", orderUpdate);
    });

    return () => {
      socket.off("orderStatusUpdate");
    };
  }, []);

  let [ chatBox , setChatBox] = useState(false)
  let {companyId} = useSelector(state=>state.company)
  console.log(companyId)
  const dispatch = useDispatch()
  useEffect(()=>{      
    dispatch(getAllCompanies())
    dispatch(allProducts())
  },[companyId , dispatch])
  const { isAuthenticated } = useSelector((state) => state.auth);
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
    {/* <div id="header"className='sticky top-0 w-full'> */}
      <Header />
    {/* </div> */}
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
    
    <div onClick={() => setChatBox(!chatBox)} className='z-50 fixed bottom-5  right-5 cursor-pointer '>
      <i className="bg-[#DB4444] p-3 rounded-full text-white fa-brands fa-rocketchat"></i>
    </div>
    {chatBox && <ChatBox />}
    {isAuthenticated && <FirebaseNotification />}
    </>
  )
}
