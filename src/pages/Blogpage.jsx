import {useEffect, useState} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {BlogFilter} from "../components/BlogFilter";

// на странице блога получим и отрисуем посты:
const Blogpage = () => {
    const [posts, setPosts] = useState([]);
    // console.log(useLocation());

    let [searchParams, setSearchParams] = useSearchParams();

    const postQuery = searchParams.get("post") || "";
// все что после ? это get параметры: // url.re/posts?..........

    const latest = searchParams.has("latest");
// id
    const startsFrom = latest ? 80 : 1;

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

export {Blogpage};

/*
Вложенные роуты - делали ранее через аутлет лайаут - делают без /

 */
