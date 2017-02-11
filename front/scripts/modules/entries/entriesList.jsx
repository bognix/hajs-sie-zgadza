import React from 'react';

export default class EntriesList extends React.Component {
    getEntries () {
        const allEntries = this.props.entries.map((entry) =>
                <Entry
                    entry={entry}
                    key={Math.floor(Math.random() * 1000)}
                    onEntryRemoval={this.props.onEntryRemoval.bind(this, entry)}/>
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
            <tr className={this.props.entry.type}>
                <td>{this.props.entry.date}</td>
                <td>{this.props.entry.name}</td>
                <td>{this.props.entry.price}</td>
                <td>{this.props.entry.category}</td>
                <td>
                    <button onClick={this.props.onEntryRemoval}>-</button>
                </td>
            </tr>
        );

    }
}
