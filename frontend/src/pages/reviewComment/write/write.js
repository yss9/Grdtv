import { useState } from "react";
import * as S from "./style";

export default function BoardCommentWrite() {
    const [writer, setWriter] = useState("");
    const [contents, setContents] = useState("");


    const onChangeContents = (event) => {
        setContents(event.target.value);
    };

    const onClickWrite = async () => {
        console.log({
            writer,
            contents
        });
    };

    return (
        <S.CommentWrapper>
            <S.InputWrapper>
                <S.Input
                    placeholder="작성자"
                    value={writer}
                />
            </S.InputWrapper>
            <S.ContentsWrapper>
                <S.Contents
                    maxLength={100}
                    onChange={onChangeContents}
                    value={contents}
                    placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                />
                <S.BottomWrapper>
                    <S.ContentsLength>{contents.length}/100</S.ContentsLength>
                    <S.Button onClick={onClickWrite}>등록하기</S.Button>
                </S.BottomWrapper>
            </S.ContentsWrapper>
        </S.CommentWrapper>
    );
}
