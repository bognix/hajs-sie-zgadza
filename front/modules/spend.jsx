import React from 'react';
import {add as addSpend, put as putSpendings} from 'utils/sheet';
import store from 'store/spends';
import date from 'utils/date';
import SpendingsList from 'modules/spendingsList'

export default class Spendings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allSpendings: [],
            category: '',
            selectedDate: ''
        }

        this.dates = {
            today: 'today',
            all: 'all'
        }
    }

    componentDidMount() {
        store.getAllSpends().then((allSpendings) => {
            this.setState({allSpendings: allSpendings, selectedDate: this.dates.today});
        }).catch((err) => {
            console.log(err);
        });

    }

    handleSpendSubmit(spend) {
        const currentSpendings = this.state.allSpendings;

        //@TODO check if spend should be added to currently visible spends
        this.setState({
            allSpendings: currentSpendings.concat([spend])
        });

        //TODO create notification about successful save
        addSpend(spend);
    }

    //@FIXME this method should update all spends
    handleSpendRemoval(spend) {
        const currentSpendings = this.state.allSpendings,
            indexToRemove = currentSpendings.indexOf(spend);

        currentSpendings.splice(indexToRemove, 1);

        this.setState({allSpendings: currentSpendings});

        //TODO create notification about successful save
        putSpendings(currentSpendings);
    }

    handleDateChange(date) {
        this.setState({selectedDate: date});
    }

    handleCategoryChange(category) {
        this.setState({category: category})
    }

    calculateVisibleSpendings() {
        let visibleSpendings = this.state.allSpendings;

        if (this.state.selectedDate === this.dates.today) {
            visibleSpendings = store.getTodaySpends(this.state.allSpendings);
        }

        if (this.state.category) {
            visibleSpendings = visibleSpendings.filter((spend) => {
                return spend.category.indexOf(this.state.category) === 0;
            });
        }

        return visibleSpendings;
    }

    render() {
        const visibleSpendings = this.calculateVisibleSpendings();

        return (
            <div>
                <SpendingsFilter
                    onDateChange={this.handleDateChange.bind(this)}
                    onCategoryChange={this.handleCategoryChange.bind(this)}
                    dates={this.dates}
                    selectedDate={this.state.selectedDate}
                    category={this.state.categor}/>
                <SpendForm onSpendSubmit={this.handleSpendSubmit.bind(this)}/>
                <SpendingsBox
                    data={visibleSpendings}
                    onSpendRemove={this.handleSpendRemoval.bind(this)}/>
            </div>
        )
    }
}

export class SpendingsBox extends React.Component {
    render() {
        return (
            <div className="spendings-container">
                <SpendingsList data={this.props.data} onSpendRemove={this.props.onSpendRemove}></SpendingsList>
            </div>
        )
    }
}

export class SpendForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            category: '',
            date: date.formatDate(new Date())
        }
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handlePriceChange(e) {
        this.setState({price: e.target.value});
    }

    handleDateChange(e) {
        this.setState({date: e.target.value});
    }

    handleCategoryChange(e) {
        this.setState({category: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.onSpendSubmit(this.state);
        this.setState({
            name: '',
            price: '',
            category: '',
            date: date.formatDate(new Date())
        });
        this.firstInput.focus();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    placeholder="co..."
                    value={this.state.name}
                    onChange={this.handleNameChange.bind(this)}
                    ref={(firstInput) => {
                    this.firstInput = firstInput;
                }}/>
                <input
                    type="text"
                    placeholder="ile..."
                    value={this.state.price}
                    onChange={this.handlePriceChange.bind(this)}/>
                <input
                    type="text"
                    placeholder="kategoria..."
                    onChange={this.handleCategoryChange.bind(this)}
                    value={this.state.category}/>
                <input
                    type="date"
                    placeholder="kiedy..."
                    value={this.state.date}
                    onChange={this.handleDateChange.bind(this)}/>
                <input type="submit" value="+"/>
            </form>
        )
    }
}

export class SpendingsFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            category: ''
        }

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

    }

    handleDateChange(e) {
        this.props.onDateChange(e.target.value);
    }

    handleCategoryChange(e) {
        this.props.onCategoryChange(e.target.value);
    }

    render() {
        return (
            <form>
                Today
                <input
                    type="radio"
                    name="date"
                    value={this.props.dates.today}
                    checked={this.props.selectedDate === this.props.dates.today}
                    onChange={this.handleDateChange}/>
                All
                <input
                    type="radio"
                    name="date"
                    value={this.props.dates.all}
                    checked={this.props.selectedDate === this.props.dates.all}
                    onChange={this.handleDateChange}/>
                <input
                    type="text"
                    placeholder="filtruj kategorie..."
                    value={this.props.category}
                    onChange={this.handleCategoryChange}/>
            </form>
        )
    }
};
