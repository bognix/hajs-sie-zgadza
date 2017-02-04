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
            visibleSpendings: [],
            selectedDate: '',
        }

        this.dates = {
            today: 'today',
            all: 'all'
        }
    }

    componentDidMount() {
        store.getAllSpends()
            .then((allSpendings) => {
                this.setState({
                    visibleSpendings: allSpendings,
                    allSpendings: allSpendings,
                    selectedDate: this.dates.all
                });
                console.log('bogna', this.state.selectedDate);
            }).catch((err) => {
                console.log(err);
            });

    }

    handleSpendSubmit(spend) {
        const currentSpendings = this.state.visibleSpendings;

        //@TODO check if spend should be added to currently visible spends
        this.setState({
            visibleSpendings: currentSpendings.concat([spend])
        });

        //TODO create notification about successful save
        addSpend(spend);
    }

    //@FIXME this method should update all spends
    handleSpendRemoval(spend) {
        const currentSpendings = this.state.visibleSpendings,
            indexToRemove = currentSpendings.indexOf(spend);

        currentSpendings.splice(indexToRemove, 1);

        this.setState({
            visibleSpendings: currentSpendings
        });

        //TODO create notification about successful save
        putSpendings(currentSpendings);
    }

    handleDateChange(date) {
        if (date === this.dates.today) {
            store.getAllSpends()
                .then((allSpendings) => {
                    this.setState({
                        visibleSpendings: allSpendings,
                        selectedDate: this.dates.today
                    });
                }).catch((err) => {
                    //TODO better error handling
                    console.log(err);
                });
        } else {
            store.getAllSpends()
                .then((allSpendings) => {
                    this.setState({
                        visibleSpendings: allSpendings,
                        selectedDate: this.dates.all
                    });
                }).catch((err) => {
                    //TODO better error handling
                    console.log(err);
                });
        }
    }

    handleCategoryChange(category) {
        if (!category) {
            return this.setState({
                visibleSpendings: this.state.allSpendings
            });
        }

        const filteredSpends = this.state.visibleSpendings.filter((spend) => {
            return spend.category.indexOf(category) === 0;
        });

        this.setState({
            visibleSpendings: filteredSpends
        });
    }

    render() {
        return (
            <div>
                <SpendingsFilter onDateChange={this.handleDateChange.bind(this)}
                     onCategoryChange={this.handleCategoryChange.bind(this)}
                     dates={this.dates} selectedDate={this.state.selectedDate}
                 />
                <SpendForm onSpendSubmit={this.handleSpendSubmit.bind(this)}/>
                <SpendingsBox
                    data={this.state.visibleSpendings}
                    onSpendRemove={this.handleSpendRemoval.bind(this)}
                />
            </div>
        )
    }
}

export class SpendingsBox extends React.Component {
    render() {
        return (
            <div className="spendings-container">
                <SpendingsList
                    data={this.props.data}
                    onSpendRemove={this.props.onSpendRemove}
                ></SpendingsList>
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
        this.setState({
            name: e.target.value
        });
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
        this.setState({name: '', price: '', category: '', date: date.formatDate(new Date())});
        this.firstInput.focus();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="co..." value={this.state.name}
                   onChange={this.handleNameChange.bind(this)}
                   ref={(firstInput) => { this.firstInput = firstInput; }}/>
                <input type="text" placeholder="ile..." value={this.state.price}
                   onChange={this.handlePriceChange.bind(this)}/>
               <input type="text" placeholder="kategoria..."
                   onChange={this.handleCategoryChange.bind(this)} value={this.state.category}/>
               <input type="date" placeholder="kiedy..." value={this.state.date}
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
        this.setState({
            category: e.target.value
        });
        this.props.onCategoryChange(e.target.value);
    }

    render() {
        return (
            <form>
                Today <input type="radio" name="date" value={this.props.dates.today}
                checked={this.props.selectedDate === this.props.dates.today} onChange={this.handleDateChange}/>
                All <input type="radio" name="date" value={this.props.dates.all}
                checked={this.props.selectedDate === this.props.dates.all} onChange={this.handleDateChange}/>
                <input type="text" placeholder="filtruj kategorie..." value={this.state.category} onChange={this.handleCategoryChange}/>
            </form>
        )
    }
}
;
