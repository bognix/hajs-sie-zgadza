import Navigation from 'modules/navigation';
import React from 'react';

export default class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            token: ''
        };
    }

    handleSuccessfulLogin (authData) {
        this.setState({
            token: authData.access_token
        });
    }

    render () {

        return (
        <div>
            <Navigation onLoginSuccess={this.handleSuccessfulLogin.bind(this)}/>
                {this.props.children && React.cloneElement(this.props.children, {
                    token: this.state.token
                })}
        </div>);
    }
}
