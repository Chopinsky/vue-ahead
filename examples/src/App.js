import React from 'react';
import './App.css';
import ReactAhead from 'react-ahead';

const parser = data => {
  return data.map(item => {
    return {
      source: item['name'],
      extraData: item,
    };
  });
};

function App() {
  const remote = {
    method: 'get',
    url: 'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search',
    headers: {
      // 'Sec-Fetch-Dest': 'empty',
      // 'Sec-Fetch-Mode': 'cors',
      // 'Sec-Fetch-Site': 'cross-site',
    },
    timeout: 1000,
    dataParser: parser,
  };

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
          { source: 0 },
          { source: 1 }, 
          { source: 2, group: 'group a' }, 
          { source: 3, group: 'group b' }, 
          { source: 4, group: 'group a'}, 
          { source: 5, group: 'group b'}]
        }
        grouped={true}
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
      <ReactAhead
        className={"app-control"}
        customClassNames={{
          input: "app-control-input",
          dropdown: "app-control-dropdown",
          active: "app-control-active",
        }}
        remote={remote}
        placeholder={"Find Twitter Handle ... "}
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
