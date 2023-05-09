import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        entryTickets: [],
        showTickets: [],
        storeOrder: [],
    },
    reducers: {
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
        }
    }
});

export const {addEntryTickets, addShowTickets, addStoreOrder, clearCartState} = cartSlice.actions;
export default cartSlice.reducer;