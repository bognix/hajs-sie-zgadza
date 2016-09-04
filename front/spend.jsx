import React from 'react';
import spendings from 'models/spendings';

export class SpendingsBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.setState({data: spendings})
    }

    handleSpendSubmit(spend) {
        const currentSpendings = this.state.data;
        this.setState({data: currentSpendings.concat([spend])});
    }

    handleSpendRemoval(spend) {
        const currentSpendings = this.state.data,
            indexToRemove = currentSpendings.indexOf(spend);

        currentSpendings.splice(indexToRemove, 1);

        this.setState({
            data: currentSpendings
        });
    }

    render() {
        return (
            <div className="spendings-container">
                <SpendingsList
                    data={this.state.data}
                    onSpendRemove={this.handleSpendRemoval.bind(this)}
                ></SpendingsList>
                <SpendForm onSpendSubmit={this.handleSpendSubmit.bind(this)}/>
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
                    key={Math.floor(Math.random() * 100)}
                    onSpendRemove={this.props.onSpendRemove.bind(this)}
                ></Spend>
            );
        });
    }

    render() {
        return (
            <div className="spendings-list">{this.getSpendings()}</div>
        )
    }
}

export class Spend extends React.Component {
    render() {
        return <div>
            <span>{this.props.name}: {this.props.price}</span>
            <button onClick={this.props.onSpendRemove}>-</button>
        </div>
    }
}

export class SpendForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: ''
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

    handleSubmit(e) {
        e.preventDefault();

        this.props.onSpendSubmit(this.state);
        this.setState({name: '', price: ''});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="co..." value={this.state.name}
                       onChange={this.handleNameChange.bind(this)}/>
                <input type="text" placeholder="ile..." value={this.state.price}
                       onChange={this.handlePriceChange.bind(this)}/>
                <input type="submit" value="+"/>
            </form>
        )
    }
}
