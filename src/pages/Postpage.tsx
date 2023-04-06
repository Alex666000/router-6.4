import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

// чтобы могли вбив http://localhost:3000/posts/13 получить по id===13 страницу конкретного поста
export const Postpage = () => {
    // возвращает параметры те что вписали в Арр  с таким же именем т.е id
    const {id} = useParams();
    // console.log(id);

    // получаем объект
    const [post, setPost] = useState<ResponseData | null>(null);

// id в зависимость т к будем переходить между страницами чтобы запрос делался каждый раз
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);

    // при получении конкретного поста отрисуем его на страницу
    return (
        <div>
            {post && (
                <>
                    <h1>{post && post.title}</h1>
                    <p>{post && post.body}</p>
                    {/*ссылка будет вести на пост который пришел в параметре - id*/}
                    <Link to={`/post${id}`}>Редактировать пост</Link>
                </>
            )}
        </div>
    );
};
// types
type ResponseData = {
    userId: number
    id: number
    title: string
    body: string
}



