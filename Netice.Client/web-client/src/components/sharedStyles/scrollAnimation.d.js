import styled from 'styled-components';

export const ScrollAnimation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 5px;
    background: ${props => props.theme.main_gray_dark};
    height: ${props => props.animate};
    border: none;
`