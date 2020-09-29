import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    //Store Creation
    const store = createStore(combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer, // now we have access to state.filters which contains what's returned from the reducer
        auth: authReducer // now we have access to state.auth
    }),
     composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};