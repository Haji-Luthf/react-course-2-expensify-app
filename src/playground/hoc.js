import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => ( // returning an HOC
        <div>
            {props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById('app'));

const requireAuthentication = (WrappedComponent) => {
    return (props) => ( // returning an HOC
        <div>
            {!props.isAuthenticated ? <p>Please Login to view the info!</p> : <WrappedComponent {...props} />}
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById('app'));