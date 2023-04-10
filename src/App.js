import './App.css';
import Authentication from './pages/Authentication/Authentication';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Authentication isLoginMode={true}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
