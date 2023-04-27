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
            state.tickets.push(action.payload);
        },
        addParking(state, action) {
            state.parking.push(action.payload);
        },
        addStoreOrder(state, action) {
            state.storeOrder.push(action.payload);
        },
        clearCartState(state) {
            localStorage.clear();
            state.tickets = [];
            state.parking = [];
            state.storeOrder = [];
        }
    }
});

export const {addTickets, addParking, addStoreOrder, clearCartState} = cartSlice.actions;
export default cartSlice.reducer;