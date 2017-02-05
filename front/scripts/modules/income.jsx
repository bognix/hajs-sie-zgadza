import React from 'react';
import EntriesBox from 'modules/entries/entriesBox'

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
        addSpend(income);
    }

    handleSpendRemoval(income) {
        const currentIncomes = this.state.allIncomes,
            indexToRemove = currentIncomes.indexOf(income);

        currentIncomes.splice(indexToRemove, 1);

        this.setState({allIncomes: currentIncomes});

        //TODO create notification about successful save
        putSpendings(currentIncomes);
    }

    render() {
        return (<EntriesBox
            entries={this.state.allIncomes}
            onEntrySubmit={this.handleIncomeSubmit}
            onEntryRemoval={this.handleIncomeRemoval}/>)
    }
};
