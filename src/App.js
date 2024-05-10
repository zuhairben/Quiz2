import './App.css';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [token ,settoken] = useState('');
  return (
    <div className="App">
       <Router>
      <Routes>
        <Route path="/SignUp" element= {<SignUp/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/home" element={<Home />} />
       
      </Routes>
    </Router>
     
    </div>
  );
}

export default App;
