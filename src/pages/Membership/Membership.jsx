import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import Loader from "../../components/Loader/Loader";
import useRole from "../../hooks/useRole";
import "./Membership.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Membership = () => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) return <Loader />;

  return (
    <div className="text-center mt-4 mb-8">
      <div className="w-[95%] max-w-screen-sm mx-auto">
        <img
          src="https://i.ibb.co/9rC4F0b/5364326.jpg"
          alt="join-us-banner"
          className="w-full h-full"
        />
      </div>
      <div>
        <h1 className="text-3xl font-semibold text-slate-700">
          Support us by joining our Membership Program.
        </h1>
        <p className="text-lg font-medium text-slate-600 mt-4">
          Be our premium member and achieve Gold badge. Just pay only 400$ for
          our lifetime membership.
        </p>

        {
          role?.badge === "gold" && (
            <div className="mt-4">
              <img
                src="https://i.ibb.co/m5nn4xs/golden.png"
                alt="gold-badge"
                className="w-16 h-16 mx-auto"
              />
              <p className="text-lg font-semibold text-gold-500 mt-2">
                You are already a Gold Member. But if you want to support us more, you can donate.
              </p>
            </div>
          ) 
        }
      </div>

      <div className="mt-10 text-blue-400">
        <p>Please fill up necessary info to be a Gold Member.</p>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Membership;
