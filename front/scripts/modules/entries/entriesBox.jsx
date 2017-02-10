import React from 'react';
import EntriesList from 'modules/entries/entriesList';
import EntriesFilter from 'modules/entries/entriesFilter';
import EntryForm from 'modules/entries/entryForm';

export default class EntriesBox extends React.Component {

    calculateTotalAmount (entries) {

        let totalAmount = 0;

        entries.forEach((entry) => {

            totalAmount += parseInt(entry.price) || 0;

        });

        return totalAmount;

    }

    render () {

        const totalAmount = this.calculateTotalAmount(this.props.entries);

        return (
            <div>
                <EntriesFilter
                    onCategoryChange={this.props.onCategoryChange.bind(this)}
                    category={this.props.category}/>
                <EntryForm onEntrySubmit={this.props.onEntrySubmit.bind(this)}/>
                <EntriesList
                    entries={this.props.entries}
                    onEntryRemoval={this.props.onEntryRemoval.bind(this)}/>
                <div>Suma: {totalAmount}</div>
            </div>
        );

    }
}
