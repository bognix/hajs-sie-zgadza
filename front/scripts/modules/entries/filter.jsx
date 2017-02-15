import DatePicker from 'modules/entries/datePicker';
import React from 'react';


export default class Filter extends React.Component {

    onInputValueChange (e) {
        this.props.onInputValueChange(e.target.value);
    }

    render () {
        return (
            <form className="flex">
                <DatePicker
                    selectedDate={this.props.selectedDate}
                    onPrevClick={this.props.onPrevDateClick.bind(this)}
                    onForwardClick={this.props.onForwardDateClick.bind(this)}
                    />
                    <input
                        type="text"
                        placeholder="filter..."
                        onChange={this.onInputValueChange.bind(this)}/>
            </form>
        );
    }
}
