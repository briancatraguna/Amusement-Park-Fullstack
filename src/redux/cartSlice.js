import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        tickets: [],
        parking: [],
        storeOrder: [],
    },
    reducers: {
        addTickets(state, action) {
            const tickets = state.tickets;
            tickets.push(action.payload);
            state.tickets = tickets;
        },
        addParking(state, action) {
            const parking = state.parking;
            parking.push(action.payload);
            state.parking = parking;
        },
        addStoreOrder(state, action) {
            const storeOrder = state.storeOrder;
            storeOrder.push(action.payload);
            state.storeOrder = storeOrder;
        }
    }
});

export const {addTickets, addParking, addStoreOrder} = cartSlice.actions;
export default cartSlice.reducer;