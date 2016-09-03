import Spend from './spend';
import ReactDOM from 'react-dom';
import React from 'react';

const spendings = [
    {
        name: 'zakupy',
        price: 3.5
    }, {
        name: 'telewizor',
        price: 1000
    }
];
let jsx = [];

spendings.forEach((spend) => {
    jsx.push(<Spend name={spend.name} price={spend.price}></Spend>)
});

console.log(jsx);
ReactDOM.render(
    <div>{jsx}</div>,
    document.getElementById('appContainer')
);
