import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css'; // from node_modules
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'; // for ExpenseForm date component
import { firebase } from './firebase/firebase';
//import './playground/promises';
import LoadingPage from './components/LoadingPage'

const store = configureStore();

//store.dispatch(setTextFilter('water'));
//setTimeout(() => {
//  store.dispatch(setTextFilter('bill')); // In the store the value of text will change after 3 seconds, this will reflect in all components using this value
//}, 3000);
//const state = store.getState();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});