//PaymentForm.js
import { removeOneItemCount } from "../slices/cartSlice";
import { useDispatch ,useSelector} from "react-redux";
import  { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../components/apis/BaseUrl";
import { ORDERS_MIDDLE_POINT } from "../components/apis/MiddlePoint";
import { ORDER_SUBMIT_END_POINT } from "../components/apis/EndPoint";
import axios from "axios";
import { toast } from "react-toastify";


    // const PAYMENT_SUCESS_URL = "http://localhost:5173/";

const PaymentForm = ({selectedProducts , address}) => {
    let URL_FOR_ORDER = BASE_URL+ORDERS_MIDDLE_POINT+ORDER_SUBMIT_END_POINT
    let order =  {
        products:selectedProducts.map(((el )=> {
            return {
                productId : el._id, 
                quantity: el.count , 
                price : el.productPrice
             }
        } )),
        totalAmount: selectedProducts.reduce((accumulator , value)=>{
            let tPrice = value.count * value.productPrice;
            return  accumulator + tPrice
        }, 0) ,
        paymentMethod:'credit_card',
        orderStatus: "pending",
        barcode: "",
        shippingAddress:address
    }
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token} = useSelector(state=>state.auth)
    

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);
        setMessage("Payment in Progress");

        try{
            await stripe.confirmPayment({
                elements,
                 redirect: "if_required"
                // confirmParams: {
                //     return_url: PAYMENT_SUCESS_URL,
                // },
            });
            await axios.post(URL_FOR_ORDER , order, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            let item = JSON.parse(localStorage.getItem('cart'))
            let filterItem = item.filter((el) => !selectedProducts.some((product) => product.id === el.id))
            let count= item.reduce((accumulater , value)=> accumulater + value.count, 0)
            localStorage.setItem('cart', JSON.stringify(filterItem)); 
            dispatch(removeOneItemCount(count))
            navigate('/')
        }catch(error){
            toast.error(error.response.data.message)
            console.log(error)
            setMessage("Some Error Occurred !!")
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="card w-100 bg-base-100 bg-white outfit rounded-lg">
                    <div className="card-body p-6">
                        <h1 className="card-title font-bold text-2xl mb-4 justify-center">
                            Complete your payment here!
                        </h1>
                        <PaymentElement />
                        <div className="card-actions justify-center">
                            <button
                                className="bg-[#013D29] text-white rounded-xl px-4 py-2 mt-6"
                                disabled={isLoading || !stripe || !elements}
                            >
                                {isLoading ? "Loading..." : "Pay now"}
                            </button>
                        </div>
                        {message && <div>{message}</div>}
                    </div>
                </div>
            </form>
        </div>
    );
};

PaymentForm.propTypes ={
    selectedProducts: PropTypes.arrayOf({
        count: PropTypes.number.isRequired,
        productPrice:PropTypes.number.isRequired,
        _id:PropTypes.string.isRequired,
        ProductImageUrl: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
    }),
    address: PropTypes.string.isRequired,
}

export default PaymentForm;
