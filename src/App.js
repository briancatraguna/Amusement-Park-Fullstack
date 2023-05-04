import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication/index";
import { Provider } from "react-redux";
import store from "./redux/store";
import EmployeeHomePage from "./pages/EmployeeHome";
import HomePage from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import { ROUTES } from "./utils/enums";
import AttractionsPage from "./pages/Attractions";
import GroupModification from "./pages/GroupModification";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.launch} element={<HomePage/>} />
          <Route path={ROUTES.auth} element={<AuthenticationPage />} />
          <Route path={ROUTES.employee} element={<EmployeeHomePage />} />
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.userProfile} element={<UserProfile/>} />
          <Route path={ROUTES.attractions} element={<AttractionsPage/>}/>
          <Route path={ROUTES.groupModification} element={<GroupModification/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
