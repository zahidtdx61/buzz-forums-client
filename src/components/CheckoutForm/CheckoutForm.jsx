import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import "./CheckoutForm.css";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [price, setPrice] = useState(400);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // fetch client secret
    getClientSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   get clientSecret
  const getClientSecret = async () => {
    const { data } = await axiosSecure.post(
      `/payment/create-checkout-session`,
      price
    );
    console.log("clientSecret from server--->", data);
    setClientSecret(data?.data?.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      // 1. Create payment info object
      const paymentInfo = {
        ...bookingInfo,
        roomId: bookingInfo._id,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      delete paymentInfo._id;
      console.log(paymentInfo);
      try {
        // 2. save payment info in booking collection (db)
        const { data } = await axiosSecure.post("/booking", paymentInfo);
        console.log(data);

        // 3. change room status to booked in db
        await axiosSecure.patch(`/room/status/${bookingInfo?._id}`, {
          status: true,
        });

        toast.success("Room Booked Successfully");
        navigate("/dashboard/my-bookings");
      } catch (err) {
        console.log(err);
      }
    }

    setProcessing(false);
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <div className="max-w-screen-md mx-auto">
          <CardElement
            className="border border-gray-300 p-2 rounded-md mt-2 mx-auto"
            options={{
              style: {
                base: {
                  margin: "auto",
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

          <div className="flex mt-2 justify-around">
            <button
              disabled={!stripe || !clientSecret || processing}
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              {processing ? (
                <ImSpinner9 className="animate-spin m-auto" size={24} />
              ) : (
                `Pay ${400}`
              )}
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
