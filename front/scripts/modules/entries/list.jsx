import random from 'utils/random';
import React from 'react';
import RowForm from 'modules/entries/rowForm';

export default class EntriesList extends React.Component {
    getEntries () {
        const allEntries = this.props.entries.map((entry) =>
                <Entry
                    entry={entry}
                    key={random.generateRandomInt()}
                    onEntryRemoval={this.props.onEntryRemoval.bind(this, entry)}/>
            );

        return allEntries;

    }


    render () {

        return (
            <form>
                <table className="flex-table">
                    <tbody>
                    <tr className="table-header">
                        <td>What</td>
                        <td>Price</td>
                        <td>Category</td>
                        <td>When</td>
                        <td className="last"/>
                    </tr>
                    <RowForm onEntrySubmit={this.props.onEntrySubmit.bind(this)}/>
                    {this.getEntries()}
                    </tbody>
                </table>
            </form>
        );
    }
}

export class Entry extends React.Component {
    render () {
        const className = `type-${this.props.entry.type}`;


        return (
            <tr className={className}>
                <td>{this.props.entry.name}</td>
                <td>{this.props.entry.price}</td>
                <td>{this.props.entry.category}</td>
                <td>{this.props.entry.date}</td>
                <td className="last"><button onClick={this.props.onEntryRemoval}>-</button></td>
            </tr>
        );

    }
}
