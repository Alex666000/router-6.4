import {useLocation, Navigate} from "react-router-dom";
import {useAuth} from "../components/hook/useAuth";

const RequireAuth = ({children}) => {
    // лбъект локации
    const location = useLocation();
    const {user} = useAuth();
// если не можем попасть на Createpost к примеру, то редирект и уточняем
    // откуда мы пришли location.pathName или просто location а уже так где будет
    // login там достанем pathName
    if (!user) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
};

export {RequireAuth};

/*
children- у нас будет Createpost - хок обернет эту К-ту

далее создадим компонент авторизации LoginPage см... в нем логику


 */
