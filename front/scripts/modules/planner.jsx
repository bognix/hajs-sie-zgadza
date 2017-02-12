import EntriesBox from 'modules/entries/entriesBox';
import React from 'react';
import store from 'store/planner';

export default class Planner extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            entries: [],
            category: '',
            selectedDate: ''
        };
    }

    componentDidMount () {
        store.getAll().
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

    calculateBalance () {
        let balance = 0;

        this.state.entries.forEach((entry) => {
            if (!this.state.category || entry.category.indexOf(this.state.category) === 0) {
                balance = entry.type === 'spend'
                            ? balance -= parseInt(entry.price, 10)
                            : balance += parseInt(entry.price, 10);
            }
        });

        return balance;
    }

    render () {
        const balance = this.calculateBalance();

        return <div>
            <EntriesBox
                    entries = {this.state.entries}
                    onEntrySubmit = {this.handleEntrySubmit.bind(this)}
                    onEntryRemoval = {this.handleEntryRemoval.bind(this)}/>
                <span> Balance: </span><span>{balance}</span>
        </div>;
    }
}
