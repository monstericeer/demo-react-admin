// React v16.x + React-Router v4.x + React Intl + Redux v4.x + Redux-thunk
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store/configureStore'
import AppIntl from './components/AppIntl';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <AppIntl />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
