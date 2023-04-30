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
        removeTickets(state, action) {
            if (!state.tickets.includes(action.payload)) return;
            const removeIndex = state.tickets.indexOf(action.payload);
            state.tickets.splice(removeIndex, 1);
        },
        addParking(state, action) {
            state.parking.push(action.payload);
        },
        removeParking(state, action) {
            if (!state.parking.includes(action.payload)) return;
            const removeIndex = state.parking.indexOf(action.payload);
            state.parking.splice(removeIndex, 1);
        },
        addStoreOrder(state, action) {
            state.storeOrder.push(action.payload);
            console.log(state.storeOrder.slice());
        },
        removeStoreOrder(state, action) {
            const removeIndex = state.storeOrder.indexOf(action.payload);
            state.storeOrder.splice(removeIndex, 1);
        },
        clearCartState(state) {
            localStorage.clear();
            state.tickets = [];
            state.parking = [];
            state.storeOrder = [];
        }
    }
});

export const {addTickets, removeTickets, addParking, removeParking, addStoreOrder, removeStoreOrder, clearCartState} = cartSlice.actions;
export default cartSlice.reducer;