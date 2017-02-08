import React from 'react';
import date from 'utils/date';
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
                    onDateChange={this.props.onDateChange.bind(this)}
                    onCategoryChange={this.props.onCategoryChange.bind(this)}
                    dates={this.props.dates}
                    selectedDate={this.props.selectedDate}
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
