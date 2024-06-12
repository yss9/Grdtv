import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./style";
import { FireFilledIcon, Searchbar, SearchbarInput } from "../../searchbars/01/style";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { getDate } from "../../common/libraries/utils";
import Cookies from "js-cookie";

const SECRET = "!@#$";

export default function BoardList() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const [reqData, setReqData] = useState([]);
    const [keyword, setKeyword] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/posts/");
            setReqData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const printValue = useCallback(
        _.debounce((value) => console.log(value), 500),
        []
    );

    const handleChange = (event) => {
        printValue(event.target.value);
        setKeyword(event.target.value);
    };

    const onClickMoveToBoardNew = () => {
        navigate("/board/new");
    };

    const onClickMoveToBoardDetail = (id) => {
        navigate(`/board/${id}`);
        console.log(id);
    };

    const onChangeKeyword = (value) => {
        setKeyword(value);
    };

    return (
        <S.Wrapper>
            <Searchbar>
                <FireFilledIcon />
                <SearchbarInput
                    placeholder="검색어를 입력해 주세요."
                    onChange={handleChange}
                />
            </Searchbar>

            <h2>커뮤니티</h2>

            <S.TableTop />
            <S.Row>
                <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
                <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
            </S.Row>

            {reqData.filter(el => el.title.includes(keyword)).map(el => (
                <S.Row key={el.boardID}>
                    <S.ColumnTitle id={el.boardID} onClick={() => onClickMoveToBoardDetail(el.boardID)}>
                        {el.title
                            .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                            .split(SECRET)
                            .map((el, index) => (
                                <S.TextToken key={uuidv4()} isMatched={keyword === el}>
                                    {el}
                                </S.TextToken>
                            ))}
                    </S.ColumnTitle>
                    <S.ColumnBasic>{getDate(el.datetime)}</S.ColumnBasic>
                </S.Row>
            ))}

            <S.TableBottom />
            <S.Footer>
                <S.Button onClick={onClickMoveToBoardNew}>
                    게시물 등록하기
                </S.Button>
            </S.Footer>
        </S.Wrapper>
    );
}
