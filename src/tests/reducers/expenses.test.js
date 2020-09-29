import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'}); // @@INIT can be viewed in redux dev tools
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should edit expense by id', () => {
    const note = 'add some note';
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: { note }
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].note).toBe(note);
});

test('should not edit expense if id not found', () => {
    const note = 'add some note';
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: { note }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense= {
        id: '100',
        description: 'new',
        note: '',
        amount: 786,
        createdAt: 1000
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state[3]).toEqual(expense);
    expect(state).toEqual([...expenses, expense]);
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: expenses[1]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses[1]);
});