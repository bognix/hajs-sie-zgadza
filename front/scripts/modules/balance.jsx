import date from 'utils/date';
import EntriesBox from 'modules/entries/entriesBox';
import React from 'react';
import store from 'store/balance';

export default class Balance extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            entries: [],
            category: ''
        };
    }

    componentDidMount () {
        const dateToFetch = date.getCurrentMonthYear();

        store.getAll(dateToFetch).
            then((entries) => {
                this.setState({entries});
            }).
            catch(() => {
                // TODO notification about failed fetch
            });
    }

    handleEntrySubmit (entry) {
        this.setState({
            entries: store.add(this.state.entries, entry)
        });
    }

    handleEntryRemoval (entry) {
        this.setState({
            entries: store.remove(this.state.entries, entry)
        });
    }

    handleCategoryChange (category) {
        this.setState({
            category
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

        return <div>
            <EntriesBox
                    entries = {visibleEntries}
                    onEntrySubmit = {this.handleEntrySubmit.bind(this)}
                    onEntryRemoval = {this.handleEntryRemoval.bind(this)}
                    onFilterInputValueChange = {this.handleCategoryChange.bind(this)}/>
                <span> Balance: </span><span>{balance}</span>
        </div>;
    }
}
