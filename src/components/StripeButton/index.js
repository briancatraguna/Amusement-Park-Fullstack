import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { clearCartState, setTotalInvoiceAmount, setTotalUnpaidInvoiceAmount } from "../../redux/cartSlice";
import { postPayment } from "../../utils/api";
import { emitNotification } from "../../utils/emitNotification";

const StripeButton = ({totalAmount}) => {
	const accessToken = useSelector((state) => state.auth.accessToken);
	const dispatch = useDispatch();

	const publishableKey =
		"pk_test_51N1hlFGJhLy7hRLHRF8WDdftreXfhbFiHVd1C4iUPzrrmvr90gr9iFazHBPbYViQwM68JUKRV7Cpd5SlskHBtCQh00PgVHXgPb";

	const onToken = async (token) => {
		const body = {
			amount: totalAmount,
			token: token,
		};

		try {
			const response = await postPayment(accessToken, body);
			if (response.status === 200) {
				emitNotification("success", "Payment Successful!");
				dispatch(setTotalInvoiceAmount(0.0));
				dispatch(setTotalUnpaidInvoiceAmount(0.0));
				dispatch(clearCartState());
				return { success: true, data: response.data };
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			emitNotification(
				"error",
				"Payment Failed - " + error.response.data.message
			);
		}
	};
	return (
		<React.Fragment>
			<StripeCheckout
				label="Make Payment" //Component button text
				name="Voyage Of Amusement" //Modal Header
				description="Have a nice vacation day!"
				panelLabel="Pay" //Submit button in modal
				amount={totalAmount * 1} //Amount in cents $9.99
				currency="USD"
				token={onToken}
				stripeKey={publishableKey}
				image={require("../../assets/theme-park-image-home.jpeg")} //Pop-in header image
				billingAddress={true}
				shippingAddress={true}
				zipCode={true}
				locale="auto"
			/>
		</React.Fragment>
	);
};

export default StripeButton;
