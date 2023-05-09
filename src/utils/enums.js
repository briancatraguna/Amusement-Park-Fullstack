export const ROUTES = {
    launch: "*",
    auth: "/auth",
    employee: "/employee",
    home: "/home",
    attractions: "/attractions",
    shows: "/shows",
    stores: "/stores",
    storeDetail: "/stores/detail",
    cart: "/cart",
    orders: "/orders",
    userProfile: "/userProfile",
    groupModification : "/editGroups",
    invoices: "/invoices"
};

export const ROLE_TO_ID = {
    "Admin": "1",
    "Employee": "2",
    "Customer": "3"
};

export const ID_TO_ROLE = {
    "1": "Admin",
    "2": "Employee",
    "3": "Customer"
}