import React from 'react';
import spendingsStore from 'store/spendings';
import incomesStore from 'store/incomes';
import EntriesBox from 'modules/entries/entriesBox';

export default class Recent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spendings: [],
            incomes: [],
            balance: 0,
            spendingsCategory: '',
            incomesCategory: ''
        };
    }

    componentDidMount() {
        spendingsStore.getAll().then((spendings) => {
            this.setState({spendings});
        }).catch((err) => {
            // TODO notification about failed fetch
            console.log(err);
        });

        incomesStore.getAll().then((incomes) => {
            this.setState({incomes});
        }).catch((err) => {
            // TODO notification about failed fetch
            console.log(err);
        });
    }

    handleIncomeSubmit(income) {
        this.setState({
            incomes: this.state.incomes.concat([income])
        });

        // TODO create notification about successful save
        incomesStore.add(income);
    }

    handleSpendSubmit(spend) {
        this.setState({
            spendings: this.state.spendings.concat([spend])
        });

        // TODO create notification about successful save
        spendingsStore.add(spend);
    }

    handleIncomeRemoval(income) {
        this.setState({
            incomes: incomesStore.remove(this.state.incomes, income)
        });
    }

    handleSpendRemoval(spend) {
        this.setState({
            spendings: incomesStore.remove(this.state.spendings, spend)
        });
    }

    handleSpendingsCategoryChange(category) {
        this.setState({spendingsCategory: category});
    }

    handleIncomesCategoryChange(category) {
        this.setState({incomesCategory: category});
    }

    calculateVisibleSpendings(spendings) {
        if (this.state.spendingsCategory) {
            spendings = spendings.filter((entry) => entry.category.indexOf(this.state.spendingsCategory) === 0);
        }

        return spendings;
    }

    calculateVisibleIncomes(incomes) {
        if (this.state.incomesCategory) {
            incomes = incomes.filter((entry) => entry.category.indexOf(this.state.incomesCategory) === 0);
        }

        return incomes;
    }

    calculateBalance(incomes, spendings) {
        let balance = 0;

        incomes.forEach((income) => {
            balance += parseInt(income.price) || 0;
        });

        spendings.forEach((spend) => {
            balance -= parseInt(spend.price) || 0;
        });

        return balance;
    }

    render() {
        const visibleSpendings = this.calculateVisibleSpendings(this.state.spendings),
            visibleIncomes = this.calculateVisibleIncomes(this.state.incomes),
            balance = this.calculateBalance(visibleIncomes, visibleSpendings);

        return <div><EntriesBox
            entries={visibleSpendings}
            onEntrySubmit={this.handleSpendSubmit.bind(this)}
            onEntryRemoval={this.handleSpendRemoval.bind(this)}
            onCategoryChange={this.handleSpendingsCategoryChange.bind(this)}/>
            <EntriesBox
                entries={visibleIncomes}
                onEntrySubmit={this.handleIncomeSubmit.bind(this)}
                onEntryRemoval={this.handleIncomeRemoval.bind(this)}
                onCategoryChange={this.handleIncomesCategoryChange.bind(this)}/>
            <span>Balance:</span>
            <span>{balance}</span>
        </div>;
    }
}
