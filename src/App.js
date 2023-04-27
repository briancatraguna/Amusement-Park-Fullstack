import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication/index";
import { Provider } from "react-redux";
import store from "./redux/store";
import EmployeeHomePage from "./pages/EmployeeHome";
import HomePage from "./pages/Home";
import { ROUTES } from "./utils/enums";
import AttractionsPage from "./pages/Attractions";
import CartPage from "./pages/Cart";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.launch} element={<Navigate to={ROUTES.home}/>}/>
          <Route path={ROUTES.auth} element={<AuthenticationPage />} />
          <Route path={ROUTES.employee} element={<EmployeeHomePage />} />
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.attractions} element={<AttractionsPage/>}/>
          <Route path={ROUTES.cart} element={<CartPage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
