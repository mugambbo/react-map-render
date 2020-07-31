import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import PublicRoute from './PublicRoute';
import MapView from './views/MapView';
import HomeLayout from './layout/HomeLayout';

function App() {
  return (
    <Router>
        <PublicRoute component={MapView} layout={HomeLayout} path={Path.Map} />
    </Router>
  );
}

const Path = {
  Map: '/'
}

export default App;
