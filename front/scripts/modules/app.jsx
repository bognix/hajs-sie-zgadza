import Navigation from 'modules/navigation';
import React from 'react';

export default class App extends React.Component {
    handleSuccessfulLogin () {

    }

    render () {

        return (
        <div>
            <Navigation onLoginSuccess={this.handleSuccessfulLogin.bind(this)}/>
                {this.props.children}
        </div>);
    }
}
