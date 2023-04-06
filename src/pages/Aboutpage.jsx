import {Link} from "react-router-dom";

const About = () => {
    return (
        <div>
            <h1>About us</h1>
            <p>This is a demo website about React-router-dom library.</p>

            <li><Link to="contacts">Our Contacts</Link></li>
            <li><Link to="team">Our Team</Link></li>

            <Routes>
                <Route path="contacts" element={<p>Our contact</p>}/>
                <Route path="team" element={<p>Our team</p>}/>
            </Routes>
        </div>
    );
};

export {About};

/*
- решетка если есть в родители конкретно в Арр в  <Route path="about/*" element={<About/>}/> - берет её из
, <Route path="/" element={<Layout/>}> ---> слеш / - повторять в дочернем нельзя

- с линками тоже самое правило...

- МЫ УЖЕ НАХОДИМСЯ В about!!!!
 */