import {useEffect,Suspense} from "react";
import {Await, defer, Link, useLoaderData, useSearchParams} from "react-router-dom";
import {BlogFilter} from "../components/BlogFilter";

// на странице блога получим и отрисуем посты:
const Blogpage = () => {
    // вернем объект т к из defer возвращаем объект...
    // т к данных еще нет тоделаем Супенс ниже...внутри него должны нарисовать что return
    // компоненты но еще рано..
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
            {/*т к данных еще нет тоделаем Супенс ниже...внутри него должны нарисовать что return
            компоненты но еще рано..
            Await resolve - что именно мы будем дожидаться - покажи все вокруг Суспенса а то что внутри не показывай
            пока не загрузятся посты и показывай пока крутилку
            */}
            <Suspense fallback={<h2>Loading...</h2>}>
                {/* Await - это роутеровская компонента */}
                <Await resolve={posts}>
                    {
                        (resolvedPosts) => (<>
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
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return res.json();
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

тоже самое в PostPage сделаем...см...

 минусы такого подхода - ждем пока страница подгрузится....библа предоставляет хелпер defer - с можем
 ожидать когда какая-то часть данных будет получены

 далее defer реализацию см в Postpage....





 */
