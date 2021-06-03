import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { clearCart } from "../../redux/cart/cart.actions";

const StripeCheckoutButton = ({ price, clearCart }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HwK6lI1XWSkPuvU1Qa0AfNlpSwiskH1hAgaalPmJo07gHhnLcIpYxatwwa73lkM4TXUfmuLUkvMNtSIeUu7iEJw00TlThGNQN";

  const onToken = (token) => {
    console.log(token);
    clearCart();
    alert("Payment successful");
  };

  return (
    <StripeCheckout
      label="Payment"
      name="Giangnam Coffee"
      billingAddress
      shippingAddress
      image="https://lh3.googleusercontent.com/p/AF1QipMKygiPjaqJQ9q_FrIS_1wjKrK3QuBYA1Bfr3X7=s1280-p-no-v1"
      description={`Your total is ${price}VND`}
      amount={priceForStripe}
      panelLabel="Payment"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
