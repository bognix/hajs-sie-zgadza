import React from 'react';
import ReactSVG from 'react-svg';

export default class MonthPicker extends React.Component {
    render () {
        return (
            <div className="date-picker">
                <div className="button" onClick={this.props.onPrevClick.bind(this)}>
                    <ReactSVG path="/public/ic_chevron_left_black_24px.svg" />
                </div>
                <input className="stretch" disabled value={this.props.selectedDate} />
                    <div className="button" onClick={this.props.onForwardClick.bind(this)}>
                        <ReactSVG path="/public/ic_chevron_right_black_24px.svg" />
                    </div>
            </div>
        );
    }
}
