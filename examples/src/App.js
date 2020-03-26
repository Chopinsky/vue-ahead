import React from 'react';
import './App.css';
import ReactAhead from 'react-ahead';

function App() {
  return (
    <div className={"app-wrapper"}>
      <ReactAhead 
        className={"app-control"} 
        customClassNames={{
          input: "app-control-input",
          dropdown: "app-control-dropdown",
        }}
        placeholder={"Search terms ... "}
        options={[1, 2, 3, 4, 5]}
      />
    </div>
  );
}

export default App;
