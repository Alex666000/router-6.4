import {Routes, Route, Navigate} from "react-router-dom";

import {Homepage} from "pages/Homepage";
import {About} from "pages/Aboutpage";
import {Blogpage} from "pages/Blogpage";
import {Notfoundpage} from "pages/Notfoundpage";

import {Layout} from "components/Layout";
import {Postpage} from "pages/Postpage";
import {Createpost} from "pages/Createpost";
import {Editpost} from "pages/Editpost";
import {LoginPage} from "pages/Loginpage";
import {RequireAuth} from "hoc/RequireAuth";
import {AuthProvider} from "hoc/AuthProvider";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path="about" element={<About/>}/>
                    {/*переадресация -- но чтобы не сохранилось в истории посещение этого адреса
                    передаем дополнительно
                    */}
                    <Route path="about-us" element={<Navigate to={"/about"} replace/>}/>
                    <Route path="posts" element={<Blogpage/>}/>
                    {/*динамический параметр*/}
                    <Route path="posts/:id" element={<Postpage/>}/>
                    {/*хотим чтобы роут был завязан на этой айдишник но отдельный адрес /edit*/}
                    <Route path="posts/:id/edit" element={<Editpost/>}/>

                    {/*хок для переадресации в него обернем любой приватный роут*/}
                    <Route path="posts/new" element={
                        <RequireAuth>
                            <Createpost/>
                        </RequireAuth>
                    }/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="*" element={<Notfoundpage/>}/>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;

/*
приватные роуты - 10 мин - сделать абстракцию обертку над страницуй и она обеспечит приватность
любая приватность завязана на регистрации - сделаем фейковый вариант

когда пользователь захочет перейти по адресу path="posts/new" - он попадет сюда: RequireAuth - тут произойдет проверка
авторизован или нет если да попадем в чилдрен -- нужна возможность перейти на скрытую сслыку делаем Link в Blogpage
кликаем на нее и если не авторизован попадем на LoginPage - сделаем авторизацию - обеспечим все Арр инфой зарегистрирован ли чел или нет
в упрошенном формате сделаем через реакт контекст делаем еще хок

обернем все роуты в провайдер AuthProvider === контекст чтоб передать..


 */
