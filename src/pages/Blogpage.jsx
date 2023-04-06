import {useEffect, useState} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";

// на странице блога получим и отрисуем посты:
const Blogpage = () => {
    const [posts, setPosts] = useState([]);
    // console.log(useLocation());

    let [searchParams, setSearchParams] = useSearchParams();

    const postQuery = searchParams.get("post") || "";
// все что после ? это get параметры: // url.re/posts?..........

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const query = form.search.value;
        // обновляем searchParams и передаем в него query - обновим этим самым адресную строку - там появится
        // соответствующий get параметр но чтобы это повлияло на приложение где мапинг постов происходит - добавим фильтр
        setSearchParams({post: query});
    };

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            // установим данные в стейт
            .then(data => setPosts(data));
    }, []);

// отрисовываем посты
    return (
        <div>
            <h1>Our news</h1>
            <form autoComplete={"off"} onSubmit={handleSubmit}>
                <input type={"search"} name={"search"}/>
                <input type={"submit"} name={"search"}/>
            </form>
            <Link to="/posts/new" style={{margin: "1rem 0", display: "inline-block"}}>
                Добавить новый пост
            </Link>
            {posts
                /* у поста: в поле post.title есть тот самый поисковый запрос -- отфильтруем статьи
                * исходя из того что введем в поле -- можно привести все к нижнему регистру но не станем...
                * если обновим страницу то все посты фильтрованные останутся */
                .filter(post => (post.title.includes(postQuery)))
                .map(post => (
                    <Link key={post.id} to={`/posts/${post.id}`}>
                        <li>{post.title}</li>
                    </Link>
                ))}
        </div>
    );
};

export {Blogpage};

/*
useSearchParams - из ссылки обрабатывает поисковые параметры см документацию -  вдоке
не использют локальное состояние а параметры обновляют прямо в форме - новое значение которое
вбили устанавливает функция - и вытаскивание из url

сделаем фильтрацию на фронте

делаем форму - она просто поисковая строка по постам и поисковой строке будет фильтровать что то и то что введет пользователь
будем хранить в адресной строке чтобы чел. смог кому то дать эту ссылку и т.д
 */
