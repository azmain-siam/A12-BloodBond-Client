import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const DonateFund = () => {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-3xl font-extrabold text-center text-gray-900 md:text-4xl ">
        Donate Fund
      </h2>
      <div className="w-[50%] mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default DonateFund;
