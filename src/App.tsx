import React from 'react';
import './App.css';
import RoofERMainApp from './components/RoofERMainApp';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary level="app">
      <div className="App">
        <RoofERMainApp />
      </div>
    </ErrorBoundary>
  );
}

export default App;
