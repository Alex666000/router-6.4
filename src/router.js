import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Homepage } from './pages/Homepage';
import { About } from './pages/Aboutpage';
import { blogLoader, Blogpage } from './pages/Blogpage';
import { Createpost } from './pages/Createpost';
import { Editpost } from './pages/Editpost';
import { postLoader, Singlepage } from './pages/Singlepage';
import { Notfoundpage } from './pages/Notfoundpage';
import { LoginPage } from './pages/Loginpage';

import { Layout } from './components/Layout'

import { RequireAuth } from './hoc/RequireAuth'
import ErrorPage from './pages/Errorpage';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="about" element={<About />}>
            <Route path="contacts" element={<p>Our contact</p>} />
            <Route path="team" element={<p>Our team</p>} />
        </Route>
        <Route path="about-us" element={<Navigate to="/about" replace />} />

        {/*тут пишется любая ошибк*/}
        <Route path="posts" element={<Blogpage />} loader={blogLoader} errorElement={<h1>ERROR!!!!!!</h1>} />
        <Route path="posts" element={<Blogpage />} loader={blogLoader} errorElement={<ErrorPage/>} />




        <Route path="posts/:id" element={<Singlepage />} loader={postLoader} />
        <Route path="posts/:id/edit" element={<Editpost />} />
        <Route path="posts/new" element={
            <RequireAuth>
                <Createpost />
            </RequireAuth>
        } />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Notfoundpage />} />
    </Route>
))

export default router

/*
Вынесли весь роутинг с АРР в отд файл router.js

- errorElememt стал доступен в новой версии -проп передать можем на любой роут - отлов ошибок роутинга

- errorElememt работаею только внутри createBrowserRouter

- errorElememt пишется в router.js
дока советует обрабатывать ошибки в лоадере или асинхронной функции этого лоадера идем в БлокПейдж где получаем посты -->

 -
 */
