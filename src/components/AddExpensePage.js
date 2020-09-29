import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        // props.dispatch(addExpense(expense)); this is not used to make this class testable without connect
        this.props.startAddExpense(expense);
        this.props.history.push('/'); // history is available in props because AddExpensePage is registered in a Route.
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        onSubmit={this.onSubmit} // the expense object contains the properties returned from expense form.
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
// connect - can take either no arguments or
// one argument - mapStateToProps or
// two arguments - mapStateToProps and mapDispatchToProps