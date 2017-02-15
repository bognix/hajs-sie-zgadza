import Filter from 'modules/entries/filter';
import List from 'modules/entries/list';
import React from 'react';

export default class EntriesBox extends React.Component {
    render () {
        return (
            <div>
                <List
                    entries={this.props.entries}
                    onEntryRemoval={this.props.onEntryRemoval.bind(this)}
                    onEntrySubmit={this.props.onEntrySubmit.bind(this)}/>
            </div>
        );

    }
}
