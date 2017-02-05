import React from 'react';
import EntriesBox from 'modules/entries/entriesBox'
import sheet from 'utils/sheet';

const sheetID = 'incomes';

export default class Incomes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allIncomes: []
        }
    }

    componentDidMount() {
        //TODO fetch data
    }

    handleIncomeSubmit(income) {
        this.setState({
            allIncomes: this.state.allIncomes.concat([income])
        });

        //TODO create notification about successful save
        //TODO call sheets only through store
        sheet.addRow(sheetID, income);
    }

    handleIncomeRemoval(income) {
        const currentIncomes = this.state.allIncomes,
            indexToRemove = currentIncomes.indexOf(income);

        currentIncomes.splice(indexToRemove, 1);

        this.setState({allIncomes: currentIncomes});

        //TODO create notification about successful save
        //TODO call sheets only through store
        sheet.replaceAllRows(sheetID, currentIncomes);
    }

    render() {
        return (<EntriesBox
            entries={this.state.allIncomes}
            onEntrySubmit={this.handleIncomeSubmit.bind(this)}
            onEntryRemoval={this.handleIncomeRemoval.bind(this)}/>)
    }
};
