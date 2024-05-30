// MainPage.js
import React from 'react';
import { Reset } from 'styled-reset';
import { Wrapper } from "../review/reviewstyle";
import TopBarComponent from '../../components/TopBar/TopBar';

export default function MainPage() {
    return (
        <>
            <Reset />
            <Wrapper>
                <TopBarComponent />
            </Wrapper>
        </>
    );
}
