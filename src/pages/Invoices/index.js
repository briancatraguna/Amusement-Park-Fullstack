import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import { OrderCard } from "../../components/OrderCard";
import { getOrders } from "../../utils/api";
import { emitNotification } from "../../utils/emitNotification";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import "./style.css";

export const Invoices = (prop) => {
	const accessToken = useSelector((state) => state.auth.accessToken);

	let fromDate = new Date();
	fromDate.setDate(fromDate.getDate() - 30);

	const [selectedInvoiceTypeId, setinvoiceTypeId] = useState(0);
	const [selectedInvoiceFromDate, setinvoiceFromDate] = useState(
		dayjs(fromDate.toJSON().split("T")[0])
	);
	const [selectedInvoiceToDate, setinvoiceToDate] = useState(
		dayjs(new Date().toJSON().split("T")[0])
	);
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const invResponse = await getOrders(
					accessToken,
					selectedInvoiceTypeId,
					!selectedInvoiceFromDate
						? "1900-01-01"
						: new Date(selectedInvoiceFromDate)
								.toJSON()
								.split("T")[0],
					new Date(selectedInvoiceToDate).toJSON().split("T")[0]
				);
				setInvoices(invResponse.data.orders);
			} catch (error) {
				emitNotification("error", error.response.data.message);
			}
		};
		fetchInvoices();
	}, [
		accessToken,
		selectedInvoiceFromDate,
		selectedInvoiceToDate,
		selectedInvoiceTypeId,
	]);

	const handleChange = (event) => {
		setinvoiceTypeId(event.target.value);
	};

	const fromDateOnChange = (event) => {
		setinvoiceFromDate(new Date(event?.$d).toJSON()?.split("T")[0]);
	};

	const toDateOnChange = (event) => {
		setinvoiceToDate(new Date(event?.$d).toJSON()?.split("T")[0]);
	};

	const orderList = invoices.map((order, i) => (
		<OrderCard
			key={i}
			invoiceId={order.Invoice_Id}
			invoiceDate={order.Invoice_Date}
			name={order.InvoiceType}
			price={order.Amount}
			isPaid={order.IsPaid}
			ticketMethod={order.TI_Method}
			visitorName={order.VisitorName}
			showName={order.ShowName}
			showDate={order.ShowDate}
			parkingTimeIn={order.ParkingTimeIn}
			parkingTimeOut={order.ParkingTimeOut}
			storeName={order.StoreName}
		/>
	));

	return (
		<>
			<div>
				<Header />
			</div>

			<div className="order-container">
				<div className="filterBlock">
					<FormControl className="invoiceType">
						<InputLabel id="demo-simple-select-label">
							Invoice Type
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={selectedInvoiceTypeId}
							label="Invoice Type"
							onChange={handleChange}
						>
							<MenuItem value={0}>All</MenuItem>
							<MenuItem value={1}>Entry Ticket</MenuItem>
							<MenuItem value={2}>Shows</MenuItem>
							<MenuItem value={3}>Store Orders</MenuItem>
							<MenuItem value={4}>Parking</MenuItem>
						</Select>
					</FormControl>
					<DatePicker
						label="From Date"
						value={selectedInvoiceFromDate}
						onChange={fromDateOnChange}
						slotProps={{
							actionBar: {
								actions: ["clear"],
							},
						}}
					/>

					<DatePicker
						label="To Date"
						value={
							selectedInvoiceToDate === "1900-01-01"
								? new Date()
								: selectedInvoiceToDate
						}
						onAccept={toDateOnChange}
					/>
				</div>
				<div className="orders">
					<ul>{orderList}</ul>
				</div>
			</div>
		</>
	);
};
