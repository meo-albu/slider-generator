import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import './App.css';
import Slider from './Pages/Components/Slider';
import About from './Pages/About'

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <div>
            <h1>Slider Generator</h1>
            <Link to="/slider"><h2>Home</h2></Link>
            <Link to="/about"><h2>About</h2></Link>
            <Redirect to="/slider" />
          </div>


          <div className="version">
            v 2.0.0
        </div>
        </header>

        <Route path="/slider" component={Slider} />
        <Route path="/about" component={About} />
      </Router>


      <footer>
        © {new Date().getFullYear()} Slider Generator, made by <span>Marian Albu</span>
      </footer>

    </div>
  );
}

export default App;

