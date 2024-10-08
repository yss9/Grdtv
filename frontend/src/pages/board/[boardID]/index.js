import BoardDetail from "../../review/detail/detail";
import BoardCommentWrite from "../../reviewComment/write/write";
import BoardCommentList from "../../reviewComment/list/list";


export default function DetailPage(){
    return (
        <>
            <BoardDetail/>
            <BoardCommentWrite/>
            <BoardCommentList/>
        </>

    )



}