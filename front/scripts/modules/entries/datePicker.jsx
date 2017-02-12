import React from 'react';

export default class MonthPicker extends React.Component {
    render () {
        return (
            <div>
                <input type="button" onClick={this.props.onPrevClick.bind(this)} value="<<"/>
                <input disabled value={this.props.selectedDate} />
                <input type="button" onClick={this.props.onForwardClick.bind(this)} value=">>"/>
            </div>
        );
    }
}
