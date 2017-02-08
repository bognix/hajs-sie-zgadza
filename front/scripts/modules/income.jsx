import React from 'react';
import EntriesBox from 'modules/entries/entriesBox';
import store from 'store/incomes';


export default class Incomes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allIncomes: []
        }
    }

    componentDidMount() {
        store.getAll().then((allIncomes) => {
            this.setState({allIncomes: allIncomes});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleIncomeSubmit(income) {
        this.setState({
            allIncomes: this.state.allIncomes.concat([income])
        });

        //TODO create notification about successful save
        store.add(income);
    }

    handleIncomeRemoval(income) {
        const currentIncomes = this.state.allIncomes,
            indexToRemove = currentIncomes.indexOf(income);

        currentIncomes.splice(indexToRemove, 1);

        this.setState({allIncomes: currentIncomes});

        //TODO create notification about successful save
        store.replaceAll(currentIncomes);
    }

    render() {
        return (<EntriesBox
            entries={this.state.allIncomes}
            onEntrySubmit={this.handleIncomeSubmit.bind(this)}
            onEntryRemoval={this.handleIncomeRemoval.bind(this)}/>)
    }
};
