import {Routes, Route} from "react-router-dom";

import {Homepage} from "pages/Homepage";
import {About} from "pages/Aboutpage";
import {Blogpage} from "pages/Blogpage";
import {Notfoundpage} from "pages/Notfoundpage";

import {Layout} from "components/Layout";
import {Postpage} from "pages/Postpage";
import {Createpost} from "pages/Createpost";
import {Editpost} from "pages/Editpost";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="posts" element={<Blogpage/>}/>
                    {/*динамический параметр*/}
                    <Route path="posts/:id" element={<Postpage/>}/>
                    {/*хотим чтобы роут был завязан на этой айдишник но отдельный адрес /edit*/}
                    <Route path="posts/:id/edit" element={<Editpost/>}/>
                    <Route path="posts/new" element={<Createpost/>}/>
                    <Route path="*" element={<Notfoundpage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
