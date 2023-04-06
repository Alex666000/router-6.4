import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './hoc/AuthProvider'
import router from './router'

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;

/*
--- Новая версия 6.4 рассматриваем ---

- errorElememt стал доступен в новой версии -проп передать можем на любой роут - отлов ошибок роутинга

- Вынесли весь роутинг с АРР в отд файл router.js

- errorElememt работаею только внутри createBrowserRouter

- errorElememt пишется в router.js



 */
