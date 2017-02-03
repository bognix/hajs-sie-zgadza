import React from 'react';
import {add as addSpend, put as putSpendings} from 'utils/sheet';
import store from 'store/spends';

export default class Spendings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        store.getTodaySpends()
            .then((todaySpendings) => {
                this.setState({data: todaySpendings});
            }).catch((err) => {
                console.log(err);
            });
    }

    handleSpendSubmit(spend) {
        const currentSpendings = this.state.data;
        this.setState({data: currentSpendings.concat([spend])});

        //TODO create notification about successful save
        addSpend(spend);
    }

    handleSpendRemoval(spend) {
        const currentSpendings = this.state.data,
            indexToRemove = currentSpendings.indexOf(spend);

        currentSpendings.splice(indexToRemove, 1);

        this.setState({
            data: currentSpendings
        });

        //TODO create notification about successful save
        putSpendings(currentSpendings);
    }

    handleDateChange(date) {
        if (date === 'today') {
            store.getTodaySpends()
                .then((todaySpendings) => {
                    this.setState({data: todaySpendings});
                }).catch((err) => {
                    //TODO better error handling
                    console.log(err);
                });
        } else {
            store.getAllSpends()
                .then((allSpendings) => {
                    this.setState({data: allSpendings});
                }).catch((err) => {
                    //TODO better error handling
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div>
                <SpendingsBox
                    data={this.state.data}
                    onSpendRemove={this.handleSpendRemoval.bind(this)}
                    onSpendSubmit={this.handleSpendSubmit.bind(this)}
                />
                <SpendingsFilter onDateChange={this.handleDateChange.bind(this)} />
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
                <SpendForm onSpendSubmit={this.props.onSpendSubmit}/>
            </div>
        )
    }
}

export class SpendingsList extends React.Component {
    getSpendings() {
        return this.props.data.map((spend) => {
            return (
                <Spend
                    name={spend.name}
                    price={spend.price}
                    date={spend.date}
                    category={spend.category}
                    key={Math.floor(Math.random() * 1000)}
                    onSpendRemove={this.props.onSpendRemove.bind(this, spend)}
                ></Spend>
            );
        });
    }

    render() {
        return (
            <div className="spendings-list">
                <table>
                    <thead><tr>
                        <th>Kiedy</th><th>Co</th><th>Za ile</th><th>Usuń</th>
                    </tr></thead>
                    <tbody>
                        {this.getSpendings()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export class Spend extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.date}</td>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
                <td>{this.props.category}</td>
                <td><button onClick={this.props.onSpendRemove}>-</button></td>
            </tr>
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
            date: this.formatDate(new Date())
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
        this.firstInput.focus();
        this.setState({name: '', price: '', category: '', date: this.formatDate(new Date())});
    }

    formatDate(dateObject) {
        const month = dateObject.getMonth() + 1 < 10 ?
            `0${dateObject.getMonth() + 1}` : dateObject.getMonth(),
            day = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();

        return `${dateObject.getFullYear()}-${month}-${day}`
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

        this.values = {
            today: 'today',
            all: 'all'
        }

        this.state = {
            date: ''
        }
    }

    componentDidMount() {
        this.setState({
            date: this.values.today
        });
    }

    handleDateChange(e) {
        this.setState({
            date: e.target.value
        });

        this.props.onDateChange(e.target.value);
    }

    render() {
        return (
            <form>
                Today <input type="radio" name="date" value={this.values.today} checked={this.state.date === this.values.today} onChange={this.handleDateChange.bind(this)}/>
                All <input type="radio" name="date" value={this.values.all} checked={this.state.date === this.values.all} onChange={this.handleDateChange.bind(this)}/>
            </form>
        )
    }
}
