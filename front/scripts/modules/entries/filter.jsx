import React from 'react';

export default class Filter extends React.Component {

    onInputValueChange (e) {
        this.props.onInputValueChange(e.target.value);
    }

    render () {
        return (
            <form>
                <input
                    type="text"
                    placeholder="filter..."
                    onChange={this.onInputValueChange.bind(this)}/>
            </form>
        );
    }
}
