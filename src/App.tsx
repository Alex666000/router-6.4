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

                    {/*далее что-то есть после путя about*/}
                    <Route path="about/*" element={<About/>}>
                        {/*и нужно определить в какое место приложения вставлять эти пути
                        внутри About --- делаем с аутлетом
                        */}
                        <Route path="contacts" element={<p>Our contact</p>}/>
                        <Route path="team" element={<p>Our team</p>}/>
                    </Route>

                    <Route path="about" element={<About/>}/>
                    {/* переадресация -- но чтобы не сохранилось в истории посещение этого адреса
                    передаем дополнительно
                    */}
                    <Route path="about-us" element={<Navigate to={"/about"} replace/>}/>
                    <Route path="posts" element={<Blogpage/>}/>
                    {/* динамический параметр*/}
                    <Route path="posts/:id" element={<Postpage/>}/>
                    {/* хотим чтобы роут был завязан на этой айдишник но отдельный адрес /edit*/}
                    <Route path="posts/:id/edit" element={<Editpost/>}/>

                    {/* хок для переадресации в него обернем любой приватный роут*/}
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
useSearchParams - из ссылки обрабатывает поисковые параметры см документацию -  вдоке
не использют локальное состояние а параметры обновляют прямо в форме - новое значение которое
вбили устанавливает функция - и вытаскивание из url

сделаем фильтрацию на фронте



 */
