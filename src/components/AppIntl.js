import React from 'react';
import { IntlProvider } from 'react-intl';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App';
import history from "../history/history";

const mapStateToProps = (state) => {
    return {
        locale: state.localeReducer.locale,
        messages: state.localeReducer.msgs,
    }
};

class AppIntl extends React.Component {
    render() {
        return (
            <IntlProvider locale={this.props.locale} messages={this.props.messages}>
                <Router history={history}>
                    <App />
                </Router>
            </IntlProvider>
        )
    }
}

const ConnectedAppIntl = connect(mapStateToProps)(AppIntl);
export default ConnectedAppIntl;

