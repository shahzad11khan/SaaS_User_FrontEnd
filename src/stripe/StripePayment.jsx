//StripePayment.js

import  { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import axios from 'axios'
import PropTypes from "prop-types";

const stripe = loadStripe('pk_test_51Q9l8LP5ENTV0Z97wtRzdCkSUIymk0ycjYHoNP650fNBvvOe352X3mcRnmg4klvUoBCBdRC7J79XJJAyAJ7Wbo3K00NP4y8hiN');

const StripePayment = ({selectedProducts}) => {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        axios
            .post("http://localhost:8080/create-payment-intent", {selectedProducts})
            .then((resp) => setClientSecret(resp.data.clientSecret));
    }, [selectedProducts]);
    console.log(clientSecret)

    const options = {
        clientSecret,
        // theme: "stripe"
    };

    return (
        clientSecret && (
            <Elements stripe={stripe} options={options}>
                <PaymentForm selectedProducts={selectedProducts}></PaymentForm>
             </Elements>
        )
    );
};

StripePayment.propTypes ={
    selectedProducts: PropTypes.arrayOf({
    count: PropTypes.number.isRequired,
    price:PropTypes.number.isRequired,
    id:PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    sale: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.arrayOf(
        PropTypes.shape({
        country: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired
        })
    ),
    userImg: PropTypes.string.isRequired
    }),
}

export default StripePayment;
