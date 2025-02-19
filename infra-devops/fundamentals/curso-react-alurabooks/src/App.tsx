import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Rotas from './rotas';

function App() {
  return (<BrowserRouter>
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
