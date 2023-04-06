import {NavLink, Outlet} from "react-router-dom";
import {CustonLink} from "./CustonLink";

// const setActive = ({isActive}) => isActive ? 'active-link' : ''

// const setActive = ({isActive}) => ({color: isActive ? " var(--color-active)" : "white"});


const Layout = () => {
    return (
        <>
            <header>
                {/*  Стилизация: --->
                                NavLink:
                <NavLink to="/" className={ setActive }>Home</NavLink>
                <NavLink to="/posts" className={ setActive }>Blog</NavLink>
                <NavLink to="/about" className={ setActive }>About</NavLink>*/}

                {/*              style:
                <NavLink to="/" style={setActive}>Home</NavLink>
                <NavLink to="/posts" style={setActive}>Blog</NavLink>
                <NavLink to="/about" style={setActive}>About</NavLink>*/}

                {/*             CustonLink         */}
                <CustonLink to="/">Home</CustonLink>
                <CustonLink to="/posts">Blog</CustonLink>
                <CustonLink to="/about">About</CustonLink>
            </header>

            <main className="container">
                <Outlet/>
            </main>

            <footer className="container">&copy; ReactRouter Tutorials 2021</footer>
        </>
    );
};

export {Layout};

/*
- Т к это объект не забываем скобки style={ ({isActive}) => ({color: isActive ? ' var(--color-active)' : 'white'}) }

-
 */
