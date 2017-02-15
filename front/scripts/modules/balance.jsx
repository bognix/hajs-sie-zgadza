import date from 'utils/date';
import EntriesBox from 'modules/entries/entriesBox';
import Filter from 'modules/entries/filter';
import plannerStore from 'store/planner';
import React from 'react';
import store from 'store/balance';

export default class Balance extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            entries: [],
            category: '',
            selectedDate: ''
        };
    }

    componentDidMount () {
        this.fetchAll(this.props.sheetApi);
    }

    componentWillReceiveProps (nextProps) {
        this.fetchAll(nextProps.sheetApi);
    }

    fetchAll (sheetApi) {
        if (sheetApi) {
            const dateToFetch = date.getCurrentMonthYear();

            store.getStoreInstance(sheetApi).getAll(dateToFetch).
                then((entries) => {
                    this.setState({entries,
                        selectedDate: dateToFetch});
                }).
                catch(() => {
                    // TODO notification about failed fetch
                });
        } else {
            // TODO notification
            console.log('sheetApi not defined');
        }
    }

    handleEntrySubmit (entry) {
        this.setState({
            entries: store.getStoreInstance().add(this.state.entries, entry)
        });
    }

    handleEntryRemoval (entry) {
        this.setState({
            entries: store.getStoreInstance().remove(this.state.entries, entry)
        });
    }

    handleCategoryChange (category) {
        this.setState({
            category
        });
    }

    handlePreviousDateClick () {
        const previousMonth = date.subtractMonth(this.state.selectedDate);

        store.getStoreInstance().getAll(previousMonth).
        then((entries) => {
            this.setState({
                entries,
                selectedDate: previousMonth
            });
        });
    }

    handleForwardDateClick () {
        const nextMonth = date.addMonth(this.state.selectedDate);

        store.getStoreInstance().getAll(nextMonth).
        then((entries) => {
            this.setState({
                entries,
                selectedDate: nextMonth
            });
        });
    }

    handleImportPlannedClick () {
        plannerStore.getStoreInstance(this.props.sheetApi).getAll().
        then((plannedEntries) => {
            this.setState({
                entries: store.getStoreInstance().addMany(this.state.entries, plannedEntries)
            });
        });
    }

    calculateVisibleEntries () {
        const allEntries = this.state.entries, visibleEntries = [];
        let balance = 0;

        allEntries.forEach((entry) => {
            if (!this.state.category || entry.category.indexOf(this.state.category) === 0) {
                balance = entry.type === 'spend'
                    ? balance -= parseInt(entry.price, 10)
                    : balance += parseInt(entry.price, 10);
                visibleEntries.push(entry);
            }
        });

        return {
            balance,
            visibleEntries
        };
    }

    render () {
        const {
            balance,
            visibleEntries
        } = this.calculateVisibleEntries();

        return <div className="table column-8">
            <Filter
                onInputValueChange={this.handleCategoryChange.bind(this)}
                selectedDate={this.state.selectedDate}
                onPrevDateClick={this.handlePreviousDateClick.bind(this)}
                onForwardDateClick={this.handleForwardDateClick.bind(this)}
                />
            <EntriesBox
                    entries = {visibleEntries}
                    onEntrySubmit = {this.handleEntrySubmit.bind(this)}
                    onEntryRemoval = {this.handleEntryRemoval.bind(this)}/>
                <span> Balance: </span><span>{balance}</span>
                <input type="button" value="Import Planned" onClick={this.handleImportPlannedClick.bind(this)}/>
        </div>;
    }
}
