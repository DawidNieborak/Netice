import styled from 'styled-components';

export const DashboardContainer = styled.div`
    background: ${props => props.theme.main_gray};
    postion: relative;
    font-size: 1rem;
    color: ${props => props.theme.main_gray_dark};
    width: 100%;
`;

export const ContentContainer = styled.section`
    height: calc(100vh - 50px);
    padding: 50px;
    background: ${props => props.theme.main_gray};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative
`;

export const ContentContainerTitle = styled.h2`
    position: absolute;
    top: 15px;
    left: 15px;
    font-weight: 300;
    font-size: .8rem;
    letter-spacing: 1.5px;
    background: #363636;
    padding :5px;
    color: #fff;
`;