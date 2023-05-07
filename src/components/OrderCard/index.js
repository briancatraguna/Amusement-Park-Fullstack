import React from "react";
import { Chip } from "@mui/material";
import "./style.css";

export const OrderCard = (props) => {
	const price = `$${props.price.toFixed(2)}`;
	const parkingTimeIn = new Date(props.parkingTimeIn);
	const parkingTimeOut = new Date(props.parkingTimeOut);
	const invoiceDate = new Date(props.invoiceDate).toDateString();
	const showDate = new Date(props.showDate)?.toDateString();
	let isPaidTag;

	if (props.isPaid === 0) {
		isPaidTag = <div className="notPaid">NOT PAID</div>;
	}

	return (
		<li className="order">
			{isPaidTag}
			<div className="row">
				<div className="field invoiceDate">
					<label>Invoice Date:</label>
					<div>{invoiceDate}</div>
				</div>
				<div className="field totalPrice">
					<label>Total:</label>
					<div className="price">{price}</div>
				</div>
				<div className="field invoiceId">
					<div>Order #{props.invoiceId}</div>
				</div>
			</div>

			<hr />

			<div className="row2-col1">
				<Chip
					label={props.name}
					color={
						props.name === "Parking"
							? "info"
							: props.name === "Entry Ticket"
							? "secondary"
							: props.name === "Show"
							? "primary"
							: "warning"
					}
				/>
			</div>

			<div className="row2-col2">
				{props.visitorName && (
					<div className="field">
						<label>Visitor Name:</label>
						<div>{props.visitorName}</div>
					</div>
				)}
				{props.parkingTimeIn && (
					<div className="field">
						<label>Check In:</label>
						<div>{parkingTimeIn.toLocaleTimeString()}</div>
					</div>
				)}
				{props.showName && (
					<div className="field wrapWord">
						<label>Show Name:</label>
						<div>{props.showName}</div>
					</div>
				)}
				{props.storeName && (
					<div className="field wrapWord">
						<label>Store Name:</label>
						<div>{props.storeName}</div>
					</div>
				)}
			</div>

			<div className="row2-col3">
				{props.name === "Parking" && (
					<div className="field">
						<label>Check Out:</label>
						<div>{parkingTimeOut.toLocaleTimeString()}</div>
					</div>
				)}
				{props.ticketMethod && (
					<div className="field">
						<label>Ticket Type:</label>
						<div>{props.ticketMethod}</div>
					</div>
				)}
				{props.showDate && (
					<div className="field">
						<label>Show Date:</label>
						<div>{showDate}</div>
					</div>
				)}
			</div>
		</li>
	);
};
