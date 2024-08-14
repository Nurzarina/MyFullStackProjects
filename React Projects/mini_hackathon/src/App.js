import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Task from './Task';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="text-dark text-center py-5">
          <Header className="header"/>
        </header>
        <div className="container my-5">
          <Routes>
            <Route path="/" element={<Task />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
        <footer className="bg-white text-dark text-center py-3">
          © 2024 Task Manager
        </footer>
      </div>
    </Router>
  );
}

export default App;
