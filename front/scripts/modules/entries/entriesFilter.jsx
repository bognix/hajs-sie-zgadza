import React from 'react';

export default class EntriesFilter extends React.Component {
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
