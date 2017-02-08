import React from 'react';
import store from 'store/spendings';
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
        store.getAll().then((allSpendings) => {
            this.setState({allSpendings: allSpendings});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleSpendSubmit(spend) {
        this.setState({
            allSpendings: this.state.allSpendings.concat([spend])
        });

        //TODO create notification about successful save
        store.add(spend);
    }

    handleSpendRemoval(spend) {
        const currentSpendings = this.state.allSpendings,
            indexToRemove = currentSpendings.indexOf(spend);

        currentSpendings.splice(indexToRemove, 1);

        this.setState({allSpendings: currentSpendings});

        //TODO create notification about successful save
        store.replaceAll(currentSpendings);
    }

    render() {
        return (<EntriesBox
            entries={this.state.allSpendings}
            onEntrySubmit={this.handleSpendSubmit.bind(this)}
            onEntryRemoval={this.handleSpendRemoval}/>)
    }
};
