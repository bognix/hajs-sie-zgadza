import React from 'react';

export default class EntriesFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: ''
        }

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleCategoryChange(e) {
        this.props.onCategoryChange(e.target.value);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="filtruj kategorie..."
                    value={this.props.category}
                    onChange={this.handleCategoryChange}/>
            </form>
        )
    }
};
