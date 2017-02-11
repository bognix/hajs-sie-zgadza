import React from 'react';
import EntriesList from 'modules/entries/entriesList';
import EntriesFilter from 'modules/entries/entriesFilter';
import EntryForm from 'modules/entries/entryForm';

export default class EntriesBox extends React.Component {
    render () {
        return (
            <div>
                <EntriesFilter
                    onCategoryChange={this.props.onCategoryChange.bind(this)}
                    category={this.props.category}/>
                <EntryForm onEntrySubmit={this.props.onEntrySubmit.bind(this)}/>
                <EntriesList
                    entries={this.props.entries}
                    onEntryRemoval={this.props.onEntryRemoval.bind(this)}/>
            </div>
        );

    }
}
