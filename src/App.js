import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication/index";
import { Provider } from "react-redux";
import store from "./redux/store";
import EmployeeHomePage from "./pages/EmployeeHome";
import HomePage from "./pages/Home";
import { ROUTES } from "./utils/enums";
import AttractionsPage from "./pages/Attractions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path={ROUTES.launch} element={<HomePage />} />
					<Route
						path={ROUTES.auth}
						element={<AuthenticationPage />}
					/>
					<Route
						path={ROUTES.employee}
						element={<EmployeeHomePage />}
					/>
					<Route path={ROUTES.home} element={<HomePage />} />
					<Route
						path={ROUTES.attractions}
						element={<AttractionsPage />}
					/>
				</Routes>
			</BrowserRouter>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</Provider>
	);
}

export default App;
