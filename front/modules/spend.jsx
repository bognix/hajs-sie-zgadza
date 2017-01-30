import React from 'react';
import {getAll as getAllSpends, add as addSpend, put as putSpendings} from 'utils/sheet';

export default class Spendings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        getAllSpends()
            .then((allSpendings) => {
                this.setState({data: allSpendings});
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

    render() {
        return (
            <div>
                <SpendingsBox
                    data={this.state.data}
                    onSpendRemove={this.handleSpendRemoval.bind(this)}
                    onSpendSubmit={this.handleSpendSubmit.bind(this)}
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

    handleSubmit(e) {
        e.preventDefault();

        this.props.onSpendSubmit(this.state);
        this.setState({name: '', price: '', date: this.formatDate(new Date())});
    }

    formatDate(dateObject) {
        const month = dateObject.getMonth() + 1 < 10 ?
            `0${dateObject.getMonth() + 1}` : dateObject.getMonth();
        return `${dateObject.getFullYear()}-${month}-${dateObject.getDate()}`
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="co..." value={this.state.name}
                       onChange={this.handleNameChange.bind(this)}/>
                <input type="text" placeholder="ile..." value={this.state.price}
                       onChange={this.handlePriceChange.bind(this)}/>
               <input type="date" placeholder="kiedy..." value={this.state.date}
                      onChange={this.handleDateChange.bind(this)}/>
                <input type="submit" value="+"/>
            </form>
        )
    }
}
