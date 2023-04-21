import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication/index";
import { Provider, useSelector } from "react-redux";
import { ROUTES } from "./routes";
import store from "./redux/store";
import EmployeeHomePage from "./pages/EmployeeHome";
import HomePage from "./pages/Home";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.auth} element={<AuthenticationPage/>} />
          <Route path={ROUTES.employee} element={<EmployeeHomePage/>}/>
          <Route path={ROUTES.home} element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
