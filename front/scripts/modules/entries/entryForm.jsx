import React from 'react';
import date from 'utils/date';

export default class EntryForm extends React.Component {
    constructor (props) {

        super(props);

        this.state = {
            name: '',
            price: '',
            category: '',
            date: date.formatDate(new Date())
        };

    }

    handleNameChange (e) {

        this.setState({name: e.target.value});

    }

    handlePriceChange (e) {

        this.setState({price: e.target.value});

    }

    handleDateChange (e) {

        this.setState({date: e.target.value});

    }

    handleCategoryChange (e) {

        this.setState({category: e.target.value});

    }

    handleSubmit (e) {

        e.preventDefault();

        this.props.onEntrySubmit(this.state);
        this.setState({
            name: '',
            price: '',
            category: '',
            date: date.formatDate(new Date())
        });
        this.firstInput.focus();

    }

    render () {

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
        );

    }
}
