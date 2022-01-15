import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "../providers/authProvider";
import Loading from '../components/common/loading';

export const PrivateRoute = ({ component, ...rest }) => {
    const renderFn = (Component) => (props) => (
        <AuthConsumer>
            {({ isAuthenticated, signinRedirect }) => {
                if (!!Component && isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    signinRedirect();
                    return <Loading />;
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderFn(component)} />;
};