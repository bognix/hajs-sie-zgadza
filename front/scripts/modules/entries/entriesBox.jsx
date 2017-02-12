import EntryForm from 'modules/entries/entryForm';
import Filter from 'modules/entries/filter';
import List from 'modules/entries/list';
import React from 'react';

export default class EntriesBox extends React.Component {
    render () {
        return (
            <div>
                <Filter
                    onInputValueChange={this.props.onFilterInputValueChange.bind(this)}/>
                <EntryForm onEntrySubmit={this.props.onEntrySubmit.bind(this)}/>
                <List
                    entries={this.props.entries}
                    onEntryRemoval={this.props.onEntryRemoval.bind(this)}/>
            </div>
        );

    }
}
