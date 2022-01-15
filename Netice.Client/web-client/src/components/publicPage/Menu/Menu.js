import React, { useState, useEffect } from 'react';

import { MenuContainer } from './menu.styled.d';

import '../../../globalStyles/simple-line-icons.css';


const Menu = ( props ) => {

    const Login = () => {
        return props.service.signinRedirect();
    }
    
    return(
        <MenuContainer>
            <div className="menuContainer_item" onClick={Login}>
                Log in <i className={'icon-login'} />
            </div>
        </MenuContainer>
    );
}

export default Menu;