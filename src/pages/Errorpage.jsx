import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import {blogLoader} from "src/pages/Blogpage";

// function ErrorPage() {
//     // объект ошибки
//   const error = useRouteError()
//
//   if (isRouteErrorResponse(error)) {
//     return (
//       <div>
//         <h1>{error.status}</h1>
//         <h2>{error.data.message || 'Something goes wrong!'}</h2>
//         <h3>{error.data.reason}</h3>
//       </div>
//     )
//   }
//
//   // return <div>'Something goes wrong!'</div>
//   throw error
// }

/*2 вариант*/
function ErrorPage() {
    // объект ошибки
    const error = useRouteError()
// если ошибка произошла на уровне роутинга импортируем из 'react-router-dom'
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status}</h1>
                {/*так как в Blockpage в blogLoader вернули объект - тут он доступен в свойстве data*/}
                <h2>{error.data.message || 'Something goes wrong!'}</h2>
                <h3>{error.data.reason}</h3>
            </div>
        )
    }

    // return <div>'Something goes wrong!'</div>
    throw error
}

export default ErrorPage