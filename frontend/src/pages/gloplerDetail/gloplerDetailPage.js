import React from 'react';
import TopBarComponent from '../../components/TopBar/TopBar';
import {useNavigate} from "react-router-dom";

export default function GloplerDetailPage() {
    const navigate = useNavigate();
    const onClickGoChat = () => {
        navigate('/chat');
    }
    return (
        <>
            <div style={{ width: '100%', height: '20px' }}></div>
            <TopBarComponent />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <div style={{
                    textAlign: 'center',
                    width: '60%',
                    padding: '20px',
                }}>
                    <div style={{
                        backgroundColor: '#f8f8f8',
                        borderRadius: '20px',
                        padding: '30px',
                        position: 'relative',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        height: '230px',
                        margin: '80px 0 20px 0',
                        width: '100%',
                    }}>
                        <img
                            src="/Img/gloplerImg.png"
                            alt="Profile"
                            style={{
                                borderRadius: '50%',
                                width: '25%',
                                position: 'absolute',
                                top: '-50px', // Adjust this value to control how much the image overlaps
                                left: '70px', // Align to the left of the gray div
                                border: '2px solid white',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <div style={{
                            marginLeft: '40%',
                            textAlign: 'left'
                        }}> {/* Adjusted to add space for the image */}
                            <div style={{margin: 0, color: '#4E53EE', fontSize: '30px', fontWeight: 'bold', width: "100%"}}>여행 님 <span
                                style={{color: '#FFA500', fontSize: '17px', fontWeight: 'bold'}}>일본 글로플러</span>
                                <img style={{width: "30px", float: 'right'}} src='/Img/img_2.png' alt='하뚜'/>
                            </div>
                            <div style={{margin: '10px 0'}}>
                                <span style={{
                                    backgroundColor: '#C7C9FF',
                                    padding: '5px 10px',
                                    borderRadius: '20px',
                                    marginRight: '5px',
                                    color: '#5F5F5F'
                                }}>#일본</span>
                                <span style={{
                                    backgroundColor: '#ececec',
                                    padding: '5px 10px',
                                    borderRadius: '20px',
                                    marginRight: '5px',
                                    color: '#5F5F5F'
                                }}>#맛집중심</span>
                                <span style={{
                                    backgroundColor: '#ececec',
                                    padding: '5px 10px',
                                    borderRadius: '20px',
                                    marginRight: '5px',
                                    color: '#5F5F5F'
                                }}>#액티비티</span>
                                <span style={{
                                    backgroundColor: '#ececec',
                                    padding: '5px 10px',
                                    borderRadius: '20px',
                                    marginRight: '5px',
                                    color: '#5F5F5F'
                                }}>#빠른연락</span>
                            </div>
                            <p style={{margin: '20px 0 10px 0', color: 'black', fontSize: '17px'}}>
                                일본 맛집 리스트 보유 중 입니다.<br/>
                                일본 현지 식당, 호텔, 체험 등 예약 대행 서비스를 진행합니다.
                            </p>
                        </div>
                        <button style={{
                            backgroundColor: '#4E53EE',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            width: '380px',
                            height: '50px',
                            marginTop: '40px',
                            fontWeight: 'bold',
                            fontSize: '15px'
                        }}
                            onClick={onClickGoChat}
                        >채팅하기
                        </button>
                    </div>
                    <img style={{width: '100%'}} src='/Img/글로상세1.png' alt='상세 이미지1'/>
                    <img style={{width: '100%'}} src='/Img/글로상세2.png' alt='상세 이미지2'/>
                    <img style={{width: '100%', marginTop: '50px'}} src='/Img/글로상세3.png' alt='상세 이미지2'/>
                    {/*<div style={{marginTop: '80px', textAlign: 'center'}}>*/}
                    {/*    <h3 style={{color: '#4A90E2'}}>소개</h3>*/}
                    {/*    <ul style={{listStyle: 'none', padding: 0, color: '#4A4A4A', textAlign: 'left'}}>*/}
                    {/*        <li>일본 10년 거주</li>*/}
                    {/*        <li>JLPT N1</li>*/}
                    {/*        <li>일본 유학 경험 보유</li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div style={{ marginTop: '40px', textAlign: 'center' }}>*/}
                    {/*    <h3 style={{ color: '#4A90E2' }}>통계</h3>*/}
                    {/*    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>*/}
                    {/*        <div style={{ marginRight: '20px' }}>*/}
                    {/*            <p style={{ margin: 0, color: '#4A4A4A' }}>총 예약 대행 건</p>*/}
                    {/*            <p style={{ margin: 0, color: '#4A90E2', fontSize: '1.5em' }}>56건</p>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <p style={{ margin: 0, color: '#4A4A4A' }}>별점</p>*/}
                    {/*            <p style={{ margin: 0, color: 'orange', fontSize: '1.5em' }}>★ 4.9 (40)</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div style={{ marginTop: '40px' }}>*/}
                    {/*    <h3 style={{ color: '#4A90E2' }}>예약 후기</h3>*/}
                    {/*    <div style={{*/}
                    {/*        display: 'flex',*/}
                    {/*        justifyContent: 'space-between',*/}
                    {/*        overflowX: 'auto',*/}
                    {/*        paddingBottom: '10px'*/}
                    {/*    }}>*/}
                    {/*        <div style={{*/}
                    {/*            border: '1px solid #ddd',*/}
                    {/*            borderRadius: '5px',*/}
                    {/*            padding: '10px',*/}
                    {/*            marginRight: '10px',*/}
                    {/*            minWidth: '300px',*/}
                    {/*            textAlign: 'left'*/}
                    {/*        }}>*/}
                    {/*            <div style={{ display: 'flex', alignItems: 'center' }}>*/}
                    {/*                <img src="/path/to/reviewer1.jpg" alt="Reviewer 1" style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }} />*/}
                    {/*                <p style={{ margin: 0 }}>여행조아</p>*/}
                    {/*            </div>*/}
                    {/*            <p style={{ margin: '10px 0 5px', color: '#FFA500' }}>★★★★★</p>*/}
                    {/*            <p style={{ color: '#666' }}>다양한 식당, 노상에서 즐기는 구리모스시! 도쿄의 최애 명소 중 하나입니다. 꼭 가보세요!</p>*/}
                    {/*            <p style={{ color: '#888', fontSize: '0.8em' }}>2024.03.27</p>*/}
                    {/*            <div style={{ display: 'flex', justifyContent: 'space-between' }}>*/}
                    {/*                <img src="/path/to/food1.jpg" alt="Food 1" style={{ width: '32%', borderRadius: '5px' }} />*/}
                    {/*                <img src="/path/to/food2.jpg" alt="Food 2" style={{ width: '32%', borderRadius: '5px' }} />*/}
                    {/*                <img src="/path/to/food3.jpg" alt="Food 3" style={{ width: '32%', borderRadius: '5px' }} />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div style={{*/}
                    {/*            border: '1px solid #ddd',*/}
                    {/*            borderRadius: '5px',*/}
                    {/*            padding: '10px',*/}
                    {/*            marginRight: '10px',*/}
                    {/*            minWidth: '300px',*/}
                    {/*            textAlign: 'left'*/}
                    {/*        }}>*/}
                    {/*            <div style={{ display: 'flex', alignItems: 'center' }}>*/}
                    {/*                <img src="/path/to/reviewer2.jpg" alt="Reviewer 2" style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }} />*/}
                    {/*                <p style={{ margin: 0 }}>다람쥐</p>*/}
                    {/*            </div>*/}
                    {/*            <p style={{ margin: '10px 0 5px', color: '#FFA500' }}>★★★★★</p>*/}
                    {/*            <p style={{ color: '#666' }}>채팅하는 동안 너무 친절하시고 축제 정보까지 알려주셔서 여행 계획 짜는 데에 큰 부담이 없었어요.</p>*/}
                    {/*            <p style={{ color: '#888', fontSize: '0.8em' }}>2024.04.10</p>*/}
                    {/*            <div style={{ display: 'flex', justifyContent: 'space-between' }}>*/}
                    {/*                <img src="/path/to/sakura1.jpg" alt="Sakura 1" style={{ width: '32%', borderRadius: '5px' }} />*/}
                    {/*                <img src="/path/to/sakura2.jpg" alt="Sakura 2" style={{ width: '32%', borderRadius: '5px' }} />*/}
                    {/*                <img src="/path/to/sakura3.jpg" alt="Sakura 3" style={{ width: '32%', borderRadius: '5px' }} />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
}
