import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

function NavBar(props) {
    const active_page = props.active_page;
    return (
        <div className="header">
            <img src={logo} alt="Criter Heaven Crafts Logo" height="200" />
            <nav className="nav-bar">
                <div className="container nav-links">
                    <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    Index
                    </NavLink>
                    <NavLink to="/about" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    About
                    </NavLink>
                    <NavLink to="/products" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    Products
                    </NavLink>
                    <NavLink to="/contact" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    Contact
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}
export default NavBar;