import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "./Checkout.css";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState("1");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0 && price < 1000000) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleInputChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "annonymous",
            name: user?.displayName || "annonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError.message);
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        Swal.fire({
          title: "Payment Successful!",
          icon: "success",
        });
        const payment = {
          email: user.email,
          name: user.displayName,
          transactionId: paymentIntent.id,
          amount: price,
          data: new Date(),
          status: "success",
        };
        try {
          const { data } = await axiosSecure.post("/funds", payment);
          navigate("/fundings");
          return data;
        } catch (err) {
          toast.error(err.message);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Amount
        </label>
        <input
          value={price}
          onChange={handleInputChange}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Card Informations
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <p className="text-red-500 mt-2 text-sm">{error}</p>

      <div className="flex justify-center">
        <button
          className="btn btn-neutral text-white mt-5 px-7"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
