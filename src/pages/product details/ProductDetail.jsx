import { useParams } from "react-router-dom"
import { Header } from "../../components/Header";
// import data1 from '../../assets/json/dinning.json'
// import data2 from '../../assets/json/entertainment.json'
// import data3 from '../../assets/json/homeServices.json'
// import data4 from '../../assets/json/salon.json'
import CardRating from "../../components/CardRating";
// import Union from '../../assets/Card/Union.svg'
import Footer from "../../components/Footer";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"
import { addCart, addOneItemCount } from "../../slices/cartSlice";
    


export const ProductDetail = () => {
    let {products} = useSelector(state => state.product)

    let [count ,setCount] = useState(1);
    let {id} = useParams();
    let token = useSelector(state => state.auth.token)
    let dispatch = useDispatch();
    let [heart , setHeart] = useState(false);


    // let data = [...data1, ...data2, ...data3, ...data4];
    let filterArr = products?.filter(item => item._id === id);
    console.log(filterArr)
    let details =filterArr && filterArr[0];

    let incrementCount = () => {
        setCount(preValue => preValue + 1)
    }
    
    let decrementCount = () => {
        setCount(preValue => preValue>1 ? preValue - 1 : 1)
    }
    let CartClick = async (card) => {
        if (!token) {
            return toast.error('You need to login first');
        }

        let carts = JSON.parse(localStorage.getItem('cart')) || [];
        let decodedToken = jwtDecode(token);
        console.log(carts)
        let existingCartIndex = carts.findIndex(cart => cart._id === card._id && cart.clintId === decodedToken.userId);
        
        if (existingCartIndex !== -1 && decodedToken.userId === carts[existingCartIndex].clintId) {
            carts[existingCartIndex].count += count;
            toast.info(`${card.productName} count updated in cart`);
        } else {
            card.userId = decodedToken.id;
            card.count = count;
            carts.push(card);
            toast.success(`${card.productName} added to cart`);
        }

        localStorage.setItem('cart', JSON.stringify(carts));    
        if(count === 1){
            dispatch(addCart());
        }else(
            dispatch(addOneItemCount(count))
        )
    };
    
  return (
    <>
    <Header />
    <div className="flex justify-center ">
        <ToastContainer  position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
        {details && <div className="flex  gap-10 w-[1200px] p-10">
            {/* image */}
            <div className="[50%] ">
                <img className="rounded-lg w-full h-[450px] " src={details?.productImageUrl} alt="" />
            </div>
            {/* details */}
            <div className="w-[50%]  flex flex-col">
                {/* product title */}
                <h2 className="text-[30px] outfit font-semibold">{details?.productName}</h2>
                {/* poduct rating & stock */}
                <span className="flex gap-3 items-center">
                    <h2 className="w-20 flex items-center"><CardRating  rating={details?.rating} />({details?.rating})</h2>
                    <span className="w-[2px] h-5 bg-[#c4c2c2]"></span>
                    <span className="text-[#00FF66]">{details?.productQuantity>5 && 'InStock'}</span>
                </span> 
                {/* product price */}
                <h2  className="outfit text-[30px]">${details?.productPrice}</h2>
                {/* product descrioption */}
                <span className="text-justify">
                    {details?.productDescription}
                </span>
                <span className="flex mt-5 h-10 rounded-full overflow-hidden items-center gap-3 w-[145px] border-[2px] border-[#c4c2c2]">
                        {/* <p className="text-[20px] outfit opacity-50">Quantity :</p>  */}
                        <button onClick={decrementCount} className="  w-10 h-10 border-r-[2px] border-[#c4c2c2]  "><i className="fa-solid fa-minus"></i></button>
                        <p className=" w-10 flex items-center justify-center text-[20px] h-10">{count}</p>
                        <button onClick={incrementCount} className=" w-10 h-10  border-l-[2px] border-[#c4c2c2] bg-[#DB4444] text-white"><i className="fa-solid fa-plus"></i></button>
                    </span>
                <span className="w-full h-[2px] bg-[#c4c2c2] my-5"></span>
                <span className="flex justify-between gap-5 items-center ">
                    <button className=" bg-[#DB4444] py-[7px] px-5 text-[18px] text-white outfit rounded-full">Buy Now</button>
                    <span className="flex gap-5 justify-center items-center h-10">
                    <button onClick={()=> setHeart(!heart)} className="bg-[#DB4444] flex items-center py-[7px] px-5 text-[18px] text-white outfit rounded-full">     
                        <svg className={` rounded-full border-0 cursor-pointer ${heart ? 'fill-[#ff0000] ' : 'fill-white'}`} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path style={{stroke: heart ? "#ff0000" : ""}} d="M2.39192 10.1621C1.49775 7.37242 2.54275 4.18387 5.47359 3.24038C7.01525 2.74324 8.71692 3.03636 9.99859 3.99984C11.2111 3.06301 12.9753 2.74657 14.5153 3.24038C17.4461 4.18387 18.4978 7.37242 17.6044 10.1621C16.2128 14.5839 9.99859 17.9898 9.99859 17.9898C9.99859 17.9898 3.83025 14.6355 2.39192 10.1621Z" stroke="#130F26"/>
                            <path style={{stroke: heart ? "#ff0000" : ""}} d="M13.332 6.08398C14.2237 6.37232 14.8537 7.16815 14.9295 8.10232" stroke="#130F26" />
                        </svg>       
                        <span className="pl-1"> favorite</span>
                    </button>
                        <button onClick={() => CartClick(details)} className="bg-[#DB4444]  py-[7px] px-5 text-[18px] text-white outfit rounded-full">              
                            <i className=" text-[20px] fa-solid fa-basket-shopping"></i>
                            <span className="pl-1">add to cart</span> 
                        </button>
                    </span>
                </span>
            </div>
        </div>}
    </div>
    <Footer />
    </>
  )
}
