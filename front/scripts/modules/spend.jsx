import React from 'react';
import {add as addSpend, put as putSpendings} from 'utils/sheet';
import store from 'store/spends';
import date from 'utils/date';
import EntriesBox from 'modules/entries/entriesBox'

export default class Spendings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allSpendings: []
        }
    }

    componentDidMount() {
        store.getAllSpends().then((allSpendings) => {
            this.setState({allSpendings: allSpendings});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleSpendSumbit(spend) {
        this.setState({
            allSpendings: this.state.allSpendings.concat([spend])
        });

        //TODO create notification about successful save
        addSpend(spend);
    }

    handleSpendRemoval(spend) {
        const currentSpendings = this.state.allSpendings,
            indexToRemove = currentSpendings.indexOf(spend);

        currentSpendings.splice(indexToRemove, 1);

        this.setState({allSpendings: currentSpendings});

        //TODO create notification about successful save
        putSpendings(currentSpendings);
    }

    render() {
        return (<EntriesBox
            entries={this.state.allSpendings}
            onEntrySubmit={this.handleSpendSubmit}
            onEntryRemoval={this.handleSpendRemoval}/>)
    }
};
