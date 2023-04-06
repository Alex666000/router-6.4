import {useParams} from "react-router-dom";

// редактировать пост
const Editpost = () => {
    const {id} = useParams();
    return (
        <div>
            {/*уточняем какой именно посто хотим редактировать*/}
            <h1>Edit post {id}</h1>
        </div>
    );
};

export {Editpost};
