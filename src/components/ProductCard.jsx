import PropTypes from "prop-types";
import CardRating from "./CardRating"
// import Union from '../assets/Card/Union.svg'
import { useNavigate } from "react-router-dom";
// import { toast ,ToastContainer} from "react-toastify";
// import { jwtDecode } from "jwt-decode";
// import { useDispatch } from "react-redux";




export const ProductCard = ({data}) => {
  // let dispatch = useDispatch()
  // let token = localStorage.getItem('token')
  let navigate = useNavigate();
  let handleView = (id) =>{
    navigate(`/product/details/${id}`)
  }

    // let CartClick = async (card) => {
    //     if (!token) {
    //         return toast.error('You need to login first');
    //     }

    //     let carts = JSON.parse(localStorage.getItem('cart')) || [];
    //     let decodedToken = jwtDecode(token);
    //     let existingCartIndex = carts.findIndex(cart => cart.id === card.id && cart.userId === decodedToken.id);
        
    //     if (existingCartIndex !== -1 && decodedToken.id === carts[existingCartIndex].userId) {
    //         carts[existingCartIndex].count += 1;
    //         toast.info(`${card.title} count updated in cart`);
    //     } else {
    //         card.userId = decodedToken.id;
    //         card.count = 1;
    //         carts.push(card);
    //         toast.success(`${card.title} added to cart`);
    //     }
        
    //     localStorage.setItem('cart', JSON.stringify(carts));    
    //     dispatch({ type: 'ADD CART' });
    // };
  
  return (
    <div  className="pb-2  relateive shadow-2xl bg-white shadow-gray-300 rounded-lg overflow-hidden w-[276px] ">
    {/* image with heart icon view icon */}
    <div className="relative">
        {/* image */}
        <img className="w-full h-[250px] object-cover " src={data.productImageUrl} alt="" />
        {/* sale tag */}
        {data.productTag && 
            <div  className="absolute top-3 left-3 bg-[#DB4444] text-white px-2 py-2 rounded-full flex justify-end items-center gap-2">                    
                <p className="outfit text-[12px]">Flat {data.productTag}</p>
            </div>
        }

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
ProductCard.propTypes = {
  data: PropTypes.shape({
    _id:PropTypes.string.isRequired,
    productImageUrl: PropTypes.string.isRequired,
    rating: PropTypes.number,
    productTag: PropTypes.string,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired
  }).isRequired
};
