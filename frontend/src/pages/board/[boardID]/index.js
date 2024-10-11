import BoardDetail from "../../review/detail/detail";
import BoardCommentWrite from "../../reviewComment/write/write";
import BoardCommentList from "../../reviewComment/list/list";
import {useParams} from "react-router-dom";


export default function DetailPage(){
    const { boardID } = useParams(); // boardID 가져오기
    return (
        <>
            <BoardDetail/>
            <BoardCommentList/>
        </>

    )



}