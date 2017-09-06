import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './static/css/common.css';
import './static/css/reset.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();