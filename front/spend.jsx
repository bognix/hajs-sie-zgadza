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

    render() {
        return (
            <div className="spendings-container">
                <SpendingsList data={this.state.data}></SpendingsList>
                <SpendForm onSpendSubmit={this.handleSpendSubmit.bind(this)}/>
            </div>
        )
    }
}

export class SpendingsList extends React.Component {
    getSpendings() {
        return this.props.data.map(function (spend) {
            return (
                <Spend name={spend.name} price={spend.price} key={Math.floor(Math.random() * 100)}></Spend>
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
        return <div>{this.props.name}: {this.props.price}</div>
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
