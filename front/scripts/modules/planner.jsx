import EntriesBox from 'modules/entries/entriesBox';
import React from 'react';
import store from 'store/planner';
import Spinner from 'modules/spinner';

export default class Planner extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            entries: [],
            category: '',
            selectedDate: '',
            loaded: false
        };
    }

    componentDidMount () {
        this.fetchAll(this.props.sheetApi);
    }

    componentWillReceiveProps (nextProps) {
        this.fetchAll(nextProps.sheetApi);
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

    calculateBalance () {
        let balance = 0;

        this.state.entries.forEach((entry) => {
            if (!this.state.category || entry.category.indexOf(this.state.category) === 0) {
                balance = entry.type === 'spend'
                            ? balance -= parseInt(entry.price, 10) || 0
                            : balance += parseInt(entry.price, 10) || 0;
            }
        });

        return balance;
    }

    fetchAll (sheetApi) {
        if (sheetApi) {
            store.getStoreInstance(sheetApi).getAll().
                then((entries) => {
                    this.setState({
                        entries,
                        loaded: true}
                    );
                }).
                catch(() => {
                    // TODO notification about failed fetch
                });
        } else {
            // TODO notification
            console.log('sheetApi not defined');
        }
    }

    render () {
        const balance = this.calculateBalance(),
            balanceClass = balance > 0 ? 'balance green' : 'balance red',
            className = this.state.loaded ? 'wrapper' : 'loading wrapper';

        return <div className={className}>
            <h2>Planned Expenses</h2>
            <Spinner visible={!this.state.loaded}/>
            <EntriesBox
                    entries = {this.state.entries}
                    onEntrySubmit = {this.handleEntrySubmit.bind(this)}
                    onEntryRemoval = {this.handleEntryRemoval.bind(this)}/>
                <div className={balanceClass} ><span> Balance: </span><span>{balance}</span></div>
        </div>;
    }
}
