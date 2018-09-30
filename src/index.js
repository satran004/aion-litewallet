import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
// import 'typeface-roboto'

import registerServiceWorker from './registerServiceWorker';
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
