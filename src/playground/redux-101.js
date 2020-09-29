import {createStore} from 'redux';

const countReducer = (state = {count: 0}, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy // return new state instead of changing the original state
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
               count: action.count
            }
        default:
            return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});
// If we want to increment the count or reset it to 0 we need Actions
// Action Generator
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});
// Actions
store.dispatch(incrementCount({incrementBy: 5}));

// store.dispatch not only sends the type object but also calls the createStore function.
store.dispatch(incrementCount());

// Action Generator
const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});
// Actions
store.dispatch(decrementCount({decrementBy: 20}));
store.dispatch(decrementCount());

//unsubscribe(); If you want to stop watching for changes

// Action Generator
const resetCount = ({} = {}) => ({
    type: 'RESET'
});
// Actions
store.dispatch(resetCount());

// Action Generator
const setCount = ({count}) => ({
    type: 'SET',
    count
});
// Actions
store.dispatch(setCount({count: 101}));