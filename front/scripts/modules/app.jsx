import createSheetApi from 'store/sheets/sheetApiFactory';
import Navigation from 'modules/navigation';
import React from 'react';

export default class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            sheetApi: null
        };
    }

    handleSuccessfulLogin (authData) {
        if (authData.access_token) {
            const sheetApi = createSheetApi({
                token: authData.access_token,
                range: 'A:E',
                numberOfColumns: 5
            });

            this.setState({
                sheetApi
            });
        } else {
            this.setState({
                sheetApi: null
            });
        }
    }

    render () {

        return (
        <div>
            <Navigation onLoginSuccess={this.handleSuccessfulLogin.bind(this)}/>
            <div>
                {this.props.children && React.cloneElement(this.props.children, {
                    sheetApi: this.state.sheetApi
                })}
            </div>
        </div>);
    }
}
