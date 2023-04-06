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
-

 */



