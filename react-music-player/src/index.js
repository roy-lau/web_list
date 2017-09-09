import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './base/css/common.css';
import './base/css/reset.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();