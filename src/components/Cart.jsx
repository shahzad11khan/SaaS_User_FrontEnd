  // import CardRating from "./CardRating"
  // import Union from '../assets/Card/Union.svg'
import { useEffect, useState } from "react"

import { jwtDecode } from "jwt-decode"
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./Header";
import Footer from "./Footer";
import { addCart, removeCart, removeOneItemCount } from "../slices/cartSlice";
import { PaymentsMehtod } from "./PaymentsMehtod";
import StripePayment from "../stripe/StripePayment";
import { toast , ToastContainer} from "react-toastify";
    
  
  export const Cart = () => {
    let dispatch = useDispatch();
    let [CartData , setCartData] = useState(null);
    let [itemCount , setItemCount] = useState(0);
    let [price , setPrice] = useState(0);
    let [id , setId] = useState(null);
    let [checkedArr , setCheckedArr] = useState([]);
    let [next , setNext] = useState(0)
    let [address , setAddress] = useState('') 
    
    let token = useSelector(state => state.auth.token)  ;  

    useEffect(() => {
      if(token) {
        setId(jwtDecode(token).userId);  
      }    
      console.log(jwtDecode(token))
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      setCartData(storedCart);
    }, [token ]);

    useEffect(()=>{
      let checkedPrice = checkedArr.map(el => el.count*el.productPrice).reduce((finalValue , item)=> finalValue + item, 0)

      setPrice(checkedPrice)
      let checkedCount = checkedArr.map(el => el.count).reduce((finalValue , item)=> finalValue + item, 0)
      setItemCount(checkedCount)
    },[checkedArr])

    let countIncrement=(card)=>{
      console.log(card , CartData)
      let updatedCart = CartData.map((item) =>
        item._id === card._id && item.clintId === id
          ? { ...item, count: item.count + 1 }
          : item
      ); 
      let updatedCheck = checkedArr.map((item) =>
        item._id === card._id && item.clintId === id
          ? { ...item, count: item.count + 1 }
          : item
      ); 
      setCheckedArr(updatedCheck)
      setCartData(updatedCart)  
      localStorage.setItem('cart', JSON.stringify(updatedCart));    
      dispatch(addCart());
    }

    let countDecrement=(card)=>{
      if (card.count === 1) {
        return;
      }
      let updatedCart = CartData.map((item) =>
        item._id === card._id && item.clintId === id && item.count >1
          ? { ...item, count: item.count - 1 }
          : item
      );
      let updatedCheck = checkedArr.map((item) =>
        item._id === card._id && item.clintId === id && item.count >1
          ? { ...item, count: item.count - 1 }
          : item
      ); 

      setCheckedArr(updatedCheck)
      setCartData(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));    
      dispatch(removeCart());
    }
    
    let handlRemove = (card) => {
      let deletes = CartData.filter((item) =>
          item._id !== card._id && item.clintId === id
          ?item
          :null
      )
      setCartData(deletes);
      localStorage.setItem('cart', JSON.stringify(deletes)); 
      
      dispatch(removeOneItemCount(card.count))
    }

    let handleCheck = (card) =>{
      console.log(address)
      let findItem = checkedArr.some(item => item._id === card._id);
      console.log(findItem)
      if(findItem){
        let newArr = checkedArr.filter(el => el._id !== card._id )
        setCheckedArr(newArr)
        
      }else{
        let newArr = [...checkedArr , card]
        setCheckedArr(newArr)
      }
      console.log(checkedArr)
    } 
  

    return (
      <>
      <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
      <Header />
      <div className=" flex justify-center  ">
      <div className="flex flex-col gap-5 w-[1200px]   ">
        
        {next === 0  ?
        // cart items 
        <div className=" flex flex-col items-center gap-5 py-5     ">
          <h1 className="bg-white w-full px-5 text-[34px] font-semibold rounded-lg">Cart ({CartData?.length})</h1>
          {CartData?.length>0 &&<div className="bg-white flex justify-between h-5 w-full">
            <h6>Product</h6>
            <h6>Price</h6>
            <h6>Quantity</h6>
            <h6>Delete</h6>
            <h6>Selecked</h6>
          </div>}
          {CartData?.length>0 ? CartData.map((card,idx)=>{
            if(card.clintId == id){
              return (
              <div className="relative flex justify-between  gap-5 w-full items-center  h-[100px]  bg-white rounded-lg " key={idx}>
                {/* image  + title*/}
                <div className="w-[54px] h-[54px]  flex items-center gap-5  ">
                  <img className=" w-full h-full rounded-md" src={card.productImageUrl} alt="" />
                  <h1 className="text-[16px] font-semibold">{card.productName}</h1>
                </div>
                {/* price */}
                <div className="">
                <p className="text-[16px] ">${card.productPrice}</p>
                </div>
                {/* duantity */}
                  <div className="flex gap-3 items-center w-[60px] overflow-visible">
                    <button onClick={() => countDecrement(card)}  className="rounded-xl  w-[32px] h-8"><i className="text-[14px] fa-solid fa-minus"></i></button>
                    <p className=" w-5 flex items-center justify-center text-[16px]">{card.count}</p>
                    <button onClick={() => countIncrement(card)} className="rounded-xl w-8 h-8"><i className="text-[14px] fa-solid fa-plus"></i></button>
                  </div>
                {/* delete icon */}
                <div className="w-[45px] flex justify-center">
                  <button onClick={()=> handlRemove(card)} className="cursor-pointer  text-[#DB4444] ">Delete</button>
                </div>
                
              {/* check icon */}
              <div className="w-[62px] flex justify-center">
              <div onClick={() => handleCheck(card)} className={`cursor-pointer w-7  h-7 flex justify-center items-center rounded-md ${checkedArr.some(item => item._id === card._id)? 'text-[#013D29] border-[#013D29]':'text-gray-300 border-gray-300'}  border-[2px] `}>
              <i className="  fa-solid fa-check"></i>
            </div>
            </div>

              </div>
            )} return null;
          })
          :<p className="py-5  w-full rounded-none-lg text-center bg-white "> cart is empty</p>
        }
        </div>
        : next === 1?
          <PaymentsMehtod setNext={setNext} ></PaymentsMehtod>
        : next === 2?
        <div className="flex flex-col items-center gap-5 py-5  w-[60%]">Easypaisa</div>
        :next === 3?
        <div className="flex flex-col items-center gap-5 py-5  w-[60%]">Visa Card</div>
        :next === 4 ? 
        <div className="flex flex-col items-center gap-5 py-5  w-[60%]">
          <StripePayment address={address} selectedProducts={checkedArr} />
        </div>
        :next === 5 ?
        <div className="flex flex-col items-center gap-5 py-5  w-[60%]">On Delivery</div>
        : null 
        }

        {/* Order Summary */}
        {CartData?.length>0 && <div className="flex  justify-end w-full py-5 ">
          <div className="outfit text-[16px] w-[40%] border-black border-[2px] bg-white h-full  rounded-lg p-5 flex flex-col gap-3  ">
            <p className="text-[20px]">Order Summary</p>
            <div className="flex flex-col ">
              <span className="w-[30%] outfit ">Address</span>
              <textarea value={address} onChange={(e)=> setAddress(e.target.value)} className="w- outline-none border" type="text" />
            </div>
            <div className="flex justify-between ">
              <span className="opacity-50"> Subtotal ({itemCount} items)</span>
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
            {next<1 && <button onClick={()=> itemCount>0 && address.length >0  ?  setNext(1):toast.error("you did not mention the delivery address or not selected products")} className={` ${itemCount>0 && address.length > 0 ?'curser-pointer': 'cursor-not-allowed'} w-full bg-[#DB4444] text-white py-2 rounded-lg`}>PROCEED TO CHECKOUT ({itemCount})</button>
          }
          </div>
        </div>}    
      </div>
      </div>
      <Footer />
      </>
    )
  }
  