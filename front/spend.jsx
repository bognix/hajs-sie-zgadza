import React from 'react';

export default class Spend extends React.Component {
    render() {
        return <div>{this.props.name}: {this.props.price}</div>
    }
}
