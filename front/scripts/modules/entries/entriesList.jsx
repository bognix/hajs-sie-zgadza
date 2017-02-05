import React from 'react';

export default class EntriesList extends React.Component {
    getEntries() {
        const allEntries = this.props.entries.map((entry) => {
            return (
                <Entry
                    name={entry.name}
                    price={entry.price}
                    date={entry.date}
                    category={entry.category}
                    key={Math.floor(Math.random() * 1000)}
                    onEntryRemoval={this.props.onEntryRemoval.bind(this, entry)}></Entry>
            );
        });

        return allEntries;
    }

    calculateTotalAmount() {
        let totalAmount = 0;

        this.props.entries.forEach((entry) => {
            totalAmount += parseInt(entry.price) || 0;
        });

        return totalAmount;
    }

    render() {
        return (
            <div className="entries-list">
                <table>
                    <thead>
                        <tr>
                            <th>Kiedy</th>
                            <th>Co</th>
                            <th>Za ile</th>
                            <th>Kategoria</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*TODO optimize so iterating twice through all passed entries is redundant {this.getEntries()} */}
                        {this.getEntries()}
                    </tbody>
                </table>
                {/*TODO optimize so iterating twice through all passed entriesings is redundant {this.getEntries()} */}
                <div>Suma: {this.calculateTotalAmount()}</div>
            </div>
        )
    }
}

export class Entry extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.date}</td>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
                <td>{this.props.category}</td>
                <td>
                    <button onClick={this.props.onEntryRemoval}>-</button>
                </td>
            </tr>
        )
    }
}
