import date from 'utils/date';
import React from 'react';
import ReactSVG from 'react-svg';

export default class EntryForm extends React.Component {
    constructor (props) {

        super(props);

        this.state = {
            name: '',
            price: '',
            category: '',
            date: date.formatDate(new Date()),
            type: 'spend'
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

    handleTypeChange (e) {
        this.setState({
            type: e.target.value
        });
    }

    handleSubmit (e) {
        e.preventDefault();

        this.props.onEntrySubmit(this.state);
        this.setState({
            name: '',
            price: '',
            category: '',
            date: date.formatDate(new Date()),
            type: 'spend'
        });
        this.firstInput.focus();
    }

    render () {
        const radioIconChecked = <ReactSVG path="/public/ic_radio_button_checked_black_24px.svg" />;
        const radioIconUnchecked = <ReactSVG path="/public/ic_radio_button_unchecked_black_24px.svg" />;

        return (
                    <tr className="table-form">
                        <td>
                            <input className="text-input"
                                type="text"
                                placeholder="what..."
                                value={this.state.name}
                                onChange={this.handleNameChange.bind(this)}
                                ref={(firstInput) => {
                                    this.firstInput = firstInput;
                                }}/>
                        </td>
                        <td>
                            <input className="text-input"
                            type="text"
                            placeholder="price..."
                            value={this.state.price}
                            onChange={this.handlePriceChange.bind(this)}/>
                        </td>
                        <td><input className="text-input"
                            type="text"
                            placeholder="category..."
                            onChange={this.handleCategoryChange.bind(this)}
                            value={this.state.category}/>
                        </td>
                        <td><input className="text-input"
                            type="date"
                            value={this.state.date}
                            onChange={this.handleDateChange.bind(this)}/>
                        </td>
                        <td className="flex">
                            <label className="flex radio-input type-spend"><input
                                type="radio"
                                name="type"
                                value="spend"
                                checked={this.state.type === 'spend'}
                                onChange={this.handleTypeChange.bind(this)}/>
                                {this.state.type === 'spend' ? radioIconChecked : radioIconUnchecked}
                            <span className="label">Spend</span>
                            </label>
                            <label className="flex radio-input type-income"><input
                                type="radio"
                                name="type"
                                value="income"
                                checked={this.state.type === 'income'}
                                onChange={this.handleTypeChange.bind(this)} />
                            {this.state.type === 'income' ? radioIconChecked : radioIconUnchecked}
                            <span className="label">Income</span></label>
                            <button className="button-input" onClick={this.handleSubmit.bind(this)} type="submit"><ReactSVG path="/public/ic_add_black_24px.svg"/></button>
                        </td>
                    </tr>
        );

    }
}
