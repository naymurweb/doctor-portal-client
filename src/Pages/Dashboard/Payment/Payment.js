import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);
const Payment = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();
  const { treatment, price, slot, appointmentDate } = booking;
   if (navigation.state === "loading") {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="my-5 text-3xl font-semibold">Payment for {treatment}</h1>
      <p>
        Please pay <strong>${price}</strong> your apporment on {appointmentDate}{" "}
        at {slot}
      </p>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
