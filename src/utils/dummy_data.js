// call API
export const cartData = {
  tickets: [
    {
      method: "ONLINE",
      visitDate: "2023-04-26",
      price: 100,
      discount: 0,
      visitorId: 2,
      ticketType: 1,
      showId: 1,
    },
    {
      method: "ONLINE",
      visitDate: "2023-04-26",
      price: 110,
      discount: 0,
      visitorId: 3,
      ticketType: 2,
    },
  ],
  parking: [
    {
      visitorId: 1,
    },
    {
      visitorId: 3,
    },
  ],
  storeOrder: [
    {
      quantity: 2,
      pricePerQuantity: 10.55,
      visitorId: 1,
      storeId: 1,
    },
    {
      quantity: 3,
      pricePerQuantity: 9.72,
      visitorId: 2,
      storeId: 2,
    },
  ],
  userId: 11,
};
