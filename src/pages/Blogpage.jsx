import {useEffect, useState} from "react";
import {defer, Link, useLocation, useSearchParams,useLoaderData} from "react-router-dom";
import {BlogFilter} from "../components/BlogFilter";

// на странице блога получим и отрисуем посты:
const Blogpage = () => {
    const posts = useLoaderData()

    let [searchParams, setSearchParams] = useSearchParams();

    const postQuery = searchParams.get("post") || "";
// все что после ? это get параметры: // url.re/posts?..........

    const latest = searchParams.has("latest");
// id
    const startsFrom = latest ? 80 : 1;

    useEffect(() => {

    }, []);

// отрисовываем посты
    return (
        <div>
            <h1>Our news</h1>

            <BlogFilter postQuery={postQuery} latest={latest}
                        setSearchParams={setSearchParams}/>
            <Link to="/posts/new" style={{margin: "1rem 0", display: "inline-block"}}>
                Добавить новый пост
            </Link>
            {posts
                .filter(
                    post => post.title.includes(postQuery) && post.id >= startsFrom
                ).map(post => (
                    <Link key={post.id} to={`/posts/${post.id}`}>
                        <li>{post.title}</li>
                    </Link>
                ))
            }
        </div>
    );
};

const blogLoader = async ({request, params}) => {
    // console.log({ request, params })


    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return res.json();
    ;
};
// используем лоадер в Арр...

export {Blogpage, blogLoader};

/*
                 локальный стейт и эффект не нужны:
params - это когда с динамическими параметрами работаем они тут будут :id
внутри blogLoader - будет логика что внутри эффекта - только установку данных в локальный стейт удалим
удалим пустой эффект сверху и внутри эффекта
------------------------------------------
const blogLoader = async ({request, params}) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return res.json();
    ----------------------------------------
};
полученные данные return res.json() -- будут доступны через useLoaderData() эти возвращенные данные попадут
слева что выплюнет хук const posts = useLoaderData() - остальная логика отрисовки написана верно...




 */
