import BoardWrite from "../../../review/write/write";
import { useLocation } from "react-router-dom";


export default function EditPage() {


    return (
        <BoardWrite isEdit={true}/>
    );
}
