import React, {useEffect, useState} from "react";
import {
    defer,
    Link,
    Route,
    useLoaderData,
    useNavigate,
    useAsyncValue,
    useParams
} from "react-router-dom";

const Post = () => {
    // чтобы не писать resolvedPosts как в Blogpage
    const post = useAsyncValue();

    return (
        <>
            <h1>{post && post.title}</h1>
            <p>{post && post.body}</p>
        </>
    );
};

export const Postpage = () => {
    // const {id} = useParams();
    const {post, id} = useLoaderData();

    // для перемещения по истории переключения страниц
    const navigate = useNavigate();

    // const [post, setPost] = useState<ResponseData | null>(null);

// для этого в разметке делаем кнопку
    const goBack = () => navigate(-1);

    /* useEffect(() => {
         fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
             .then(res => res.json())
             .then(data => setPost(data));
     }, [id]);*/


    return (
        <div>
            {/*для перемещения по истории делаем кнопку*/}
            <button onClick={goBack}>Go back</button>
            {/*<h1>{post && post.title}</h1>*/}
            {/*<p>{post && post.body}</p>*/}
            {/*ссылка будет вести на пост который пришел в параметре - id*/}
            <Suspense>
                <Await resolve={post} fallback={<h2>Loading...</h2>}>
                    {/*когда пост получим отрисуем*/}
                    <Post/>
                </Await>
            </Suspense>
            <Link to={`/post${id}`}>Редактировать пост</Link>
        </div>
    );
};

async function getPostId(id) {
    const res = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // post получили один...по id...
    const post = await res.json();
    return {post, id};
}

export const postLoader = async ({params}) => {
    /*id так называется имя в роутинге <Route path="posts/:id" element={<Postpage/>}/>*/
    const id = params.id;
    // id получает сразу а пост через вызов...
    return {post: getPostId(id), id};


};

/*
при работе со страницей понадобится params - получаем id через params - удалим useParams, useState
остальное как в Blogpage

не забываем лоадер использовать в роутинге
 <Route path="posts/:id" element={<Postpage/>} loader={postLoader}/>

 минусы такого подхода - ждем пока страница подгрузится....библа предоставляет хелпер defer

вынесли в компонент отдельный отрисовку и в ней тогда обязательно раз вынесли...
 если б не выносили как тут то не надо было бы делать useAsyncValue

 defer - разделяет сущности -- он в принципе не нужен можно без него - мы сделали с ним для разделения сущностей

 */



