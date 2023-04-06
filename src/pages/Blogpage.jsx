import {Suspense, useEffect} from "react";
import {Await, defer, json, Link, useLoaderData, useSearchParams} from "react-router-dom";
import {BlogFilter} from "../components/BlogFilter";

// на странице блога получим и отрисуем посты:
const Blogpage = () => {
    const {posts} = useLoaderData();

    let [searchParams, setSearchParams] = useSearchParams();

    const postQuery = searchParams.get("post") || "";
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
            <Suspense fallback={<h2>Loading...</h2>}>
                {/* Await - это роутеровская компонента */}
                <Await resolve={posts}>
                    {
                        (resolvedPosts) => (
                            <>
                                {
                                    resolvedPosts.filter(
                                        post => post.title.includes(postQuery) && post.id >= startsFrom
                                    ).map(post => (
                                        <Link key={post.id} to={`/posts/${post.id}`}>
                                            <li>{post.title}</li>
                                        </Link>
                                    ))
                                }
                            </>)
                    }
                </Await>
            </Suspense>
        </div>
    );
};

async function getPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/postsss");

    // if (!res.ok) {
    //     throw new Response('', {status: res.status, statusText: 'Not found!!!'})
    // }

    return res.json();
}

const blogLoader = async () => {
    const posts = getPosts();
// тут обрабатываем ошибку в лоадере но тут нет доступа к res как в getPosts() --  поэтому руками добавим 404
    // в таком случае рефакторим Errorpage ---> идем туда...
    if (!posts.length) {
        // из библы новый доп метод json для обработки с ошибками:
        throw json({message: "Not Found", reason: "Wrong url"}, {status: 404});
    }

    return {
        posts
    };
};
export {Blogpage, blogLoader};

/*


 */
