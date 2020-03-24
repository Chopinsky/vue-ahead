import React from 'react';
import './App.css';
import ReactAhead from 'react-ahead';

function App() {
  return (
    <div className={"app-wrapper"}>
      <ReactAhead 
        className={"app-input"} 
        placeholder={"Search terms ... "}
      />
    </div>
  );
}

export default App;
