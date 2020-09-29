import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE
const addExpense = ({description='', note='', amount=0, createdAt=0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//Expense Reducer
const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            //return state.concat(action.expense);
            return [
                ...state,
                action.expense
             ]
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id); // destructuring expense array
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense, // exiting properties
                        ...action.updates // overriding the properties for updating
                    }
                }
                else {
                    return expense;
                }
            });
        default:
            return state;
    }
}

//SET_TEXT_FILTER
const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

//Filters Reducer
const filtersReducerDefaultState = {
    text: '', 
    sortBy: 'date', 
    startDate: undefined, 
    endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}
//Timestamps (milliseconds)
// 0 - January 1 1970
// 33400 - 3.4s after January 1 1970
// -10 - 10ms before January 1 1970

// Get Visible Expenses (filtered and sorted)
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => { // filters argument is destructured
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate === 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate === 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

//Store Creation
const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));
console.log(store.getState());

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'rent', amount: 100, createdAt: 1000}));
const expenseTwo = store.dispatch(addExpense({description: 'coffee', amount: 5600, createdAt: -1000}))

console.log(expenseOne);

//store.dispatch(removeExpense({id: expenseOne.expense.id}));
//store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

//store.dispatch(setTextFilter('Rent'));
//store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
//store.dispatch(setStartDate());
store.dispatch(setEndDate(2500));

const demoState = {
    expenses: [{
        id: 'jhsaha',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDte: undefined
    }
};

const user = {
    name: 'Hajira',
    age: 32
}

console.log({
    ...user,
    location: 'Bengaluru',
    age: 16 // overriding
});

console.log({
    age: 16, 
    ...user, // overriding
    location: 'Bengaluru'    
});