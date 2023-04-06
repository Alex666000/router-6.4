import {createContext, useState} from "react";

export const AuthContext = createContext(null);

// Provider
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // регистрация
    // cb - тут будет Navigate чтобы сделать переадресацию когда произойдет работа с пользователем
    const signin = (newUser, cb) => {
        setUser(newUser);
        cb();
    };
    const signout = (cb) => {
        setUser(null);
        cb();
    };
// это станет доступно в любом компоненте т к обернули провайдером в Арр
    const value = {user, signin, signout};

    return <AuthContext.Provider value={value}>
        {/* дочерние компоненты */}
        {children}
    </AuthContext.Provider>;
};

/*
Используем контекст в Арр

у консьюмеров доступ к value будет
 */