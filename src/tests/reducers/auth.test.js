import authReducer from '../../reducers/auth';

test('should set uid for login correctly', () => {
    const uid = '123aaa';
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer({}, action);
    expect(state).toEqual({ uid });
    expect(state.uid).toEqual(action.uid);
});

test('should clear uid for logout correctly', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: 'abc123' }, action);
    expect(state).toEqual({});
});