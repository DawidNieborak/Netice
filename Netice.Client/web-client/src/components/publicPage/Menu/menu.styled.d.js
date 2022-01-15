import styled from 'styled-components';

export const MenuContainer = styled.div`
    position: absolute;
    left: 0;
    top: 20px;
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: right;
    gap: 12px;
    
    .menuContainer_item {
        transition: .4s all;
        display: block;
        flex-direction: row;
        justify-content: right;
        align-items: right;
        padding: 40px 20px;
        cursor: pointer;
        
        &:hover {
            transform: scale(0.95);
        }
    }
`