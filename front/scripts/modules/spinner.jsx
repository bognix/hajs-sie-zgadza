import React from 'react';
import ReactSVG from 'react-svg';

export default class Spinner extends React.Component {
    render () {
        const className = this.props.visible ? "spinner" : "spinner hidden";


        return (
            <div className={className}>
                <ReactSVG path="/public/ic_attach_money_black_24px.svg" />
            </div>
        );
    }
}
