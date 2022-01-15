import React, { useState, useEffect } from 'react';
import PrivatePage from '../PrivatePage';
import styled from 'styled-components';
import notfoundilustration from '../../../assets/page/pagenotfound.svg';

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h4 {
        font-size: 1.5rem;
        letter-spacing: 1.4px;
        
    }
`;

const NotFound = ( props ) => {
    return(
        <PrivatePage direction={"?"}>
            <NotFoundContainer>
                <h4>Something gone wrong, page not found 😢</h4>
                <img src={notfoundilustration} width={'400'} alt=""/>
                
            </NotFoundContainer>
        </PrivatePage>
    );
}

export default NotFound;