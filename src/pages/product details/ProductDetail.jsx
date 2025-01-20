import { useParams } from "react-router-dom"
import { Header } from "../../components/Header";
import data1 from '../../assets/json/dinning.json'
import data2 from '../../assets/json/entertainment.json'
import data3 from '../../assets/json/homeServices.json'
import data4 from '../../assets/json/salon.json'
import CardRating from "../../components/CardRating";
import Union from '../../assets/Card/Union.svg'
import Footer from "../../components/Footer";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"
import { addCart, addOneItemCount } from "../../slices/cartSlice";
    


export const ProductDetail = () => {
    let [count ,setCount] = useState(1);
    let {id} = useParams();
    let token = useSelector(state => state.auth.token)
    let dispatch = useDispatch();

    let data = [...data1, ...data2, ...data3, ...data4];
    let filterArr = data.filter(item => item.id === id);
    let details = filterArr[0];

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
        let existingCartIndex = carts.findIndex(cart => cart.id === card.id && cart.userId === decodedToken.id);
        
        if (existingCartIndex !== -1 && decodedToken.id === carts[existingCartIndex].userId) {
            carts[existingCartIndex].count += count;
            toast.info(`${card.title} count updated in cart`);
        } else {
            card.userId = decodedToken.id;
            card.count = count;
            carts.push(card);
            toast.success(`${card.title} added to cart`);
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
        <div className="flex  gap-10 w-[1200px] p-10">
            <div>
                <img className="rounded-lg w-[450px] h-[450px] " src={details.image} alt="" />
            </div>
            <div className="py-5  flex flex-col gap-5">
                <span className="flex gap-3 items-center">
                    <p className="text-[20px] outfit opacity-50">Title :</p> 
                    <h2 className="text-[36px] outfit font-semibold">{details.title}</h2>
                </span>
                <span className="flex gap-3 items-center">
                    <p className="text-[20px] outfit opacity-50">Raitng :</p> 
                    <h2 className="w-20 flex items-center"><CardRating  rating={details.rating} />({details.rating})</h2>
                </span> 
                <span className="flex gap-3 items-center">
                    <p className="text-[20px] outfit opacity-50">Sale :</p> 
                    <div  className="flex justify-end items-center gap-2">
                        <img src={Union} alt="" />
                        <p className="outfit text-[20px]">Flat {details.sale}% Off</p>
                    </div>
                </span>
                <span className="flex gap-3 items-center">
                    <p className="text-[20px] outfit opacity-50">Price :</p>
                     <h2  className="outfit text-[20px]">{details.price}$</h2>
                </span>
                <span className="flex gap-3 items-center">
                    <p className="text-[20px] outfit opacity-50">Category :</p> 
                    <h2 className="outfit text-[20px]">{details.category}</h2>
                </span>
                <span className="flex gap-3 items-center">
                    <p className="text-[20px] outfit opacity-50">Quantity :</p> 
                    <button onClick={decrementCount} className="rounded-xl  w-10 h-10 bg-[#219653] text-white"><i className="fa-solid fa-minus"></i></button>
                    <p className=" w-10 flex items-center justify-center text-[20px]">{count}</p>
                    <button onClick={incrementCount} className="rounded-xl w-10 h-10 bg-[#219653]  text-white"><i className="fa-solid fa-plus"></i></button>
                </span>
                <span className="flex gap-5 justify-center items-center h-[100px]">
                    <button className=" bg-[#013D29] py-[10px] px-5 text-[18px] text-white outfit rounded-full">Buy Now</button>
                    <button onClick={() => CartClick(details)} className="bg-[#013D29]  py-[10px] px-5 text-[18px] text-white outfit rounded-full">Add to Card</button>
                </span>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}
