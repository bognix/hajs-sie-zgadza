import React from 'react';
import date from 'utils/date';
import EntriesList from 'modules/entries/entriesList';
import EntriesFilter from 'modules/entries/entriesFilter';
import EntryForm from 'modules/entries/entryForm';

export default class EntriesBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            selectedDate: ''
        }

        this.dates = {
            today: 'today',
            all: 'all'
        }
    }

    componentDidMount() {
        this.setState({selectedDate: this.dates.today});
    }

    handleEntrySubmit(entry) {
        this.props.onEntrySubmit(entry);
    }

    handleEntryRemoval(entry) {
        this.props.handleEntryRemoval(entry);
    }

    handleDateChange(date) {
        this.setState({selectedDate: date});
    }

    handleCategoryChange(category) {
        this.setState({category: category})
    }

    calculatevisibleEntries() {
        let visibleEntries = this.props.entries;

        if (this.state.selectedDate === this.dates.today) {
            visibleEntries = date.filterToday(this.props.entries);
        }

        if (this.state.category) {
            visibleEntries = visibleEntries.filter((entry) => {
                return entry.category.indexOf(this.state.category) === 0;
            });
        }

        return visibleEntries;
    }

    render() {
        const visibleEntries = this.calculatevisibleEntries();

        return (
            <div>
                <EntriesFilter
                    onDateChange={this.handleDateChange.bind(this)}
                    onCategoryChange={this.handleCategoryChange.bind(this)}
                    dates={this.dates}
                    selectedDate={this.state.selectedDate}
                    category={this.state.category}/>
                <EntryForm onEntrySubmit={this.handleEntrySubmit.bind(this)}/>
                <EntriesList
                    entries={visibleEntries}
                    onEntryRemoval={this.handleEntryRemoval.bind(this)}/>
            </div>
        )
    }
}
