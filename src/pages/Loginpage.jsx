import { useLocation, useNavigate } from 'react-router-dom';
import {useAuth} from "../components/hook/useAuth";

// страница авторизации
const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signin} = useAuth();

// откуда мы пришли - если нет пути до дефотная страница...
    const fromPage = location.state?.from?.pathname || '/';

// форма
    const handleSubmit = (event) => {
        // отменить отправку формы по умолчанию
        event.preventDefault();
        // получаем форму
        const form = event.target;
        // то что ввел пользователь
        const user = form.username.value;
        // по кнопки назад чтобы не могли вернуться {replace: true}
        signin(user, () => navigate(fromPage, {replace: true}));
    }

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <label>
            Name: <input name="username" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export {LoginPage};

/*
LoginPage - добавляем его в роутинг в Арр
 */
