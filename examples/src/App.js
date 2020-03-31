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
          active: "app-control-active",
        }}
        placeholder={"Search terms ... "}
        initOptions={[
          {source: 1}, 
          {source: 2}, 
          {source: 3}, 
          {source: 4}, 
          {source: 5}]
        }
      />
      <ReactAhead
        className={"app-control"}
        customClassNames={{
          input: "app-control-input",
          dropdown: "app-control-dropdown",
          active: "app-control-active",
        }}
        placeholder={"Pick a color ... "}
        isMulti={true}
        initOptions={[
          { source: 'blue' },
          { source: 'green' },
          { source: 'orange' },
          { source: 'black' },
          { source: 'white' },
          { source: 'many-many-colors-that-have-no-names' }
        ]}
      />
      <div className={"app-control"}>
        <input 
          type="text"
          placeholder="Enter values ..."
          className={"app-control-input"}
        />
      </div>
    </div>
  );
}

export default App;
