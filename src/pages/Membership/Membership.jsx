import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./Membership.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Membership = () => {
  return (
    <div className="text-center mt-4">
      <div>
        <h1 className="text-3xl font-semibold text-slate-700">
          Support us by joining our Membership Program.
        </h1>
        <p className="text-lg font-medium text-slate-600 mt-4">
          Be our premium member and achieve Gold badge. Just pay only 400$ for
          our lifetime membership.
        </p>
      </div>

      <div className="mt-10">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Membership;
