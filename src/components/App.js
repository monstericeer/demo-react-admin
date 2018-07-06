import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { configsNeedAuth, configsNoAuth } from '../config/routes';
import LayoutWithSidebar from './LayoutWithSidebar';
import LayoutWithoutSidebar from './LayoutWithoutSidebar';
import Layout404 from './Layout404';
import NoMatch from "./NoMatch";

const isAuthenticated = true;

class App extends React.Component {

    render() {
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
                <Layout404>
                    <Route component={NoMatch}/>
                </Layout404>
            </Switch>
        )
    }
}

export default withRouter(App);