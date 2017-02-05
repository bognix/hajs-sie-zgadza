import React from 'react';
import sheet from 'utils/sheet';
import store from 'store/entries';
import date from 'utils/date';
import EntriesBox from 'modules/entries/entriesBox'

const sheetID = 'spendings';

export default class Spendings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allSpendings: []
        }
    }

    componentDidMount() {
        store.getAllEntries(sheetID).then((allSpendings) => {
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
        //TODO call sheets only through store
        sheet.addRow(sheetID, spend);
    }

    handleSpendRemoval(spend) {
        const currentSpendings = this.state.allSpendings,
            indexToRemove = currentSpendings.indexOf(spend);

        currentSpendings.splice(indexToRemove, 1);

        this.setState({allSpendings: currentSpendings});

        //TODO create notification about successful save
        //TODO call sheets only through store
        sheet.replaceAllRows(sheetID, currentSpendings);
    }

    render() {
        return (<EntriesBox
            entries={this.state.allSpendings}
            onEntrySubmit={this.handleSpendSubmit.bind(this)}
            onEntryRemoval={this.handleSpendRemoval}/>)
    }
};
