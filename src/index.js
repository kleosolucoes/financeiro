import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

const logger = store => next => action => {
	console.group(action.type);
	console.info('despachando', action);
	let resultado = next(action);
	console.log('proximo', store.getState());
	console.groupEnd(action.type);
	return resultado;
};

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#f44336',
    },
  },
});

const store = createStore(rootReducer, applyMiddleware(logger,thunk));

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
