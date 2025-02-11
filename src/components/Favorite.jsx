// import CardRating from "./CardRating"
// import Union from '../assets/Card/Union.svg'
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"
import { useDispatch, useSelector } from "react-redux";
import {  addCart } from "../slices/cartSlice";

import { Header } from "./Header";
import Footer from "./Footer";
  // import { removeOneItemCount } from "../slices/cartSlice";
import {  removeFavourite  } from "../slices/favoriteSlice";

export const Favorite = () => {
  let dispatch = useDispatch()
  let [favoriteData , setFavoriteData] = useState(null);
  // let [itemCount , setItemCount] = useState(0);
  // let [price , setPrice] = useState(0)
  let [id , setId] = useState(null);
  // let [checkedArr , setCheckedArr] = useState([])
  
  let token = useSelector(state => state.auth.token)  ;  

  useEffect(() => {
    if(token) {
      setId(jwtDecode(token).userId);  
    }    
    const storedfavorite = JSON.parse(localStorage.getItem('favorites'));
    setFavoriteData(storedfavorite);
  }, [token ]);
  // useEffect(()=>{
  //   console.log(checkedArr)
  //   let checkedPrice = checkedArr.map(el => el.productPrice).reduce((finalValue , item)=> finalValue + item, 0)
  //   setPrice(checkedPrice)
  //   let checkedCount = checkedArr.length
  //   setItemCount(checkedCount)
  // },[checkedArr])

  
  
  let handlRemove = (card) => {
    let deletes = favoriteData.filter((item) =>
        item._id !== card._id && item.clintId === id
        ?item
        :null
    )
    console.log(deletes)
    setFavoriteData(deletes);
    localStorage.setItem('favorites', JSON.stringify(deletes)); 
    dispatch(removeFavourite());
  }

  // let handleCheck = (card) =>{
  //   let findItem = checkedArr.some(item => item.id === card.id);
  //   if(findItem){
  //     let newArr = checkedArr.filter(el => el.id !== card.id )
  //     setCheckedArr(newArr)
      
  //   }else{
  //     let newArr = [...checkedArr , card]
  //     setCheckedArr(newArr)
  //   }
  // }
  // console.log(favoriteData)
  
      let CartClick = async (card) => {
          console.log(card)
          if (!token) {
              return toast.error('You need to login first');
          }
  
          let carts = JSON.parse(localStorage.getItem('cart')) || [];
          let decodedToken = jwtDecode(token)
          console.log(decodedToken)
          console.log(carts)
          let existingCartIndex = carts.findIndex(cart => cart._id === card._id && cart.clintId === decodedToken.userId);
          console.log(existingCartIndex)
          if (existingCartIndex !== -1 && decodedToken.userId === carts[existingCartIndex].clintId) {
              carts[existingCartIndex].count += 1;
              toast.info(`${card.productName} count updated in cart`);
          } else {
              card.clintId = decodedToken.userId;
              card.count = 1;
              carts.push(card);
              toast.success(`${card.productName} added to cart`);
          }
          localStorage.setItem('cart', JSON.stringify(carts));    
          dispatch(addCart());
      }
  return (
    <>            
    <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
    <Header />
    <div className=" flex justify-center bg-[white]">
    <div className="w-[1200px] h-full  ">
      {/* favorite items */}
      <div className="   h-full items-start pt-5 pb-5  w-full  ">
        <h1 className=" w-full px-5 text-[34px] font-semibold rounded-lg">Favorite ({favoriteData?.length})</h1>
        <div className="flex justify-start flex-wrap gap-8 pt-5">
        {favoriteData?.length>0 ? favoriteData.map((card,idx)=>{
          if(card.clintId == id){
            return (
            <div className="relative flex flex-col  w-[276px]   h-[full]  " key={idx}>
              {/* check icon */}
              {/* <div onClick={() => handleCheck(card)} className={`cursor-pointer w-7  h-7 flex justify-center items-center rounded-md ${checkedArr.some(item => item._id === card._id)? 'text-[#013D29] border-[#013D29]':'text-gray-300 border-gray-300'}  border-[2px] `}>
                <i className="  fa-solid fa-check"></i>
              </div> */}
              {/* image */}
              <div className=" relative w-full h-[250px]">
                <img className=" w-full h-full rounded-lg " src={card.productImageUrl} alt="" />
                
                <button onClick={()=>CartClick(card)} className="absolute rounded-b-lg bottom-0 w-full bg-[black] py-2 px-3 text-white outfit ">
                    Add To Cart
                </button>
              </div>
              {/* delete icon */}
              <div className=" absolute top-3 right-3  w-10 h-10 bg-[#F5F5F5] flex justify-center items-center rounded-full">
                <i onClick={()=> handlRemove(card)} className="cursor-pointer text-[#DB4444] fa-solid fa-trash"></i>
              </div>
              {/* product tag */}
              {card.productTag && 
              <div  className="absolute top-3 left-3 bg-[#DB4444] text-white px-2 py-2 rounded-full flex justify-end items-center gap-2">                    
                <p className="outfit text-[12px]">Flat {card.productTag}</p>
              </div>}
              {/* details */}
              <div className="px-2 pt-2 outfit">
                  <h1 className="text-[18px] font-[600]">{card.productName}</h1>
                  <p className="font-[600] text-[#DB4444] text-[18px] pt-2">${card.productPrice}</p>
              </div>
            </div>
          )};
        })
        :<p className="py-5  w-full rounded-none-lg text-center bg-white ">  not added to favorite</p>
      }
      </div>
      </div>
      {/* Order Summary */}
      {/* <div className="w-[40%] py-5">
        <div className="outfit text-[16px] bg-white h-full w-full rounded-lg p-5 flex flex-col gap-3  ">
          <p className="text-[20px]">Order Summary</p>
          <div className="flex justify-between ">
            <span className="opacity-50"> Subtotal ({itemCount})</span>
            <span>USD.{price}</span>
          </div>
          <div className="flex justify-between ">
            <span className="opacity-50">Shipping Fee</span>
            <span>USD.0</span>
          </div>
          <div className="flex justify-between ">
            <span>Total</span>
            <span>USD.{price}</span>
          </div>
          <button className="w-full bg-[#013D29] text-white py-2 rounded-lg">PROCEED TO CHECKOUT ({itemCount})</button>
        </div>
      </div>     */}
    </div>
    </div>
    <Footer />
    </>
  )
}