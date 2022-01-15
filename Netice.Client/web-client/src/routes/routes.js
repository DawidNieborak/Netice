import * as React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { Callback } from "../components/auth/callback";
import { Logout } from "../components/auth/logout";
import { LogoutCallback } from "../components/auth/logoutCallback";
import { PrivateRoute } from "./privateRoute";
import { SilentRenew } from "../components/auth/silentRenew";

import Register  from "../components/auth/register";
import PublicPage from "../components/publicPage/PublicPage"
import PrivatePage from "../components/privatePage/PrivatePage"

import AddSocials from '../components/privatePage/AddSocials/AddSocials';
import Collections from '../components/privatePage/Collections/Collections';
import NotFound from '../components/privatePage/NotFound/NotFound';

export const Routes = (
    <Switch>
        <Route exact={true} path="/signin-oidc" component={Callback} />
        <Route exact={true} path="/logout" component={Logout} />
        <Route exact={true} path="/logout/callback" component={LogoutCallback} />
        <Route exact={true} path="/register" component={Register} />
        <Route exact={true} path="/silentrenew" component={SilentRenew} />
        <Route exact path="/" component={PublicPage} />
        <PrivateRoute exact path="/home" component={PrivatePage} />
        <PrivateRoute exact path="/dashboard" component={PrivatePage} />
        <PrivateRoute exact path="/addsocials" component={ AddSocials } />
        <PrivateRoute exact path="/collections" component={ Collections } />
        
        <PrivateRoute path="*" component={NotFound} />
            
    </Switch>
);