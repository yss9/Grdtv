import React, {useEffect, useState} from 'react';
import { Reset } from "styled-reset";
import {
    Answer,
    Character,
    ContentDiv,
    MBTIResult,
    ModalDiv,
    Process,
    ProcessBar,
    Question,
    ResultButton, ResultButtonWrapper,
    ResultCharacter,
    ResultSentence,
} from './MBTItestStyle';
import {AnimatePresence} from "framer-motion";
import { motion } from 'framer-motion';
import {questions, answers} from "./questionsData";
import {useNavigate} from "react-router-dom";

const MBTItestPage = () => {
    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center', // 가로 중앙 정렬
        alignItems: 'center', // 세로 중앙 정렬
        width: '100vw', // 가로 너비를 뷰포트 전체로 설정
        height: '100vh', // 세로 높이를 뷰포트 전체로 설정
        overflow: 'hidden', // 가로, 세로 모두 넘치는 부분 숨기기
        backgroundColor: '#EFF1FF' // 배경색 설정
    };

    const svgStyle = {
        width: '100vw', // 가로 너비를 화면에 맞춤
        height: 'auto', // 높이를 비율에 맞게 자동 조정
    };



    const [E, setE] = useState(0);
    const [I, setI] = useState(0);
    const [N, setN] = useState(0);
    const [S, setS] = useState(0);
    const [T, setT] = useState(0);
    const [F, setF] = useState(0);
    const [J, setJ] = useState(0);
    const [P, setP] = useState(0);

    const setters = {
        E: () => setE(prev => prev + 1),
        I: () => setI(prev => prev + 1),
        N: () => setN(prev => prev + 1),
        S: () => setS(prev => prev + 1),
        T: () => setT(prev => prev + 1),
        F: () => setF(prev => prev + 1),
        J: () => setJ(prev => prev + 1),
        P: () => setP(prev => prev + 1),
    };

    const [step, setStep] = useState(0);
    const [result, setResult] = useState([null]);
    const [resultMBTI, setResultMBTI] = useState(null);
    const [page, setPage] = useState('/');

    const onClickAnswer = async (selected) => {
        const goToNextStep = () => {
            let value;
            if (selected === 1) value = answers[step*2-2].value;
            else value = answers[step*2-1].value;
            setters[value]?.();
            setResultMBTI(result[0].split(" ")[0]+result[1].split(" ")[0]+result[2].split(" ")[0]+result[3].split(" ")[0])
            setStep(step+1);
        }
        await goToNextStep();
    }


    useEffect(() => {
        const calculateResult = (value1, value2, type1, type2) => {
            const mbti = value1 > value2 ? type1 : type2;
            const percent = Math.max(value1, value2) === 3 ? (80) : (60);

                Math.round((Math.max(value1, value2) / (value1 + value2)) * 100);
            return `${mbti} ${percent}`;
        };

        // 첫 번째와 두 번째 결과 계산
        const firstResult = calculateResult(E, I, 'E', 'I');
        const secondResult = calculateResult(N, S, 'N', 'S');
        const thirdResult = calculateResult(T, F, 'T', 'F');
        const fourthResult = calculateResult(J, P, 'J', 'P');

        setResult([firstResult, secondResult, thirdResult, fourthResult]);
    }, [E, I, N, S, T, F, J, P]);

    const getSignupDataWithExpiry = (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null; // 데이터가 없는 경우
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            // 만료된 경우 데이터 삭제
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }; // 가져오기

    useEffect(() => {
        const pageData = getSignupDataWithExpiry('pageData');
        console.log(pageData);
        if (pageData) setPage(pageData);
    }, []); // 사용하기

    const setDataWithExpiry = (key, value, expiryInMinutes) => {
        try {
            const now = new Date();
            const dataWithExpiry = {
                value, // 실제 데이터
                expiry: now.getTime() + expiryInMinutes * 60 * 1000 // 만료 시간 (밀리초 단위)
            };
            localStorage.setItem(key, JSON.stringify(dataWithExpiry));
        } catch {
            console.log('mbti 저장 실패')
        }
    }; // 저장하기

    const onClickSaveButton = () => {
        // 1분 후 만료
        setDataWithExpiry('mbtiResult', JSON.stringify(result), 1);
        navigate(page)
    } // 적용
    
    return (
        <div style={containerStyle}>
            <Reset/>
            <svg style={svgStyle} preserveAspectRatio="xMidYMid slice" viewBox="0 0 2190 1302" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1596_852)">
                    <rect width="2190" height="1302" fill="#EFF1FF"/>
                    <path d="M2257.09 990.898C2257.09 921.92 2198.37 866.008 2125.93 866.008C2124.67 866.008 2123.43 866.033 2122.17 866.058C2108.16 811.457 2056.44 770.921 1994.77 770.921C1922.33 770.921 1863.61 826.833 1863.61 895.811C1863.61 901.989 1864.1 908.054 1865 913.995L1863.12 914.082C1863.43 910.525 1863.61 906.919 1863.61 903.274C1863.61 834.296 1804.9 778.385 1732.46 778.385C1684.76 778.385 1643.02 802.634 1620.07 838.876C1618.64 838.839 1617.22 838.826 1615.78 838.826C1530.57 838.826 1459.73 897.359 1445.18 974.511C1424.12 935.723 1381.6 909.215 1332.58 909.215C1262.62 909.215 1205.89 963.229 1205.89 1029.85C1205.89 1034.8 1206.21 1039.68 1206.82 1044.48L1204.03 1044.08C1205.25 1038.32 1205.89 1032.38 1205.89 1026.29C1205.89 978.555 1166.62 939.554 1117.17 936.958C1121.68 924.016 1124.13 910.176 1124.13 895.799C1124.13 823.725 1062.78 765.305 987.089 765.305C943.627 765.305 904.896 784.575 879.784 814.627C880.059 811.283 880.19 807.9 880.19 804.493C880.19 732.42 818.837 674 743.146 674C693.262 674 649.616 699.372 625.644 737.3C608.566 722.336 585.773 713.188 560.74 713.188C528.812 713.188 500.54 728.064 483.121 750.916C473.593 749.318 463.776 748.494 453.775 748.494C360.573 748.519 285 820.468 285 909.24V1321H2221.72L2231.59 1112.18C2272.7 1091.1 2257.09 1038.47 2257.09 990.898Z" fill="white" stroke="#DCE0F3" strokeWidth="7"/>
                    <path d="M696.243 1094.19C702.806 1078.05 706.43 1060.44 706.43 1041.99C706.43 964.395 642.518 901.493 563.679 901.493C514.147 901.493 470.508 926.322 444.913 964.033C425.298 936.66 397.384 919.563 366.429 919.563C353.099 919.563 340.339 922.743 328.555 928.529C330.291 919.775 331.203 910.746 331.203 901.493C331.203 823.901 267.291 761 188.452 761C124.21 761 69.8888 802.764 51.972 860.203C34.9929 853.182 16.3411 849.304 -3.23562 849.304C-82.0874 849.316 -146 912.218 -146 989.81C-146 1040.13 -119.112 1084.27 -78.7042 1109.08V1322.97H578.364C604.543 1354.71 644.482 1375 689.248 1375C768.087 1375 832 1312.1 832 1234.51C832 1156.92 771.825 1097.77 696.23 1094.19H696.243Z" fill="#F6F6FF" stroke="#DCE0F3" strokeWidth="7" strokeMiterlimit="10"/>
                    <path d="M1746.36 717.568L1748.51 711.877L1754.2 714.025C1766.9 718.818 1781.08 712.408 1785.87 699.711C1790.67 687.013 1784.26 672.829 1771.56 668.036L1765.87 665.888L1768.02 660.197C1772.81 647.49 1766.4 633.306 1753.7 628.509C1741 623.716 1726.82 630.126 1722.02 642.824L1719.87 648.515L1714.18 646.366C1701.49 641.573 1687.3 647.983 1682.51 660.681C1677.72 673.379 1684.13 687.563 1696.82 692.356L1702.51 694.504L1700.37 700.195C1695.57 712.892 1701.98 727.076 1714.68 731.869C1727.38 736.663 1741.56 730.253 1746.36 717.555L1746.36 717.568Z" fill="#FFD28E"/>
                    <path d="M1806.39 984.752C1816.86 1008.06 1852.25 1013.66 1874.67 1010.88C1889.02 1009.11 1903.72 1003.18 1914.57 993.506C1924.62 984.532 1928.5 971.192 1927.1 958.072C1924.57 934.291 1906.14 910.289 1879.55 917.209C1862.3 921.697 1849.9 935.257 1848.02 952.876C1846.14 970.495 1854.71 987.503 1867.84 998.666C1882.98 1011.54 1903.57 1019.61 1923.66 1017.73C1942.36 1015.97 1960.32 1005.61 1968.6 988.383C1971.31 982.722 1970.17 975.838 1964.41 972.488C1959.31 969.517 1951.17 970.972 1948.43 976.658C1937.65 999.106 1909.56 997.884 1890.73 986.647C1881.39 981.071 1873.09 972.476 1871.34 961.374C1869.73 951.152 1874.27 943.779 1883.74 940.209C1889.71 937.959 1892.81 938.986 1896.91 943.131C1900.48 946.726 1903.44 954.404 1903.87 959.295C1904.47 966.02 1904.26 971.828 1898.04 977.061C1891.32 982.722 1881.71 986.598 1873.01 987.833C1864.31 989.068 1853.29 988.065 1844.11 985.314C1839.78 984.018 1836.47 982.624 1832.64 980.154C1829.77 978.308 1828.26 976.829 1826.54 973.002C1823.97 967.279 1815.59 965.91 1810.57 968.832C1804.65 972.28 1803.8 978.981 1806.38 984.727L1806.39 984.752Z" fill="#FFD28E"/>
                    <path d="M490.449 643.302L485.617 639.554L489.365 634.721C497.729 623.938 495.767 608.411 484.984 600.047C474.201 591.684 458.674 593.645 450.31 604.428L446.562 609.261L441.729 605.513C430.938 597.143 415.411 599.104 407.041 609.895C398.678 620.678 400.639 636.205 411.422 644.569L416.255 648.317L412.507 653.15C404.143 663.933 406.105 679.46 416.888 687.824C427.67 696.188 443.197 694.226 451.561 683.443L455.31 678.61L460.142 682.359C470.925 690.723 486.452 688.761 494.816 677.978C503.18 667.195 501.218 651.668 490.435 643.304L490.449 643.302Z" fill="#FFD28E"/>
                    <path d="M838 159.452C838 220.963 889.065 270.837 952.07 270.837C971.204 270.837 989.234 266.235 1005.07 258.099C1010.49 314.691 1059.26 359 1118.63 359C1160.69 359 1197.42 336.782 1217.19 303.709C1237.79 323.536 1266.05 335.777 1297.26 335.777C1360.25 335.777 1411.33 285.914 1411.33 224.391C1411.33 223.408 1411.32 222.424 1411.29 221.44C1418.7 223.355 1426.47 224.391 1434.49 224.391C1463.23 224.391 1488.81 211.272 1505.34 190.842C1526.06 211.537 1554.96 224.391 1586.93 224.391C1649.92 224.391 1701 174.528 1701 113.006C1701 82.25 1688.24 54.4036 1667.6 34.2489L1667.6 -45.9999L1055.5 -41.5C990.5 -31.5 952.07 -14.5 934.658 49.3569C879.92 57.5458 838 103.717 838 159.452Z" fill="white" stroke="#DCE0F3" strokeWidth="7" strokeMiterlimit="10"/>
                    <path d="M239.148 407.167C251.488 394.992 270.309 404.704 267.031 421.913C265.461 430.129 277.212 436.634 283.312 430.774C292.07 422.342 306.528 429.426 301.93 441.831C297.744 453.146 312.164 459.236 319.481 451.278C321.764 448.8 331.985 446.342 336.041 448.105C340.097 449.867 340.653 459.424 339.128 463.696C334.806 475.863 353.609 483.003 357.954 470.765C362.828 457.055 359.015 435.922 344.232 429.728C330.924 424.139 312.717 429.097 303.205 439.453C309.056 442.607 314.905 445.745 320.756 448.9C325.66 435.65 321.362 419.794 309.455 411.713C297.549 403.633 280.916 405.276 270.768 415.038C276.198 417.988 281.62 420.948 287.049 423.899C290.027 408.27 281.685 391.903 267.509 384.834C254.316 378.261 237.071 381.111 226.607 391.447C222.747 395.251 221.375 401.023 225.019 405.586C228.135 409.487 235.26 411.009 239.158 407.174L239.148 407.167Z" fill="#FFD28E"/>
                    <path d="M590.264 386.169L590.289 383.49L592.968 383.515C598.946 383.57 603.84 378.767 603.895 372.788C603.95 366.81 599.147 361.917 593.168 361.861L590.489 361.837L590.514 359.157C590.569 353.174 585.766 348.281 579.783 348.226C573.805 348.171 568.912 352.974 568.856 358.952L568.831 361.632L566.152 361.607C560.174 361.552 555.281 366.355 555.225 372.333C555.17 378.312 559.973 383.205 565.952 383.26L568.631 383.285L568.606 385.964C568.551 391.943 573.354 396.836 579.333 396.891C585.311 396.947 590.204 392.143 590.26 386.165L590.264 386.169Z" fill="#FFD28E"/>
                    <circle cx="1540.5" cy="1041.5" r="23.5" fill="#FFD28E"/>
                    <path d="M726.824 354.254L726.839 352.621L728.472 352.637C732.114 352.67 735.095 349.744 735.128 346.102C735.162 342.46 732.236 339.479 728.594 339.445L726.961 339.43L726.976 337.798C727.01 334.153 724.084 331.172 720.439 331.138C716.797 331.104 713.816 334.031 713.782 337.673L713.767 339.305L712.135 339.29C708.493 339.256 705.512 342.183 705.478 345.825C705.444 349.467 708.371 352.448 712.013 352.482L713.645 352.497L713.63 354.129C713.596 357.771 716.523 360.752 720.165 360.786C723.807 360.819 726.788 357.893 726.822 354.251L726.824 354.254Z" fill="#FFD28E"/>
                    <path d="M1295 207.819C1295 287.405 1359.2 351.933 1438.41 351.933C1462.47 351.933 1485.14 345.978 1505.05 335.452C1511.86 408.672 1573.18 466 1647.83 466C1700.69 466 1746.87 437.254 1771.73 394.463C1797.63 420.116 1833.17 435.953 1872.4 435.953C1951.6 435.953 2015.81 371.439 2015.81 291.84C2015.81 290.567 2015.8 297.125 2015.76 295.852C2025.08 298.33 2054.9 316.966 2084 321C2134.5 328 2195.21 290.601 2216 264.169C2255.5 285.669 2269.5 274 2305 268.5C2337.5 253.5 2380 227.325 2380 147.726C2380 107.933 2363.95 71.905 2338 45.8282L2338 -57.9999L1475 -36.5C1443.5 -11 1421.5 12.5 1416.52 65.3754C1347.7 75.9704 1295 135.708 1295 207.819Z" fill="#F6F6FF" stroke="#DCE0F3" strokeWidth="7" strokeMiterlimit="10"/>
                </g>
                <defs>
                    <clipPath id="clip0_1596_852">
                        <rect width="2190" height="1302" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
            <ModalDiv step={step}>
                <Character step={step} src='/Img/character/img.png'></Character>
                <ContentDiv step={step}>
                    <AnimatePresence>
                        <ProcessBar step={step}><Process step={step}></Process></ProcessBar>
                        <motion.div
                            key={step}
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 20}}
                            transition={{duration: 0.3}}
                            style={{position: "absolute", width: "100%"}}
                        >
                            {step === 0 ? (
                                <div>
                                    <Question step={step}>글로플에서 알아보는 나의 MBTI는?</Question>
                                    <Answer step={step} onClick={() => (setStep(1))}>테스트 시작하기</Answer>
                                    <p style={{marginTop:'80px'}}>총 16가지의 유형을 통해 여행 스타일을 알아보아요.</p>
                                </div>
                            ) : (step < 13 ? (
                                <div>
                                    <Question>{questions[step]}</Question>
                                    <Answer onClick={() => onClickAnswer(1)}>{answers[step*2-2].answer}</Answer>
                                    <Answer onClick={() => onClickAnswer(2)}>{answers[step*2-1].answer}</Answer>
                                </div>
                            ) : (
                                <div>
                                    <ResultSentence>OO님의 MBTI 테스트 결과는?</ResultSentence>
                                    <ResultCharacter src={`/Img/character/${resultMBTI}.png`} alt="Character"/>
                                    <MBTIResult>
                                        {resultMBTI}
                                    </MBTIResult>
                                    <ResultButtonWrapper>
                                        <ResultButton onClick={() => (setStep(0))}>다시 테스트하기</ResultButton>
                                        <ResultButton onClick={onClickSaveButton}>저장하기</ResultButton>
                                    </ResultButtonWrapper>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </ContentDiv>
            </ModalDiv>
        </div>
    );
};

export default MBTItestPage;
