import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

// на странице блога получим и отрисуем посты:
const Blogpage = () => {
    const [posts, setPosts] = useState([]);
    // console.log(useLocation());



    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            // установим данные в стейт
            .then(data => setPosts(data));
    }, []);

// отрисовываем посты
    return (

        <div>
            Our news
            <Link to={'/posts/new'}>Добавить новый пост</Link>
            {posts.map(post => (
                <Link key={post.id} to={`/posts/${post.id}`}>
                    <li>{post.title}</li>
                </Link>
            ))}
        </div>
    );
};

export {Blogpage};
