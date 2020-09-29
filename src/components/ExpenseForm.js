import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// numberOfMonths={1} - makes only one month get displayed in the calendar pop up
// isOutsideRange={() => false} - allows choosing date in the past

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(), // default value is required for the single date picker as a moment object
            calendarFocused: false, // SingleDatePicker - true or false
            error: ''
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        //const note = e.target.value;
        //this.setState(() => ({ note }));
        e.persist();
        this.setState(() => ({ note: e.target.value }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        // ^\d*(\.\d{0,2})?$ ^ Start with, \d digit, * any number of from 0 to infinity, ()? optional group, \. to escape . , \d{0,2} minimum 0 maximum 2 digits after . , $ end of REGEX
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) // {1,} minimum 1 maximum infinity
            this.setState(() => ({ amount }));
    };

    onDateChange = (createdAt) => {
        if (createdAt)
            this.setState(() => ({ createdAt }));
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please enter description and amount!' }));
        }
        else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    className="text-input"
                    type="text"
                    placeholder="Description"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange} />
                <input
                    className="text-input"
                    type="text"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange} />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false} />
                <textarea
                    className="textarea"
                    value={this.state.note}
                    placeholder="Add a note for your expense (Optional)"
                    onChange={this.onNoteChange}></textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        )
    }
}