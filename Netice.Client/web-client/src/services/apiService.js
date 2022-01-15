import axios from 'axios';

const token = JSON.parse(localStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`));

const createInstance = (item) => {
    return axios.create({
        baseURL: 'http://localhost:5175/api',
        timeout: 5000,
        headers: {
            'Authorization': 'Bearer '+ token.access_token,
            'Content-Type': 'application/json'
        },
        body: item
    });
}

export const getProfileService = () => {
    if (token) {
        let instance = createInstance();
        return instance.get("/users/me").then(el => JSON.stringify(el)).then((el) => {
            return el;
        }).catch(err => {
            console.log(err);
        })
    }
    
    let noResponse = { data: "Login first" };
    
    return Promise.reject(JSON.stringify(noResponse));
}

export const getTwitterProfileService = (username) => {
    let instance = createInstance();
    
    return instance.get("/twitter/search", { params: { username: username }}).then(el => JSON.stringify(el)).then((el) => {
        return el;
    }).catch(err => {
        console.log(err);
    })
}

export const getUserCollectionsSerivce = (userId) => {
    let instance = createInstance();
    return instance.get("/socials", { params : { connectedSocialsId: userId }}).then(el => JSON.stringify(el)).then((el) => {
        return el;
    }).catch(err => {
        console.log(err);
    })
}

export const addSocialToProfile = async (jsonItem) => {

    return await fetch(`http://localhost:5175/api/socials?connectedSocialsId=${jsonItem.connectedSocialsId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token.access_token,
        },
        
        body: jsonItem
    });
}

export const deleteSocialToProfile = async (id) => {
    return await fetch(`http://localhost:5175/api/socials/delete/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token.access_token,
        }
    });
}