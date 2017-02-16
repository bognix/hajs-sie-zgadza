import List from 'modules/entries/list';
import React from 'react';

export default class EntriesBox extends React.Component {
    render () {
        return (
                <List
                    entries={this.props.entries}
                    onEntryRemoval={this.props.onEntryRemoval.bind(this)}
                    onEntrySubmit={this.props.onEntrySubmit.bind(this)}/>
        );

    }
}
