import styled from 'styled-components';

export const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
    width: 100%;
    height: 100vh;
    background: ${props => props.theme.main_white};
`