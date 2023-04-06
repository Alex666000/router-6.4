import React, {useEffect, useState} from "react";
import {
    defer,
    Link,
    Route,
    useLoaderData,
    useNavigate,
    useAsyncValue,
    useParams, Await
} from "react-router-dom";

const Post = () => {
    const post = useAsyncValue()

    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </>
    )
}

const Comments = () => {
    // тут достанем комменты теперь
    const comments = useAsyncValue()

    return (
        <div>
            <h2>Comments</h2>
            {comments.map(comment => (
                <>
                    <h3>{comment.email}</h3>
                    <h4>{comment.name}</h4>
                    <p>{comment.body}</p>
                </>
            ))}
        </div>
    )
}

export const Postpage = () => {
    const { post, id, comments } = useLoaderData()
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div>
            <button onClick={goBack}>Go back</button>
            <Suspense fallback={<h2>Post is loading...</h2>}>
                <Await resolve={post}>
                    <Post />
                </Await>
            </Suspense>
            <Suspense fallback={<h2>Comments is loading...</h2>}>
                <Await resolve={comments}>
                    <Comments />
                </Await>
            </Suspense>
            <Link to={`/posts/${id}/edit`}>Edit this post</Link>
        </div>
    )
};

async function getPostById(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.json()
}
async function getCommentsByPost(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    return res.json()
}
// без defer
const postLoader = async ({ params }) => {
    const id = params.id;
// нужны сразу пост по id поэтому пишем await а комменты потом внутри загрузим...
    return defer({ post: await getPostById(id), id, comments: getCommentsByPost(id) })
}

/*
- при работе со страницей понадобится params - получаем id через params - удалим useParams, useState
остальное как в Blogpage

- не забываем лоадер использовать в роутинге
 <Route path="posts/:id" element={<Postpage/>} loader={postLoader}/>

 - минусы такого подхода - ждем пока страница подгрузится....библа предоставляет хелпер defer

- вынесли в компонент отдельный отрисовку и в ней тогда обязательно раз вынесли...
 если б не выносили как тут то не надо было бы делать useAsyncValue

 - defer - разделяет сущности -- он в принципе не нужен можно без него - мы сделали с ним для разделения сущностей

 - но лучше с дефером делать!!! Чтобы прелоадер был при ожидании!!!

 */



