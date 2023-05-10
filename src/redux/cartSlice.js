import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    entryTickets: [],
    showTickets: [],
    storeOrder: [],
    totalInvoiceAmount: 0.0,
    totalUnpaidInvoiceAmount: 0.0,
  },
  reducers: {
    setTotalInvoiceAmount(state, action) {
      state.totalInvoiceAmount = action.payload;
    },
    setTotalUnpaidInvoiceAmount(state, action) {
      state.totalUnpaidInvoiceAmount = action.payload;
    },
    addEntryTickets(state, action) {
      state.entryTickets.push(action.payload);
    },
    addShowTickets(state, action) {
      state.showTickets.push(action.payload);
    },
    addStoreOrder(state, action) {
      state.storeOrder.push(action.payload);
    },
    clearCartState(state) {
      state.entryTickets = [];
      state.showTickets = [];
      state.storeOrder = [];
      state.totalInvoiceAmount = 0.0;
      state.totalUnpaidInvoiceAmount = 0.0;
    },
  },
});

export const {
  setTotalInvoiceAmount,
  setTotalUnpaidInvoiceAmount,
  addEntryTickets,
  addShowTickets,
  addStoreOrder,
  clearCartState,
} = cartSlice.actions;
export default cartSlice.reducer;
