import {
    Routes,
    Route,
    Navigate,
    createBrowserRouter,
    createRoutesFromElements, RouterProvider
} from "react-router-dom";

import {Homepage} from "pages/Homepage";
import {About} from "pages/Aboutpage";
import {blogLoader, Blogpage} from "pages/Blogpage";
import {Notfoundpage} from "pages/Notfoundpage";

import {Layout} from "components/Layout";
import {Postpage} from "pages/Postpage";
import {Createpost} from "pages/Createpost";
import {Editpost} from "pages/Editpost";
import {LoginPage} from "pages/Loginpage";
import {RequireAuth} from "hoc/RequireAuth";
import {AuthProvider} from "hoc/AuthProvider";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route index element={<Homepage/>}/>
        <Route path="about/*" element={<About/>}>
            <Route path="contacts" element={<p>Our contact</p>}/>
            <Route path="team" element={<p>Our team</p>}/>
        </Route>
        <Route path="about" element={<About/>}/>
        <Route path="about-us" element={<Navigate to={"/about"} replace/>}/>
        {/*loader*/}
        <Route path="posts" element={<Blogpage/>} loader={blogLoader}/>
        <Route path="posts/:id" element={<Postpage/>}/>
        <Route path="posts/:id/edit" element={<Editpost/>}/>

        <Route path="posts/new" element={
            <RequireAuth>
                <Createpost/>
            </RequireAuth>
        }/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="*" element={<Notfoundpage/>}/>
    </Route>
))

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    );
}

export default App;

/*
--- Новая версия 6.4 рассматриваем ---
удаляем BrowserRouter
берем всю внутрянку из Арр кроме  <Routes> и вставляем в createRoutesFromElements, <Routes> </Routes> - удаляем
и внутрь Арр вставляем <RouterProvider router={router}/>




 */
