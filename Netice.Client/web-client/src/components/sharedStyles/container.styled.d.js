import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    // width: 100vw;
    height: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.main_white};
    color: ${props => props.theme.main_gray_dark};
    overflow: hidden;
`;