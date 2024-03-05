import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import EnterForm from './components/EnterForm';
import Chatroom from './components/Chatroom';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        Socket Chat by Sarah!
      </header>
      <main>
        <Router>
          <Routes>
            <Route exact path='/' element={<EnterForm/>} />
            <Route exact path='/chatroom' element={<Chatroom/>} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
