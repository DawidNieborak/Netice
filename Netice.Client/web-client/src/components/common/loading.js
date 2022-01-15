import React from 'react';
import { LoadingContainer } from './loading.styled.d';
import ReactLoading from 'react-loading';
import ilustrationLoading from '../../assets/illustrations/undraw_social_growth_re_tjy9.svg'
const Loading = () => {
    return(
        
        <LoadingContainer>
            <img src={ilustrationLoading} width={'320px'} alt="illustration"/>
            <ReactLoading type={'spin'} color={'#7F96FF'} height={'40px'} width={'40px'} />
        </LoadingContainer>
        
        
    );
}

export default Loading;