import React, { Component } from 'react';
import '../styles/App.css';
import Layout from "./layout/Layout";
import CreateWallet from "./account/CreateWallet";

class App extends Component {
  render() {
    return (
      <div className="App">
            <Layout>
                <CreateWallet/>
            </Layout>
      </div>
    );
  }
}

export default App;
