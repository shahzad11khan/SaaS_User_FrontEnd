//StripePayment.js

import  { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import axios from 'axios'
import PropTypes from "prop-types";

const stripe = loadStripe('pk_test_51Q9l8LP5ENTV0Z97wtRzdCkSUIymk0ycjYHoNP650fNBvvOe352X3mcRnmg4klvUoBCBdRC7J79XJJAyAJ7Wbo3K00NP4y8hiN');

const StripePayment = ({selectedProducts , address}) => {

    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {   
        axios
            .post("http://localhost:8080/create-payment-intent", {selectedProducts})
            .then((resp) => setClientSecret(resp.data.clientSecret));
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
