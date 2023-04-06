import {Suspense, useEffect} from "react";
import {Await, defer, Link, useLoaderData, useSearchParams} from "react-router-dom";
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
    const res = await fetch('https://jsonplaceholder.typicode.com/postsss')

    // if (!res.ok) {
    /*          эту ошибку выбросим руками и обработаем в Errorpage...*/
    //     throw new Response('', {status: res.status, statusText: 'Not found!!!'})
    // }

    return res.json()
};

const blogLoader = async ({request, params}) => {
    // console.log({ request, params })
    return defer(
        // возвращаем объект
        {
            //будут посты которые получим так:
            posts: getPosts()
        })
        ;
};
export {Blogpage, blogLoader};

/*


 */
