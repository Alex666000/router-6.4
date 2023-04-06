import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/hook/useAuth";

const Createpost = () => {
    const {signout} = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Create a post</h1>
            {/* куда отправится когда вылогинемся -- на главную стр. без возможности вернуться назад */}
            <button onClick={() => signout(() => navigate('/', {replace: true}))}>Log Out</button>
        </div>
    )
}

export {Createpost}
/*
имитируем тут вылогиневание
 */
