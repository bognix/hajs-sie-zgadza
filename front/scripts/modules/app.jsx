import createSheetApi from 'store/sheets/sheetApiFactory';
import Navigation from 'modules/navigation';
import userService from 'services/user';
import React from 'react';
import sheetService from 'services/sheets';

export default class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            sheetApi: null
        };
    }

    handleSuccessfulLogin (authData) {
        if (authData.access_token) {
            userService.getUserSheet().then((spreadSheetId) => {
                if (spreadSheetId) {
                    const sheetApi = createSheetApi({
                        token: authData.access_token,
                        range: 'A:Z',
                        spreadSheetId
                    });

                    this.setState({
                        sheetApi
                    });
                } else {
                    sheetService.createSpreadSheet(authData.access_token).
                    then((data) => {
                        userService.setUserSheet(data);
                    });
                }
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
            <div className="container">
                {this.props.children && React.cloneElement(this.props.children, {
                    sheetApi: this.state.sheetApi
                })}
            </div>
        </div>);
    }
}
