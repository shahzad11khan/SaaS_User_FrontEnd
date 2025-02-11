import {useEffect, useState} from "react";
import CardRating from "./CardRating"
import Union from '../assets/Card/Union.svg'
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
    let [heart , setHeart] = useState(false);

    useEffect(() => {
        if(token){
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const carts = JSON.parse(localStorage.getItem('cart')) || [];

            const authFavorites= favorites.filter(el=> el.clintId === userId)
            const authCarts= carts.filter(el=> el.clintId === userId)

            const cartCount =  authCarts.reduce((total, item) => total + item.count, 0);
            const isLiked = authFavorites.some(fav => fav._id === data._id);
            setHeart(isLiked);

            dispatch(setFavouriteCount(authFavorites.length))
            dispatch(setCartCount(cartCount))

        }else{
            dispatch(resetFavouriteCount()) 
            dispatch(resetCartCount()) 
        }
      }, [data._id ,token ,dispatch , data]);

    let heartClick = async(card) => {
        try{
            if(!token) {
                return toast.error(' you need to login first')
            }
            const decodedToken = jwtDecode(token);
            console.log(card)
            card.clintId =  decodedToken.userId
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

    return(
        <div  className=" shadow-2xl bg-white shadow-gray-100 rounded-lg overflow-hidden ">
            <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
            {/* image with heart icon */}
            <div className="relative">
                <img className="w-[330px] h-[200px] object-cover " src={data.productImageUrl} alt="" />
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
                    <CardRating rating={data?.rating}/>
                </div>
                <div  className="flex justify-end items-center gap-2">
                    <img src={Union} alt="" />
                    <p className="outfit text-[12px]">Flat {data.productTag}</p>
                </div>
            </div>

            {/* title & location */}
            <div  className="relative flex flex-col gap-1 pt-3 px-3">
                <h1 className="text-[24px] font-[600] outfit">{data.productName}</h1>
                <p className="outfit font-bold text-[18px]">$ {data.productPrice}</p>
            </div>
            <hr className="mt-3 mx-3 "/> 
            {/* button */}
            <div className="flex justify-end px-3 py-3">
                    <button onClick={()=>CartClick(data)} className="bg-[#219653] py-1 px-3 text-white outfit rounded-full">
                    Add To Cart
                </button>
            </div>
        </div>
    )
}

Card.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productImageUrl: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    productQuantity: PropTypes.number.isRequired,
    productSubCategory: PropTypes.string,
    productTag: PropTypes.string,
    rating: PropTypes.number,
    productCategory: PropTypes.string.isRequired,
  }).isRequired
};

export default Card

