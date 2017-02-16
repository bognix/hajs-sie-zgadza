import DatePicker from 'modules/entries/datePicker';
import React from 'react';
import ReactSVG from 'react-svg';


export default class Filter extends React.Component {

    onInputValueChange (e) {
        this.props.onInputValueChange(e.target.value);
    }

    render () {
        return (
            <form className="flex filters">
                <DatePicker
                    selectedDate={this.props.selectedDate}
                    onPrevClick={this.props.onPrevDateClick.bind(this)}
                    onForwardClick={this.props.onForwardDateClick.bind(this)}
                    />
                <div className="category-filter">
                    <ReactSVG path="/public/ic_search_black_24px.svg" />
                        <input
                            type="text"
                            placeholder="filter by category..."
                            onChange={this.onInputValueChange.bind(this)}/>
                </div>
                <div className="import" onClick={this.props.onImportClick.bind(this)}>
                    <ReactSVG path="/public/ic_file_download_black_24px.svg" />
                    <span>Import Planned</span>
                </div>
            </form>
        );
    }
}
