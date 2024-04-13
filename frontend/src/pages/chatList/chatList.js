import {Reset} from "styled-reset";
import React, { useState } from "react";
import {Container, Title, TitleContainer,
    ListContainer, Select, SelectContainer,
    ProfileInfoWrapper, ProfileName, ProfileImg,
    ProfileIntroduce, ProfileWrapper, ProfileContainer,
    NameWrapper, IntroduceWrapper, ChatBtn, ChatBtnWrapper,
    SearchInput, SearchContainer, SearchBarWrapper
} from "./chatListStyle";

export default function ChatList() {
    const [selectedCountry, setSelectedCountry] = useState("");

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    return(
        <>
            <Reset/>
            <Container>
                <TitleContainer>
                    <Title>
                        Travien Reservation
                    </Title>
                    <SelectContainer>
                        <Select value={selectedCountry} onChange={handleCountryChange}>
                            <option value="">Select a country</option>
                            <optgroup label="America">
                                <option value="usa">USA</option>
                                <option value="cananda">Canada</option>
                            </optgroup>
                            <optgroup label="Europe">
                                <option value="uk">UK</option>
                                <option value="italy">Italy</option>
                                <option value="france">France</option>
                            </optgroup>
                            <optgroup label="Asia">
                                <option value="japan">Japan</option>
                                <option value="china">China</option>
                            </optgroup>
                        </Select>
                    </SelectContainer>
                </TitleContainer>
                <ListContainer>
                    <SearchBarWrapper>
                        <SearchContainer>
                            <SearchInput type="text" placeholder=" " color="#fff" />
                            <div>
                                <svg>
                                    <path d="M32.9418651,-20.6880772 C37.9418651,-20.6880772 40.9418651,-16.6880772 40.9418651,-12.6880772 C40.9418651,-8.68807717 37.9418651,-4.68807717 32.9418651,-4.68807717 C27.9418651,-4.68807717 24.9418651,-8.68807717 24.9418651,-12.6880772 C24.9418651,-16.6880772 27.9418651,-20.6880772 32.9418651,-20.6880772 L32.9418651,-29.870624 C32.9418651,-30.3676803 33.3448089,-30.770624 33.8418651,-30.770624 C34.08056,-30.770624 34.3094785,-30.6758029 34.4782612,-30.5070201 L141.371843,76.386562" transform="translate(83.156854, 22.171573) rotate(-225.000000) translate(-83.156854, -22.171573)"></path>
                                </svg>
                            </div>
                            <a className="dribbble" href="https://dribbble.com/shots/5547403-Search-input-animation" target="_blank" rel="noopener noreferrer">
                                <img src="https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png" alt="" />
                            </a>
                        </SearchContainer>
                    </SearchBarWrapper>
                    <ProfileContainer>
                        <ProfileWrapper>
                            <ProfileImg src={"img/img_1.png"}></ProfileImg>
                            <ProfileInfoWrapper>
                                <NameWrapper>
                                    <ProfileName>이름</ProfileName>
                                </NameWrapper>
                                <IntroduceWrapper>
                                    <ProfileIntroduce>설명</ProfileIntroduce>
                                </IntroduceWrapper>
                            </ProfileInfoWrapper>
                        </ProfileWrapper>
                        <ChatBtnWrapper>
                            <ChatBtn>💬</ChatBtn>
                        </ChatBtnWrapper>
                    </ProfileContainer>
                    <ProfileContainer>
                        <ProfileWrapper>
                            <ProfileImg src={"img/img_1.png"}></ProfileImg>
                            <ProfileInfoWrapper>
                                <NameWrapper>
                                    <ProfileName>이름</ProfileName>
                                </NameWrapper>
                                <IntroduceWrapper>
                                    <ProfileIntroduce>설명</ProfileIntroduce>
                                </IntroduceWrapper>
                            </ProfileInfoWrapper>
                        </ProfileWrapper>
                        <ChatBtnWrapper>
                            <ChatBtn>💬</ChatBtn>
                        </ChatBtnWrapper>
                    </ProfileContainer>
                    <ProfileContainer>
                        <ProfileWrapper>
                            <ProfileImg src={"img/img_1.png"}></ProfileImg>
                            <ProfileInfoWrapper>
                                <NameWrapper>
                                    <ProfileName>이름</ProfileName>
                                </NameWrapper>
                                <IntroduceWrapper>
                                    <ProfileIntroduce>설명</ProfileIntroduce>
                                </IntroduceWrapper>
                            </ProfileInfoWrapper>
                        </ProfileWrapper>
                        <ChatBtnWrapper>
                            <ChatBtn>💬</ChatBtn>
                        </ChatBtnWrapper>
                    </ProfileContainer>
                </ListContainer>
            </Container>
        </>
    )
}