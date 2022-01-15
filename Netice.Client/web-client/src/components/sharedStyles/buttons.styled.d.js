import styled from 'styled-components';

export const ButtonHero = styled.button`
    position: relative;
    padding: .9rem;
    font-weight: 300;
    color: ${props => props.theme.main_white};
    background: ${props => props.theme.main_blue};
    font-size: 1.3rem;
    border: none;
    border-radius: 5%;
    transition: .4s all;
    letter-spacing: 1.1px;
    box-shadow: ${props => props.theme.main_boxshadow};
    
    &:hover{
        box-shadow: ${props => props.theme.main_boxshadow_active};
        cursor: pointer;
        top: -2px;
    }
`

export const ButtonConfirm = styled.button`
    padding: .5rem;
    background: ${props => props.theme.main_blue};
    color: #fff;
    letter-spacing: 1.1px;
    transition: .4s all;
    font-size: 1rem;
    border: none;
    box-shadow: ${props => props.theme.main_boxshadow};
    
    &:hover {
        cursor: pointer;
        border-radius: 10px;
        box-shadow: ${props => props.theme.main_boxshadow_active};
    }
`