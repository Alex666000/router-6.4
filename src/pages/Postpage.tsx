import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export const Postpage = () => {
    const {id} = useParams();
    // для перемещения по истории переключения страниц
    const navigate = useNavigate();

    const [post, setPost] = useState<ResponseData | null>(null);
// для этого в разметке делаем кнопку
    const goBack = () => navigate(-1);

    // перейдем сразу на домашнюю стр. -- так не стоит делаеть лучше Link и перейти по ссылке...
    // replace: true чтобы была переадресация а не движение по истории
    const goHome = () => navigate('/',{replace: true});

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);

    return (
        <div>
            {/*для перемещения по истории делаем кнопку*/}
            <button onClick={goBack}>Go back</button>
            <button onClick={goHome}>Go Home</button>
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



