import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, 
    addExpense, 
    editExpense, 
    removeExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testabc';
const defaultAuthState = {auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, amount, note, createdAt}) => {
        expensesData[id] = { description, amount, note, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'new Note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new Note'
        }
    });
});

test('should setup add expense action object with provided data', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

//mock store
test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'This one is better',
      createdAt: 1000
    };
  //call to firebase is asynchronous, 
  //so we need to force Jest to wait until this call is completed for assertion by calling done().
    store.dispatch(startAddExpense(expenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => { // Promise chaining
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

//mock store
test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaults = {
      description: '',
      amount: 0,
      note: '',
      createdAt: 0
    };
  //call to firebase is asynchronous, 
  //so we need to force Jest to wait until this call is completed for assertion by calling done().
    store.dispatch(startAddExpense({})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseDefaults
        }
    });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => { // Promise chaining
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

test('should setup set expenses action object with provided data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses // comes from firebase set in beforeEach
        });
        done();
    });
});

test('should remove expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy(); // null check
        done(); // should always be inside then
    });;
});


test('should edit expense in firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    const updates = {
        note: 'new Note'
    };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().note).toBe('new Note');
        done(); // should always be inside then
    });;
});