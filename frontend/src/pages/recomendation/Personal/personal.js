import {Wrapper} from "../../review/reviewstyle";
import { Reset } from 'styled-reset';
import React from 'react';
import TopBarComponent from "../../../components/TopBar/TopBar";

export default function MainPage() {

    return(
        <>
            <Reset/>
            <Wrapper>
                <TopBarComponent />
            </Wrapper>
        </>
    )
}