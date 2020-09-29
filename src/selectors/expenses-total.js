// Get Total Expenses (filtered)
export default (expenses) => {
    return expenses.reduce((total, expense) => (total + expense.amount), 0); // initialized at 0
};