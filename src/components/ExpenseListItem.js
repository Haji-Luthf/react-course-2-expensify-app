import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

//const now = moment();
//console.log(now) //there are umpteen methods available
//console.log(now.format('MMM Do, YYYY')) //three Ms for Month with first three letters, Do for Day and st/th

const ExpenseListItem = ({ id, description, amount, createdAt }) => { // dispatch is also available in props ({ dispatch, id, description, amount, createdAt })
    return (
        <Link className="list-item" to={`/edit/${id}`}>
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
            </div>
            <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
        </Link>
    );
};

export default ExpenseListItem;