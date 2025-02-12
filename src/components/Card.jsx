import {useEffect, useState} from "react";
import CardRating from "./CardRating"
// import Union from '../assets/Card/Union.svg'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { setCartCount, resetCartCount, addCart } from "../slices/cartSlice";
import { removeFavourite ,setFavouriteCount,resetFavouriteCount, addFavourite,} from "../slices/favoriteSlice";
// import axios from "axios";

import { jwtDecode } from "jwt-decode"
import { toast , ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Card({data}){
    const navigate = useNavigate()
    
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
            let newCard = { ...card, clintId: decodedToken.userId };

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if(heart === false){
                favorites.push(newCard)
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
            let updatedCard ={...card,clintId:decodedToken.userId , count:1};
            carts.push(updatedCard);
            toast.success(`${card.productName} added to cart`);
        }
        localStorage.setItem('cart', JSON.stringify(carts));    
        dispatch(addCart());
    }
    let handleView = (id) =>{
        navigate(`/product/details/${id}`)
      }

    return(
        <div  className="pb-2 relative shadow-2xl bg-white shadow-gray-300 rounded-lg overflow-hidden w-[276px] ">
            <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
            {/* image with heart icon view icon */}
            <div className="relative">
                {/* image */}
                <img className="w-full h-[250px] object-cover " src={data.productImageUrl} alt="" />
                <div className="absolute top-3 right-3 flex flex-col  gap-3 justify-center items-center">
                    {/* heart icon */}
                    <svg onClick={()=> heartClick(data)} className={` bg-white w-8 h-8 p-1 rounded-full cursor-pointer ${heart ? 'fill-[#ff0000] ' : ''}`} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path style={{stroke: heart ? "#ff0000" : ""}} d="M2.39192 10.1621C1.49775 7.37242 2.54275 4.18387 5.47359 3.24038C7.01525 2.74324 8.71692 3.03636 9.99859 3.99984C11.2111 3.06301 12.9753 2.74657 14.5153 3.24038C17.4461 4.18387 18.4978 7.37242 17.6044 10.1621C16.2128 14.5839 9.99859 17.9898 9.99859 17.9898C9.99859 17.9898 3.83025 14.6355 2.39192 10.1621Z" stroke="#130F26"/>
                        <path style={{stroke: heart ? "#ff0000" : ""}} d="M13.332 6.08398C14.2237 6.37232 14.8537 7.16815 14.9295 8.10232" stroke="#130F26" />
                    </svg>
                    {/* eye icon */}
                    <i onClick={()=> handleView(data._id)}  className=" bg-white flex justify-center items-center  w-8 h-8 p-1 rounded-full cursor-pointer fa-regular fa-eye"></i>
                </div>
                {/* sale tag */}
                {data.productTag && 
                    <div  className="absolute top-3 left-3 bg-[#DB4444] text-white px-2 py-2 rounded-full flex justify-end items-center gap-2">                    
                        <p className="outfit text-[12px]">Flat {data.productTag}</p>
                    </div>
                }
                {/* add to cart Button */}
                <button onClick={()=>CartClick(data)} className="absolute  bottom-0 w-full bg-[black] py-2 px-3 text-white outfit ">
                    Add To Cart
                </button>
            </div>


            <h1 className="px-2 text-[20px] font-[400] outfit">{data.productName}</h1>

            {/* title and price */}
            <div className="flex justify-between items-end px-2">
            <div  className=" flex flex-col  h-auto]">
                <div className="flex flex-wrap justify-start gap-1 items-center">                
                    <CardRating rating={data?.rating}/>
                </div>
                <p className="outfit font-[600] text-[#DB4444] text-[18px]">${data.productPrice}</p>
            </div>
            <button onClick={()=> handleView(data._id)}  className=" bg-[black] py-1 px-3 rounded-full text-white outfit ">
                view Product
            </button> 
            </div>
       
        <div >
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

