// Component to display the navigation bar with links to different pages and user authentication options

import { NavLink } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import logo from '../assets/logo.png';

function NavBar({ user, setIsModalOpen }) {

    // API call to handle user logout using Supabase authentication
    async function handleLogout() {
        await supabase.auth.signOut();
    }

    // Function to open the login/signup modal and prevent background scrolling when the modal is open
    function openModal() {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    }

    const isAdmin = user?.app_metadata?.role === 'admin';

    // JSX for the navigation bar with links to Home, About, Products, Contact, and Manage Products (for admin users), as well as Login/Logout buttons based on the user's authentication status
    return (
        <div className="header">
            <img src={logo} alt="Critter Haven Crafts Logo" height="200" />

            <nav className="nav-bar">
                <div className="nav-links">

                    <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                        Home
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
                    {isAdmin && (
                    <NavLink to="update" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                        Manage Products
                    </NavLink>
                    )}
                    {user ? (
                        <button id="nav-logout-btn" onClick={handleLogout}>
                            <i className="fa-solid fa-right-to-bracket"></i> Logout
                        </button>
                    ) : (
                        <button id="nav-login-btn" onClick={openModal}>
                            <i className="fa-solid fa-right-to-bracket"></i> Login
                        </button>
                    )}

                </div>
            </nav>
        </div>
    );
}
export default NavBar;