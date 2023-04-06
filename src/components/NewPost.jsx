import { Form } from 'react-router-dom'

const NewPost = ({submitting}) => {
  return (
    <Form action="/posts/new" method='post'>
      <label>
        Title:
        <input type="text" name="title" />
      </label>
      <label>
        Body:
        <input type="text" name="body" />
      </label>
{/*        предустановленные данные делает инпут с типом таким       */}
      <input type="hidden" name="userId" value="1" />
        {/*        кнопка отправки формы       */}
      <input type="submit" value="Add post" disabled={submitting} />
    </Form>
  )
}

export default NewPost
/*
-------------------------------------------------------------------------------------------------------
- создаем формучерез специальный компонент Form - мы ее отправляем по определенному адресу action="/posts/new" -
важно чтобы на этой страницы весело свойство экшн:
<Route path="posts/new" element={
            <RequireAuth>
                <Createpost/>
            </RequireAuth>} action={createPostAction}/>
createPostAction - асинхронная функция через проп request принмает значение формы, мы их асинхронно получает и  с ними работаем
делаем запросы на сервер и по итогу делаем переадресации (не обязательно)
______________________________________________________________________________________________________
Form - импортируется из библы action="/posts/new" пойдет экшн на post запрос

NewPost - добавим внутрь страницы Createpost см....

если медленный интернет блокируем эту кнопку чтоб не нажали на нее много раз:
      <input type="submit" value="Add post" disabled={submitting} />
надо чтобы теперь submitting к нам приходил в пропсы -- идем в Createpost.. и используем новый хук
useNavigation()

 */