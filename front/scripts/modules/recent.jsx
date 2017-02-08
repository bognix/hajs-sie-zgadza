import React from 'react';
import spendingsStore from 'store/spendings';
import incomesStore from 'store/incomes';
import EntriesBox from 'modules/entries/entriesBox';
import date from 'utils/date';

export default class Recent extends React.Component {
    constructor (props) {

        super(props);

        this.state = {
            spendings: [],
            incomes: [],
            balance: 0,
            spendingsDate: '',
            incomesDate: '',
            spendingsCategory: '',
            incomesCategory: ''
        };

        this.dates = {
            today: 'today',
            all: 'all'
        };

    }

    componentDidMount () {

        spendingsStore.getAll().then((spendings) => {

            this.setState({
                spendings,
                spendingsDate: this.dates.today
            });

        }).catch((err) => {

            // TODO notification about failed fetch
            console.log(err);

        });

        incomesStore.getAll().then((incomes) => {

            this.setState({
                incomes,
                incomesDate: this.dates.today
            });

        }).catch((err) => {

            // TODO notification about failed fetch
            console.log(err);

        });

    }

    handleIncomeSubmit (income) {

        this.setState({
            incomes: this.state.incomes.concat([income])
        });

        // TODO create notification about successful save
        incomesStore.add(income);

    }

    handleSpendSubmit (spend) {

        this.setState({
            spendings: this.state.spendings.concat([income])
        });

        // TODO create notification about successful save
        spendingsStore.add(income);

    }

    handleIncomeRemoval (income) {

        const incomes = this.state.incomes,
            indexToRemove = incomes.indexOf(income);

        incomes.splice(indexToRemove, 1);

        this.setState({incomes});

        // TODO create notification about successful save
        store.replaceAll(incomes);

    }

    handleSpendRemoval (spend) {

        const spendings = this.state.spendings,
            indexToRemove = spendings.indexOf(spend);

        spendings.splice(indexToRemove, 1);

        this.setState({spendings});

        // TODO create notification about successful save
        store.replaceAll(spendings);

    }

    handleSpendingsCategoryChange (category) {

        this.setState({incomesCategory: category});

    }

    handleSpendingsDateChange (date) {

        this.setState({spendingsDate: date});

    }

    handleIncomesCategoryChange (category) {

        this.setState({incomesCategory: category});

    }

    handleIncomesDateChange (date) {

        this.setState({incomesDate: date});

    }

    calculateVisibleSpendings (spendings) {

        if (this.state.spendingsDate === this.dates.today) {

            spendings = date.filterToday(spendings);

        }

        if (this.state.spendingsCategory) {

            spendings = spendings.filter((entry) => entry.category.indexOf(this.state.category) === 0);

        }

        return spendings;

    }

    calculateVisibleIncomes (incomes) {

        if (this.state.incomesDate === this.dates.today) {

            incomes = date.filterToday(incomes);

        }

        if (this.state.incomesCategory) {

            incomes = incomes.filter((entry) => entry.category.indexOf(this.state.category) === 0);

        }

        return incomes;

    }

    calculateBalance (incomes, spendings) {

        let balance = 0;

        incomes.forEach((income) => {

            balance += parseInt(income.price) || 0;

        });

        spendings.forEach((spend) => {

            balance -= parseInt(spend.price) || 0;

        });

        return balance;

    }

    render () {

        const visibleSpendings = this.calculateVisibleSpendings(this.state.spendings),
            visibleIncomes = this.calculateVisibleIncomes(this.state.incomes),
            balance = this.calculateBalance(visibleIncomes, visibleSpendings);

        return <div><EntriesBox
            entries={visibleSpendings}
            selectedDate={this.state.spendingsDate}
            dates={this.dates}
            onEntrySubmit={this.handleSpendSubmit.bind(this)}
            onEntryRemoval={this.handleSpendRemoval.bind(this)}
            onDateChange={this.handleSpendingsDateChange.bind(this)}
            onCategoryChange={this.handleSpendingsCategoryChange.bind(this)}/>
            <EntriesBox
                entries={visibleIncomes}
                selectedDate={this.state.incomesDate}
                dates={this.dates}
                onEntrySubmit={this.handleIncomeSubmit.bind(this)}
                onEntryRemoval={this.handleIncomeRemoval.bind(this)}
                onDateChange={this.handleIncomesDateChange.bind(this)}
                onCategoryChange={this.handleIncomesCategoryChange.bind(this)}/>
            <span>Balance:
            </span>
            <span>{balance}</span>
        </div>;

    }
}
