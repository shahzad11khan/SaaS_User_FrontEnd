  // import CardRating from "./CardRating"
  // import Union from '../assets/Card/Union.svg'
  import { useEffect, useState } from "react"

  import { jwtDecode } from "jwt-decode"
  import { useDispatch, useSelector } from "react-redux";
  import { Header } from "./Header";
  import Footer from "./Footer";
  import { addCart, removeCart, removeOneItemCount } from "../slices/cartSlice";

  export const Cart = () => {
    let dispatch = useDispatch()
    let [CartData , setCartData] = useState(null);
    let [itemCount , setItemCount] = useState(0);
    let [price , setPrice] = useState(0)
    let [id , setId] = useState(null);
    let [checkedArr , setCheckedArr] = useState([])
    
    let token = useSelector(state => state.auth.token)
    useEffect(() => {
      if(token) {
        setId(jwtDecode(token).id);  
      }    
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      setCartData(storedCart);
    }, [token ]);

    useEffect(()=>{
      let checkedPrice = checkedArr.map(el => el.count*el.price).reduce((finalValue , item)=> finalValue + item, 0)

      setPrice(checkedPrice)
      let checkedCount = checkedArr.map(el => el.count).reduce((finalValue , item)=> finalValue + item, 0)
      setItemCount(checkedCount)
    },[checkedArr])

    let countIncrement=(card)=>{
      let updatedCart = CartData.map((item) =>
        item.id === card.id && item.userId === id
          ? { ...item, count: item.count + 1 }
          : item
      ); 
      let updatedCheck = checkedArr.map((item) =>
        item.id === card.id && item.userId === id
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
        item.id === card.id && item.userId === id && item.count >1
          ? { ...item, count: item.count - 1 }
          : item
      );
      let updatedCheck = checkedArr.map((item) =>
        item.id === card.id && item.userId === id && item.count >1
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
          item.id !== card.id && item.userId === id
          ?item
          :null
      )
      setCartData(deletes);
      localStorage.setItem('cart', JSON.stringify(deletes)); 
      
      dispatch(removeOneItemCount(card.count))
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

    return (
      <>
      <Header />
      <div className=" flex justify-center bg-[#FCF5DC]">
      <div className="flex gap-5 w-[1200px]   ">
        {/* cart items */}
        <div className=" flex flex-col items-center gap-5 py-5  w-[60%] ">
          <h1 className="bg-white w-full px-5 text-[34px] font-semibold rounded-lg">Cart</h1>
          {CartData? CartData.map((card,idx)=>{
            if(card.userId == id){
              return (
              <div className="relative flex gap-5 w-full items-center  h-[150px] px-6 bg-white rounded-lg " key={idx}>
                {/* check icon */}
                <div onClick={() => handleCheck(card)} className={`cursor-pointer w-7  h-7 flex justify-center items-center rounded-md ${checkedArr.some(item => item.id === card.id)? 'text-[#013D29] border-[#013D29]':'text-gray-300 border-gray-300'}  border-[2px] `}>
                  <i className="  fa-solid fa-check"></i>
                </div>
                {/* image */}
                <div className="w-[150px] h-[100px]  ">
                  <img className=" w-full h-full rounded-lg" src={card.image} alt="" />
                </div>
                {/* details */}
                <div className="flex gap-2 flex-col  h-[100px]   ">
                  <div className="  outfit flex flex-col ">
                    <h1 className="text-[16px] font-semibold">{card.title}</h1>
                    <p className="text-[16px] pt-3"><span className="outfit opacity-70">Price :</span> <span className="font-semibold">{card.price}$</span></p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <p className="text-[16px] outfit opacity-50">Quantity :</p> 
                    <button onClick={() => countDecrement(card)}  className="rounded-xl  w-8 h-8 bg-[#219653] text-white"><i className="text-[14px] fa-solid fa-minus"></i></button>
                    <p className=" w-5 flex items-center justify-center text-[16px]">{card.count}</p>
                    <button onClick={() => countIncrement(card)} className="rounded-xl w-8 h-8 bg-[#219653]  text-white"><i className="text-[14px] fa-solid fa-plus"></i></button>
                  </div>
                </div>
                {/* delete icon */}
                <div>
                  <i onClick={()=> handlRemove(card)} className="cursor-pointer absolute top-7 right-6 text-[red] fa-solid fa-trash"></i>
                </div>
              </div>
            )} return null;
          })
          :<p className="py-5  w-full rounded-none-lg text-center bg-white "> cart is empty</p>
        }
        </div>
        {/* Order Summary */}
        <div className="w-[40%] py-5">
          <div className="outfit text-[16px] bg-white h-full w-full rounded-lg p-5 flex flex-col gap-3  ">
            <p className="text-[20px]">Order Summary</p>
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
            <button className="w-full bg-[#013D29] text-white py-2 rounded-lg">PROCEED TO CHECKOUT ({itemCount})</button>
          </div>
        </div>    
      </div>
      </div>
      <Footer />
      </>
    )
  }