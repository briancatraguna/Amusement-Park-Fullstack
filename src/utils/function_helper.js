export function formatDate(dateString) {
  const date = new Date(dateString.toISOString());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function convertToPlaceOrderRequestBody(
  includeParking,
  entryTickets,
  showTickets,
  storeOrder,
  userId
) {
  const parkingArr = [];
  const ticketsArr = [];
  // entry tickets
  for (let ticket of entryTickets) {
    const group = ticket.group;
    const price = ticket.price;
    for (let child of group.children) {
      const visitorId = child.visitor_id;
      if (includeParking) {
        parkingArr.push({
          visitorId: visitorId
        })
      }
      ticketsArr.push({
        method: "ONLINE",
        visitDate: getCurrentDate(),
        price: price,
        discount: 0,
        visitorId: visitorId,
        ticketType: 2
      })
    }
  };
  // show tickets
  for (let ticket of showTickets) {
    const group = ticket.group;
    const price = ticket.item.sw_price;
    const showId = ticket.item.sw_id;
    for (let child of group.children) {
      const visitorId = child.visitor_id;
      ticketsArr.push({
        method: "ONLINE",
        visitDate: getCurrentDate(),
        price: price,
        discount: 0,
        visitorId: visitorId,
        ticketType: 1,
        showId: showId
      })
    }
  };

  
  const storeOrderArr = [];
  
  return {
    tickets: ticketsArr,
    parking: parkingArr,
    storeOrder: storeOrderArr,
    userId: userId
  };
}

function getCurrentDate() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  // Add leading zeros to month and day if necessary
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  let formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}