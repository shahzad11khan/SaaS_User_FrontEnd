//StripePayment.js

import  { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import axios from 'axios'
import PropTypes from "prop-types";
import { BASE_URL } from "../components/apis/BaseUrl";
import { PAYMENT_INTENT_END_POINT } from "../components/apis/EndPoint";
import { PAYMENT_INTENT_MIDDLE_POINT } from "../components/apis/MiddlePoint";

// const stripe = loadStripe('pk_test_51Q9l8LP5ENTV0Z97wtRzdCkSUIymk0ycjYHoNP650fNBvvOe352X3mcRnmg4klvUoBCBdRC7J79XJJAyAJ7Wbo3K00NP4y8hiN');
const stripe = loadStripe('pk_test_51QtXYJRv9u3xa58sbyLDr9Ys2AswGO7bF5z4j5MeUpnwcwneqnyIHCmNT03J4L7jD774PRvursj3ZBhX4OXuEhda00wJtQ3Vd9');

const StripePayment = ({selectedProducts , address}) => {
    console.log(selectedProducts)

    const [clientSecret, setClientSecret] = useState(null);

    const calculateTotalOrderAmount = (items) => {
        let  totalAmount = items.reduce((accumulator , value)=>  {
          let price =  value.productPrice*value.count
          return accumulator + price
        },0);
        return totalAmount * 100
      };
    useEffect(() => {   
        const URL = BASE_URL + PAYMENT_INTENT_MIDDLE_POINT + PAYMENT_INTENT_END_POINT
        
        let amount  = calculateTotalOrderAmount(selectedProducts);
        let currency = 'usd';
        axios
            .post(URL , {amount , currency})
            .then((resp) => {console.log(resp); setClientSecret(resp.data.clientSecret)});
    }, [selectedProducts]);

    const options = {
        clientSecret,
        // theme: "stripe"
    };

    return (
        clientSecret && (
            <Elements stripe={stripe} options={options}>
                <PaymentForm address={address} selectedProducts={selectedProducts}></PaymentForm>
             </Elements>
        )
    );
};

StripePayment.propTypes ={
    selectedProducts: PropTypes.arrayOf({
        count: PropTypes.number.isRequired,
        productPrice:PropTypes.number.isRequired,
        _id:PropTypes.string.isRequired,
        ProductImageUrl: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
    }),
    address: PropTypes.string
}

export default StripePayment;
