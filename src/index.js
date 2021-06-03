import * as React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import useHorizontal from '@oberon-amsterdam/horizontal/hook';


const Example = () => {
    useHorizontal();

    return (
        <React.Fragment>
            <div className="block">Hello, scroll further</div>

            <div className="block">Why hello there</div>

            <div className="block">
                <a href="react.html">Whee</a>
            </div>
        </React.Fragment>
    );
};

ReactDOM.render(
    <Example />,
  document.body
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
