import {
    useActionData,
    useLoaderData,
    useNavigation, /*useParams*/
} from "react-router-dom";
import UpdatePost from "../components/UpdatePost";

const Editpost = () => {
    // const {id} = useParams();

    // вернет 1 объект с ключом message стр. 43
    // далее отрисовываем строка 16 выведет data.message
    const data = useActionData();
    const {post, id} = useLoaderData();
    // статус отправки будем узнавать
    const navigation = useNavigation();

    return (
        <div>
            {data?.message && <div style={{color: "blue"}}>{data.message}</div>}
            <h1>Edit post {id}</h1>
            <UpdatePost {...post} submitting={navigation.state === "submitting"}/>
        </div>
    );
};
// асинхр функция для отправки на сервак данных
// post это formData
const updatePost = async (post) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.get("id")}`, {
        method: "PUT",
        // передаем post не обязательно как в Createpost использовать  JSON.stringify() - и так работать будет
        // так как передаем formData при таком подходе не передаем: headers: {"Content-Type": "application/json"},
        body: post
    });
    return res.json();
};
// ее надо отправить в router.js стр 27
// request - объект будет знать о форме
const updatePostAction = async ({request}) => {
    const formData = await request.formData();

    // валидация:
    // есть ли title у formData и body?
    if (!formData.get("title") || !formData.get("body")) {
        return {message: "All field are required!!!"};
    }

    const updatedPost = await updatePost(formData);
// обработай ответ (чтобы получить это сообщение..) на уровне приложения используй useActionData() см вверх...
    return {message: `Post ${updatedPost.id} was successfully updated`};
};

export {Editpost, updatePostAction};
