import React from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MintPage from '../src/pages/mintPage';
import Home from './components/Home/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/mint' element={<MintPage />} />
      </Routes>
    </Router>
  );
}

export default App;
