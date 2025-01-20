import PropTypes from "prop-types";
import CardRating from "./CardRating"
import Union from '../assets/Card/Union.svg'
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
    <div className="w-[280px] ">
      {/* <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" /> */}
        {/* image */}
        <div className="relative">
            <img className=" w-full h-[150px] object-cover border rounded-lg" src={data.image} alt="" />
        </div>
        {/* title  */}
        <div className="flex justify-between pt-3 px-3">
            <div className="flex justify-start items-center">
                <CardRating  rating={data.rating}/>
            </div>
            <div  className="flex justify-end items-center gap-2">
                <img src={Union} alt="" />
                <p className="outfit text-[12px]">Flat {data.sale}% Off</p>
            </div>
        </div>
        {/* rating & sale */}    
        <div  className="relative flex flex-col gap-1 pt-3 px-3">
            <h1 className="text-[16px] font-[600] outfit">{data.title}</h1>
        </div>
        {/* price & button */}
        <div className="flex justify-between  items-center px-3 py-3">
          <h1 className="text-[16px] font-[600] outfit">$ {data.price} </h1>
          <span className="flex gap-2">
            <button onClick={()=> handleView(data.id)}  className="bg-[#219653] py-1 px-3 text-white outfit rounded-full">view</button>
            {/* <button onClick={()=>CartClick(data)}  className="bg-[#219653] py-1 px-3 text-white outfit rounded-full">
                Add To Cart
            </button> */}
          </span>
        </div>
    </div>
  )
}
ProductCard.propTypes = {
  data: PropTypes.shape({
    id:PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    sale: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
};
