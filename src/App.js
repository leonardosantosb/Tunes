import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Content } from './components/Content';
import { Sidebar } from './components/Sidebar';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Sidebar />
          <Content />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
