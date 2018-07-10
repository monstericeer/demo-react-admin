import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { configsNeedAuth, configsNoAuth } from '../config/routes';
import LayoutWithSidebar from './LayoutWithSidebar';
import LayoutWithoutSidebar from './LayoutWithoutSidebar';
import Layout404 from './Layout404';
import NoMatch from "./NoMatch";
import 'nprogress/nprogress.css'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.tokenReducer.token,
    }
};

class App extends React.Component {

    componentDidMount() {
        if (new Date().getTime() - localStorage.timeStamp > 1000*60*60*24) { // 24 hours
            localStorage.clear();
        }
    };

    render() {
        const isAuthenticated = this.props.isAuthenticated;
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        return (
            <Switch>
                {
                    configsNeedAuth.map(({ path, exact, component: Comp }, index) => (
                        <Route key={index} path={path} exact={exact} render={(props) =>
                            isAuthenticated ? (
                                <LayoutWithSidebar {...props}>
                                    <Comp {...props}/>
                                </LayoutWithSidebar>
                            ) : (
                                <Redirect to={{pathname: "/login", state: { from: props.location }}}/>
                            )
                        }/>
                    ))
                }
                {
                    configsNoAuth.map(({ path, exact, component: Comp }, index) => (
                        <Route key={index} path={path} exact={exact} render={(props) =>
                            !isAuthenticated ? (
                                <LayoutWithoutSidebar {...props}>
                                    <Comp {...props}/>
                                </LayoutWithoutSidebar>
                            ) : (
                                <Redirect to={from}/>
                            )
                        }/>
                    ))
                }
                <Redirect from='/' to='/home' exact/>
                <Layout404>
                    <Route component={NoMatch}/>
                </Layout404>
            </Switch>
        )
    }
}

export default withRouter(connect(mapStateToProps)(App));