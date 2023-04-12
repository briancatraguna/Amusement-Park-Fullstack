import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthenticationPage from './pages/Authentication/index'


function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticationPage/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
