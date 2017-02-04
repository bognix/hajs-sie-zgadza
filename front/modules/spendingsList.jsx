import React from 'react';

export default class SpendingsList extends React.Component {
    getSpendings() {
        return this.props.data.map((spend) => {
            return (
                <Spend
                    name={spend.name}
                    price={spend.price}
                    date={spend.date}
                    category={spend.category}
                    key={Math.floor(Math.random() * 1000)}
                    onSpendRemove={this.props.onSpendRemove.bind(this, spend)}
                ></Spend>
            );
        });
    }

    render() {
        return (
            <div className="spendings-list">
                <table>
                    <thead><tr>
                        <th>Kiedy</th><th>Co</th><th>Za ile</th><th>Kategoria</th><th>Usuń</th>
                    </tr></thead>
                    <tbody>
                        {this.getSpendings()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export class Spend extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.date}</td>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
                <td>{this.props.category}</td>
                <td><button onClick={this.props.onSpendRemove}>-</button></td>
            </tr>
        )
    }
}
