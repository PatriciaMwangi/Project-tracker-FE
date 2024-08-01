import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectForm from './components/ProjectForm';
import ProjectDetails from './components/ProjectDetails';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/add-project" element={<ProjectForm />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;