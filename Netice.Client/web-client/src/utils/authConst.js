import { WebStorageStateStore } from "oidc-client";

export const IDENTITY_CONFIG = {
    authority: "http://localhost:5175",
    client_id: "web-client",
    redirect_uri: "http://localhost:3000/oidc/sign-in-callback.html",
    post_logout_redirect_uri: "http://localhost:3000",
    response_type: "code",
    scope: "openid IdentityServerApi role",
    userStore: new WebStorageStateStore({store: window.localStorage}),
    automaticSilentRenew: true,
    loadUserInfo: true,
};

export const METADATA_OIDC = {
    // issuer: "https://identityserver",
    // jwks_uri: process.env.REACT_APP_AUTH_URL + "/.well-known/openid-configuration/jwks",
    //authorization_endpoint: "http://localhost:3000/oidc/sign-in-callback.html",
    // token_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/token",
    // userinfo_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/userinfo",
    // end_session_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/endsession",
    // check_session_iframe: process.env.REACT_APP_AUTH_URL + "/connect/checksession",
    // revocation_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/revocation",
    // introspection_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/introspect"
};