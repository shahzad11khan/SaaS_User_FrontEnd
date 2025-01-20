import {useEffect, useState} from "react";
import CardRating from "./CardRating"
import Union from '../assets/Card/Union.svg'
import Location from '../assets/Card/Location.svg'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { setCartCount, resetCartCount, addCart } from "../slices/cartSlice";
import { removeFavourite ,setFavouriteCount,resetFavouriteCount, addFavourite,} from "../slices/favoriteSlice";
// import axios from "axios";

import { jwtDecode } from "jwt-decode"
import { toast , ToastContainer } from "react-toastify";

function Card({data}){
     
    let token = useSelector(state => state.auth.token)
    let dispatch = useDispatch();

    let [more, setMore] = useState(false);
    let [heart , setHeart] = useState(false);



    useEffect(() => {
        if(token){
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const carts = JSON.parse(localStorage.getItem('cart')) || [];

            const authFavorites= favorites.filter(el=> el.userId === userId)
            const authCarts= carts.filter(el=> el.userId === userId)

            const cartCount =  authCarts.reduce((total, item) => total + item.count, 0);

            const isLiked = authFavorites.some(fav => fav.id === data.id);
            setHeart(isLiked);

            dispatch(setFavouriteCount(authFavorites.length))
            dispatch(setCartCount(cartCount))

        }else{
            dispatch(resetFavouriteCount()) 
            dispatch(resetCartCount()) 
        }
      }, [data.id ,token ,dispatch]);

    let heartClick = async(card) => {
        try{
            if(!token) {
                return toast.error(' you need to login first')
            }

            const decodedToken = jwtDecode(token);
            card.userId =  decodedToken.id
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if(heart === false){
                favorites.push(card)
                localStorage.setItem('favorites', JSON.stringify(favorites))
                dispatch(addFavourite())
            } else{
                let updatedArr=  favorites.filter(fav => fav.id != card.id);
                localStorage.setItem('favorites' , JSON.stringify(updatedArr))
                dispatch(removeFavourite())
             }

            setHeart(!heart)
        }catch(err){
            console.log(err)
        }    
    }

    let CartClick = async (card) => {
        if (!token) {
            return toast.error('You need to login first');
        }

        let carts = JSON.parse(localStorage.getItem('cart')) || [];
        let decodedToken = jwtDecode(token);
        let existingCartIndex = carts.findIndex(cart => cart.id === card.id && cart.userId === decodedToken.id);
        
        if (existingCartIndex !== -1 && decodedToken.id === carts[existingCartIndex].userId) {
            carts[existingCartIndex].count += 1;
            toast.info(`${card.title} count updated in cart`);
        } else {
            card.userId = decodedToken.id;
            card.count = 1;
            carts.push(card);
            toast.success(`${card.title} added to cart`);
        }

        localStorage.setItem('cart', JSON.stringify(carts));    
        dispatch(addCart());
    };
    

    return(
        <div  className=" shadow-2xl bg-white shadow-gray-100 rounded-lg overflow-hidden ">
            <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
            {/* image with heart icon */}
            <div className="relative">
                <img className="w-[380px] h-[200px] object-cover " src={data.image} alt="" />
                <div className="absolute top-4 right-4 w-[30px] h-[30px] bg-white rounded-full flex justify-center items-center">
                    <svg onClick={()=> heartClick(data)} className={`w-6 h-6 cursor-pointer ${heart ? 'fill-[#ff0000] ' : ''}`} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path style={{stroke: heart ? "#ff0000" : ""}} d="M2.39192 10.1621C1.49775 7.37242 2.54275 4.18387 5.47359 3.24038C7.01525 2.74324 8.71692 3.03636 9.99859 3.99984C11.2111 3.06301 12.9753 2.74657 14.5153 3.24038C17.4461 4.18387 18.4978 7.37242 17.6044 10.1621C16.2128 14.5839 9.99859 17.9898 9.99859 17.9898C9.99859 17.9898 3.83025 14.6355 2.39192 10.1621Z" stroke="#130F26"/>
                        <path style={{stroke: heart ? "#ff0000" : ""}} d="M13.332 6.08398C14.2237 6.37232 14.8537 7.16815 14.9295 8.10232" stroke="#130F26" />
                    </svg>
                </div>
            </div>

            {/* rating & sale */}
            <div className="flex justify-between pt-3 px-3">
                <div className="flex justify-start items-center">
                    <CardRating rating={data.rating}/>
                </div>
                <div  className="flex justify-end items-center gap-2">
                    <img src={Union} alt="" />
                    <p className="outfit text-[12px]">Flat {data.saleOff}% Off</p>
                </div>
            </div>

            {/* title & location */}
            <div  className="relative flex flex-col gap-1 pt-3 px-3">
                <h1 className="text-[24px] font-[600] outfit">{data.title}</h1>
                <p className="flex items-center gap-2 text-[14px]  outfit ">
                    <img className="w-[20px] h-[20px]" src={Location} alt="" />
                    <span className="opacity-50">{data.location[0].country},{data.location[0].city}</span>
                </p>
                <p className="flex items-center gap-2 text-[14px] outfit">
                    <img className="w-[20px] h-[20px]" src={Location} alt="" />
                    <span className="opacity-50">{data.location[0].country},{data.location[0].city}</span> 
                    <span onClick={()=> setMore(!more)} className=" cursor-pointer text-[#219653]">+{data.location.length}more</span>
                </p>
                {/* more location */}
                {more?                
                <div className="shadow-xl shadow-gray-300 absolute top-[-180px] right-20 bg-white px-2 py-4 border border-[#219653] rounded-lg flex flex-col gap-2 ">
                    <p className="text-[20px] outfit font-bold">Locations</p>
                    {data?.location.map((el ,idx) => (
                        <p key={idx} className="flex  items-center gap-2 text-[14px] outfit ">
                            <img className="w-[20px] h-[20px]" src={Location} alt="" />
                            <span className="opacity-50">{el.country},{el.city}</span>
                        </p>
                    ))}
                </div>
                :null}
            </div>
            <hr className="mt-3 mx-3 "/>
            {/* user & button */}
            <div className="flex justify-between px-3 py-3">
                <img className="rounded-full w-[36px] h-[36px]" src={data.userImg} alt="" />
                <button onClick={()=>CartClick(data)} className="bg-[#219653] py-1 px-3 text-white outfit rounded-full">
                    Add To Cart
                </button>
            </div>
        </div>
    )
}

Card.propTypes = {
  data: PropTypes.shape({
    id:PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    saleOff: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.arrayOf(
      PropTypes.shape({
        country: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired
      })
    ).isRequired,
    userImg: PropTypes.string.isRequired
  }).isRequired
};

export default Card

