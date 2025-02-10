// import CardRating from "./CardRating"
// import Union from '../assets/Card/Union.svg'
import { useEffect, useState } from "react"

import { jwtDecode } from "jwt-decode"
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./Header";
import Footer from "./Footer";
  // import { removeOneItemCount } from "../slices/cartSlice";
import {  removeFavourite  } from "../slices/favoriteSlice";

export const Favorite = () => {
  let dispatch = useDispatch()
  let [favoriteData , setFavoriteData] = useState(null);
  let [itemCount , setItemCount] = useState(0);
  let [price , setPrice] = useState(0)
  let [id , setId] = useState(null);
  let [checkedArr , setCheckedArr] = useState([])
  
  let token = useSelector(state => state.auth.token)  ;  

  useEffect(() => {
    if(token) {
      setId(jwtDecode(token).userId);  
    }    
    const storedfavorite = JSON.parse(localStorage.getItem('favorites'));
    setFavoriteData(storedfavorite);
  }, [token ]);
  useEffect(()=>{
    console.log(checkedArr)
    let checkedPrice = checkedArr.map(el => el.productPrice).reduce((finalValue , item)=> finalValue + item, 0)
    setPrice(checkedPrice)
    let checkedCount = checkedArr.length
    setItemCount(checkedCount)
  },[checkedArr])

  
  
  let handlRemove = (card) => {
    let deletes = favoriteData.filter((item) =>
        item.id !== card.id && item.userId === id
        ?item
        :null
    )
    setFavoriteData(deletes);
    localStorage.setItem('favorites', JSON.stringify(deletes)); 
    dispatch(removeFavourite());
  }

  let handleCheck = (card) =>{
    let findItem = checkedArr.some(item => item.id === card.id);
    if(findItem){
      let newArr = checkedArr.filter(el => el.id !== card.id )
      setCheckedArr(newArr)
      
    }else{
      let newArr = [...checkedArr , card]
      setCheckedArr(newArr)
    }
  }
  console.log(favoriteData)
  return (
    <>
    <Header />
    <div className=" flex justify-center bg-[#FCF5DC]">
    <div className="flex gap-5 w-[1200px]   ">
      {/* favorite items */}
      <div className=" flex flex-col items-center gap-5 py-5  w-[60%] ">
        <h1 className="bg-white w-full px-5 text-[34px] font-semibold rounded-lg">Favorite</h1>
        {favoriteData?.length>0 ? favoriteData.map((card,idx)=>{
          if(card.clintId == id){
            return (
            <div className="relative flex gap-5 w-full items-center  h-[150px] px-6 bg-white rounded-lg " key={idx}>
              {/* check icon */}
              <div onClick={() => handleCheck(card)} className={`cursor-pointer w-7  h-7 flex justify-center items-center rounded-md ${checkedArr.some(item => item._id === card._id)? 'text-[#013D29] border-[#013D29]':'text-gray-300 border-gray-300'}  border-[2px] `}>
                <i className="  fa-solid fa-check"></i>
              </div>
              {/* image */}
              <div className="w-[150px] h-[100px]  ">
                <img className=" w-full h-full rounded-lg" src={card.productImageUrl} alt="" />
              </div>
              {/* details */}
              <div className="flex gap-2 flex-col  h-[100px]   ">
                <div className="  outfit flex flex-col ">
                  <h1 className="text-[16px] font-semibold">{card.productName}</h1>
                  <p className="text-[16px] pt-3"><span className="outfit opacity-70">Price :</span> <span className="font-semibold">{card.productPrice}$</span></p>
                </div>
              </div>
              {/* delete icon */}
              <div>
                <i onClick={()=> handlRemove(card)} className="cursor-pointer absolute top-7 right-6 text-[red] fa-solid fa-trash"></i>
              </div>
            </div>
          )};
        })
        :<p className="py-5  w-full rounded-none-lg text-center bg-white ">  not added to favorite</p>
      }
      </div>
      {/* Order Summary */}
      <div className="w-[40%] py-5">
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
      </div>    
    </div>
    </div>
    <Footer />
    </>
  )
}