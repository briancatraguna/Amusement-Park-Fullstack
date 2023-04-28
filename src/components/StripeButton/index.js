import React from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { postPayment } from "../../utils/api";

const StripeButton = (totalAmount) => {
	const accessToken = useSelector((state) => state.auth.accessToken);

	const publishableKey =
		"pk_test_51N1hlFGJhLy7hRLHRF8WDdftreXfhbFiHVd1C4iUPzrrmvr90gr9iFazHBPbYViQwM68JUKRV7Cpd5SlskHBtCQh00PgVHXgPb";

	const onToken = async (token) => {
		const body = {
			amount: totalAmount,
			token: token,
		};

		try {
			await postPayment(accessToken, body);
		} catch (error) {
			alert(error.response.data.message);
		}
	};
	return (
		<StripeCheckout
			label="Make Payment" //Component button text
			name="Voyage Of Amusement" //Modal Header
			description="Have a nice vacation day!"
			panelLabel="Pay" //Submit button in modal
			amount={totalAmount} //Amount in cents $9.99
			currency="USD"
			token={onToken}
			stripeKey={publishableKey}
			image={require("../../assets/theme-park-image-home.jpeg")} //Pop-in header image
			billingAddress={true}
			shippingAddress={true}
			zipCode={true}
			locale="auto"
		/>
	);
};

export default StripeButton;
