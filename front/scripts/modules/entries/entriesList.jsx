import React from 'react';

export default class EntriesList extends React.Component {
    getEntries () {

        const allEntries = this.props.entries.map((entry) =>
                <Entry
                    name={entry.name}
                    price={entry.price}
                    date={entry.date}
                    category={entry.category}
                    key={Math.floor(Math.random() * 1000)}
                    onEntryRemoval={this.props.onEntryRemoval.bind(this, entry)}></Entry>
            );

        return allEntries;

    }


    render () {

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
                        {/* TODO optimize so iterating twice through all passed entries is redundant {this.getEntries()} */}
                        {this.getEntries()}
                    </tbody>
                </table>
            </div>
        );

    }
}

export class Entry extends React.Component {
    render () {

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
        );

    }
}
