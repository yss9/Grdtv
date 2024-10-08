import { useState } from "react";
import * as S from "../write/style"


export default function BoardCommentWrite() {
    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");


    const onChangeWriter = (event) => {
        setWriter(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeContents = (event) => {
        setContents(event.target.value);
    };

    const onClickWrite = async () => {

    }

    return (
        <S.Wrapper>
            <>
                <span>댓글</span>
            </>
            <S.InputWrapper>
                <S.Input
                    placeholder="작성자"
                    onChange={onChangeWriter}
                />
                <S.Input
                    type="password"
                    placeholder="비밀번호"
                    onChange={onChangePassword}
                />
            </S.InputWrapper>
            <S.ContentsWrapper>
                <S.Contents
                    maxLength={100}
                    onChange={onChangeContents}
                    placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                />
                <S.BottomWrapper>
                   {/* <S.ContentsLength>{contents.length}/100</S.ContentsLength>*/}
                    <S.Button onClick={onClickWrite}>등록하기</S.Button>
                </S.BottomWrapper>
            </S.ContentsWrapper>
        </S.Wrapper>
    );
}
