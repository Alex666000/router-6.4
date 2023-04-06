import {useAuth} from "../hook/useAuth";
import {redirect, useNavigate, useNavigation} from "react-router-dom";
import NewPost from "../components/NewPost";

const Createpost = () => {
    const {signout} = useAuth();
    const navigate = useNavigate();
    // идем внутрь и смотрим....
    const navigation = useNavigation();

    return (
        <div>
            <h1>Create a post</h1>
            {/*            submitting         */}
            {/*заблокируй кнопочку передай true в пропсы NewPost */}
            <NewPost submitting={navigation.state === "submitting"}/>
            <button onClick={() => signout(() => navigate("/", {replace: true}))}>Log
                Out
            </button>
        </div>
    );
};

const createPost = async ({title, body, userId}) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, body, userId})
    });
    const newPost = await res.json();

    return newPost;
};
// ей нужен экшн
// request знает все о той форме что была отправлена
// вызываем встроенный метод formData()
const createPostAction = async ({request}) => {
    const formData = await request.formData();
    // подготовим newPost
    const newPost = {
        // эти имена берутся с нашей формы что в NewPost - по name-у
        title: formData.get("title"),
        body: formData.get("body"),
        userId: formData.get("userId")
    };
    // отправляем
    const post = await createPost(newPost);
// когда есть новый пост можем сделать редирект - новый хелпер redirect
    // хотим попасть на страницувсех постов на конкретный пост на новый что получил
    return redirect("/posts/" + post.id);
};

export {Createpost, createPostAction};

/*
Экшн будем использовать на уровне самого роута router.js см...

это 1 способ был...есть 2 способ чтобы руками от строки 40-44 не делать см в след коммите 13 мин последн видео Непомнящий
 */
